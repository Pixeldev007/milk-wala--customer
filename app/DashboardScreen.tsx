import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getCustomerId } from '@/lib/customers';
import { getCustomerSession } from '@/lib/session';
import { supabase } from '@/lib/supabase';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

type ShiftRow = {
  date: string;
  shift: 'morning' | 'evening';
  liters: number;
  delivered: boolean;
  delivered_at: string | null;
  delivery_agent_id: string | null;
  delivery_agent_name: string | null;
  delivery_agent_phone: string | null;
};

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [rows, setRows] = useState<ShiftRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const session = await getCustomerSession();
      if (!mounted) return;
      if (!session?.phone) {
        setCustomerId(null);
        return;
      }
      const id = await getCustomerId(session.name, session.phone);
      if (mounted) setCustomerId(id);
    })();
    return () => { mounted = false; };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let active = true;
      (async () => {
        const session = await getCustomerSession();
        if (!active) return;
        if (!session?.phone) {
          setCustomerId(null);
          return;
        }
        const id = await getCustomerId(session.name, session.phone);
        if (active) setCustomerId(id);
      })();
      return () => { active = false; };
    }, [])
  );

  const loadDay = useCallback(async () => {
    if (!customerId) {
      setRows([]);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_customer_day_details', {
        p_customer_id: customerId,
        p_date: null,
      });
      if (error) throw error;
      setRows((data ?? []).map((r: any) => {
        const rawShift = (r.shift ?? '').toString().toLowerCase();
        const normalizedShift: 'morning' | 'evening' = rawShift.includes('even') || rawShift.includes('pm')
          ? 'evening'
          : 'morning';
        return {
          date: r.date,
          shift: normalizedShift,
          liters: Number(r.liters ?? 0),
          delivered: !!r.delivered,
          delivered_at: r.delivered_at ?? null,
          delivery_agent_id: r.delivery_agent_id ?? null,
          delivery_agent_name: r.delivery_agent_name ?? null,
          delivery_agent_phone: r.delivery_agent_phone ?? null,
        };
      }));
    } catch (error) {
      console.error('get_customer_day_details error', error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    if (!customerId) {
      setRows([]);
      return;
    }
    loadDay();
  }, [customerId, loadDay]);

  useEffect(() => {
    if (!customerId) return;
    const sub = supabase
      .channel(`dd-customer-${customerId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'daily_deliveries',
        filter: `customer_id=eq.${customerId}`,
      }, () => loadDay())
      .subscribe();
    return () => { supabase.removeChannel(sub); };
  }, [customerId, loadDay]);

  const morning = useMemo(() => rows.find(r => r.shift === 'morning') || null, [rows]);
  const evening = useMemo(() => rows.find(r => r.shift === 'evening') || null, [rows]);

  const agentName = useMemo(() => {
    return morning?.delivery_agent_name || evening?.delivery_agent_name || '—';
  }, [morning, evening]);

  const agentPhone = useMemo(() => {
    return morning?.delivery_agent_phone || evening?.delivery_agent_phone || '—';
  }, [morning, evening]);

  const today = useMemo(() => new Date(), []);
  const calendarDays = useMemo(() => {
    const start = new Date();
    start.setDate(start.getDate() - 3);
    return Array.from({ length: 7 }).map((_, idx) => {
      const d = new Date(start);
      d.setDate(start.getDate() + idx);
      const isToday = d.toDateString() === today.toDateString();
      return {
        key: d.toISOString().slice(0, 10),
        day: d.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase(),
        date: d.getDate(),
        isToday,
      };
    });
  }, [today]);

  return (
    <View style={styles.screen}>
      <View style={styles.appHeader}>
        <Text style={styles.appTitle}>Milk Karan</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => {
          setRefreshing(true);
          await loadDay();
          setRefreshing(false);
        }} />}
      >
        <View style={styles.calendarCard}>
          <View style={styles.calendarRow}>
            {calendarDays.map((item) => (
              <View key={item.key} style={[styles.calendarCell, item.isToday && styles.calendarCellActive]}>
                <Text style={[styles.calendarDay, item.isToday && styles.calendarDayActive]}>{item.day}</Text>
                <Text style={[styles.calendarDate, item.isToday && styles.calendarDateActive]}>{item.date}</Text>
              </View>
            ))}
          </View>
          <View style={styles.calendarDivider} />
          <View style={styles.calendarFooterRow}>
            <Text style={styles.headerDate}>{today.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
            <Text style={styles.headerDateIcon}>⌄</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{Number(morning?.liters ?? 0).toFixed(0)}</Text>
            <Text style={styles.summaryLabel}>Morning</Text>
          </View>
          <View style={styles.summaryCardActive}>
            <Text style={styles.summaryValue}>{(Number(morning?.liters ?? 0) + Number(evening?.liters ?? 0)).toFixed(2)}</Text>
            <Text style={styles.summaryLabel}>L</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Assigned Delivery Boy</Text>
          <Text style={styles.cardValue}>{agentName}</Text>
          <Text style={styles.cardSub}>{agentPhone}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Order</Text>
          <View style={styles.shiftRow}>
            <Text style={styles.shiftLabel}>Morning</Text>
            <View style={styles.shiftDetail}>
              <Text style={styles.shiftValue}>{Number(morning?.liters ?? 0).toFixed(1)} L</Text>
              <Text style={[styles.shiftStatus, morning?.delivered ? styles.shiftStatusDone : styles.shiftStatusPending]}>
                {morning?.delivered ? 'Delivered' : 'Pending'}
              </Text>
            </View>
          </View>
          {morning?.delivered_at ? (
            <Text style={styles.shiftMeta}>Delivered at {new Date(morning.delivered_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          ) : null}

          <View style={[styles.shiftRow, { marginTop: 12 }]}>
            <Text style={styles.shiftLabel}>Evening</Text>
            <View style={styles.shiftDetail}>
              <Text style={styles.shiftValue}>{Number(evening?.liters ?? 0).toFixed(1)} L</Text>
              <Text style={[styles.shiftStatus, evening?.delivered ? styles.shiftStatusDone : styles.shiftStatusPending]}>
                {evening?.delivered ? 'Delivered' : 'Pending'}
              </Text>
            </View>
          </View>
          {evening?.delivered_at ? (
            <Text style={styles.shiftMeta}>Delivered at {new Date(evening.delivered_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          ) : null}

          {loading ? <ActivityIndicator style={{ marginTop: 12 }} /> : null}
        </View>

        <View style={styles.tileGrid}>
          <MenuTile
            label="My Orders"
            icon="🧾"
            onPress={() => navigation.navigate('My Orders')}
          />
          <MenuTile
            label="Transactions"
            icon="📊"
            onPress={() => navigation.navigate('Transactions')}
          />
          <MenuTile
            label="Payments"
            icon="💵"
            onPress={() => navigation.navigate('Payment')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function MenuTile({ label, icon, onPress }: { label: string; icon: string; onPress: () => void }) {
  return (
    <TouchableOpacity accessibilityRole="button" style={styles.tile} onPress={onPress}>
      <View style={styles.tileIconCircle}>
        <Text style={styles.tileIcon}>{icon}</Text>
      </View>
      <Text style={styles.tileLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#ffffff' },
  appHeader: { height: 40, backgroundColor: '#01559d', paddingHorizontal: 16, paddingTop: 12, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.15, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 4 },
  headerTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  menuIcon: { fontSize: 22, color: '#ffffff', fontWeight: '700' },
  appTitle: { color: '#ffffff', fontSize: 20, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24, gap: 16 },
  calendarCard: { backgroundColor: '#ffffff', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: '#e5e7eb', shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2 },
  calendarRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  calendarCell: { alignItems: 'center', paddingVertical: 6, paddingHorizontal: 4, borderRadius: 10, flex: 1, marginHorizontal: 2 },
  calendarCellActive: { backgroundColor: '#01559d' },
  calendarDay: { color: '#4b5563', fontWeight: '600', fontSize: 11 },
  calendarDayActive: { color: '#ffffff' },
  calendarDate: { marginTop: 4, color: '#4b5563', fontWeight: '700', fontSize: 15 },
  calendarDateActive: { color: '#ffffff' },
  calendarDivider: { height: 1, backgroundColor: '#e5e7eb', marginTop: 4, marginBottom: 8 },
  calendarFooterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerDate: { color: '#374151', fontWeight: '600', fontSize: 14 },
  headerDateIcon: { color: '#6b7280', fontSize: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  summaryCard: { flex: 1, borderRadius: 10, borderWidth: 1, borderColor: '#bebebe', paddingVertical: 12, alignItems: 'center', backgroundColor: '#ffffff' },
  summaryCardActive: { flex: 1, borderRadius: 10, borderWidth: 1, borderColor: '#01559d', paddingVertical: 12, alignItems: 'center', backgroundColor: '#ffffff' },
  summaryValue: { fontSize: 18, fontWeight: '700', color: '#01559d' },
  summaryLabel: { marginTop: 4, fontSize: 12, color: '#6b7280' },
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2, borderWidth: 1, borderColor: '#e5e7eb' },
  cardTitle: { fontWeight: '700', fontSize: 16, color: '#01559d', marginBottom: 4 },
  cardValue: { fontSize: 15, fontWeight: '600', color: '#01559d' },
  cardSub: { color: '#4f4f4f', marginTop: 2 },
  shiftRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  shiftLabel: { fontWeight: '600', color: '#01559d' },
  shiftDetail: { flexDirection: 'row', alignItems: 'center', columnGap: 8 },
  shiftValue: { fontWeight: '700', color: '#01559d' },
  shiftStatus: { fontWeight: '600' },
  shiftStatusDone: { color: '#01559d' },
  shiftStatusPending: { color: '#bebebe' },
  shiftMeta: { color: '#4f4f4f', marginTop: 4 },
  tileGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 16, columnGap: 12, marginTop: 4 },
  tile: { backgroundColor: '#ffffff', borderRadius: 16, paddingVertical: 20, alignItems: 'center', justifyContent: 'center', flexBasis: '48%', borderWidth: 1, borderColor: '#e5e7eb', shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 1 },
  tileIconCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#01559d', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  tileIcon: { fontSize: 24, color: '#ffffff' },
  tileLabel: { fontWeight: '600', color: '#01559d', fontSize: 13 },
});
