import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';

export default function DashboardScreen({ navigation }: { navigation: any }) {
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  // Dummy data for UI only
  const purchasesData: Record<string, { id: string; item: string; liter: number; price: number; total: number }[]> = {
    'January-2023': [{ id: '1', item: 'BUFFALO MILK', liter: 6, price: 60, total: 360 }],
    'February-2023': [{ id: '1', item: 'BUFFALO MILK', liter: 3, price: 60, total: 180 }],
    'March-2023': [],
  };
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const years = ['2022','2023','2024','2025'];
  const key = `${selectedMonth}-${selectedYear}`;
  const purchases = purchasesData[key] ?? [];

  const goPrevMonth = () => {
    const idx = months.indexOf(selectedMonth);
    if (idx > 0) {
      setSelectedMonth(months[idx - 1]);
    } else {
      const yIdx = years.indexOf(selectedYear);
      if (yIdx > 0) {
        setSelectedYear(years[yIdx - 1]);
        setSelectedMonth(months[11]);
      }
    }
  };

  const goNextMonth = () => {
    const idx = months.indexOf(selectedMonth);
    if (idx < months.length - 1) {
      setSelectedMonth(months[idx + 1]);
    } else {
      const yIdx = years.indexOf(selectedYear);
      if (yIdx < years.length - 1) {
        setSelectedYear(years[yIdx + 1]);
        setSelectedMonth(months[0]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
      {/* Month/Year selectors */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.selector} onPress={() => setShowMonthPicker(true)}><Text>{selectedMonth} ▼</Text></TouchableOpacity>
        <TouchableOpacity style={styles.selector} onPress={() => setShowYearPicker(true)}><Text>{selectedYear} ▼</Text></TouchableOpacity>
      </View>
      {/* User info */}
      <View style={styles.userBox}>
        <View style={styles.avatar} />
        <View style={{flex:1}}>
          <Text style={styles.userName}>Paresh Gami</Text>
          <Text style={styles.userLocation}>Morbi</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}><Text>📋</Text></TouchableOpacity>
      </View>
      {/* Wallet/Amount */}
      <View style={styles.row}>
        <View style={styles.amountBox}>
          <Text style={styles.amountLabel}>Wallet Amount</Text>
          <Text style={styles.amountValue}>₹170.00</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Payment')}><Text style={styles.link}>View</Text></TouchableOpacity>
        </View>
        <View style={styles.amountBox}>
          <Text style={styles.amountLabel}>January - 2023</Text>
          <Text style={styles.amountValue}>₹360</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Transactions')}><Text style={styles.link}>View</Text></TouchableOpacity>
        </View>
      </View>
      {/* Purchases Table */}
      <View style={styles.navRow}>
        <TouchableOpacity onPress={goPrevMonth}><Text style={styles.navBtn}>◀ PREV</Text></TouchableOpacity>
        <Text style={styles.sectionTitle}>{selectedMonth} {selectedYear} Purchase</Text>
        <TouchableOpacity onPress={goNextMonth}><Text style={styles.navBtn}>NEXT ▶</Text></TouchableOpacity>
      </View>
      <FlatList
        data={purchases}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>#</Text>
            <Text style={styles.headerCell}>ITEM</Text>
            <Text style={styles.headerCell}>LITER</Text>
            <Text style={styles.headerCell}>PRICE (₹)</Text>
            <Text style={styles.headerCell}>TOTAL (₹)</Text>
          </View>
        }
        renderItem={({item}) => (
          <View style={styles.purchaseRow}>
            <Text style={styles.purchaseCell}>1</Text>
            <Text style={styles.purchaseCell}>{item.item}</Text>
            <Text style={styles.purchaseCell}>{item.liter}</Text>
            <Text style={styles.purchaseCell}>₹{item.price}</Text>
            <Text style={styles.purchaseCell}>₹{item.total}</Text>
          </View>
        )}
        ListFooterComponent={<Text style={styles.finalTotal}>FINAL TOTAL  ₹360</Text>}
      />
      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Milk Order')}><Text style={{color:'#fff'}}>Milk Order</Text></TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Payment')}><Text style={{color:'#fff'}}>Do Payment</Text></TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Transactions')}><Text style={{color:'#fff'}}>Transaction</Text></TouchableOpacity>
      </View>
      {/* Settings */}
      <View style={styles.settingsBox}>
        <Text style={styles.settingsTitle}>Settings</Text>
        <Text style={styles.settingsSubtitle}>Language Change, Logout</Text>
      </View>
      </View>
      <Modal visible={showMonthPicker} transparent animationType="fade">
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.3)'}}>
          <View style={{backgroundColor:'#fff', borderRadius:10, padding:12, width:'80%', maxHeight:'60%'}}>
            <ScrollView>
              {months.map(m => (
                <TouchableOpacity key={m} style={{paddingVertical:10}} onPress={() => { setSelectedMonth(m); setShowMonthPicker(false); }}>
                  <Text style={{textAlign:'center', fontWeight: m===selectedMonth ? 'bold' : 'normal'}}>{m}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={{marginTop:8, alignSelf:'center'}} onPress={() => setShowMonthPicker(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={showYearPicker} transparent animationType="fade">
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.3)'}}>
          <View style={{backgroundColor:'#fff', borderRadius:10, padding:12, width:'60%'}}>
            {years.map(y => (
              <TouchableOpacity key={y} style={{paddingVertical:10}} onPress={() => { setSelectedYear(y); setShowYearPicker(false); }}>
                <Text style={{textAlign:'center', fontWeight: y===selectedYear ? 'bold' : 'normal'}}>{y}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={{marginTop:8, alignSelf:'center'}} onPress={() => setShowYearPicker(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  selector: { backgroundColor: '#fff', color: '#222', paddingVertical: 8, paddingHorizontal: 18, borderRadius: 6, fontWeight: 'bold', marginRight: 8, fontSize: 15, borderWidth: 1, borderColor: 'rgb(144, 238, 144)' },
  userBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: 'rgb(144, 238, 144)' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#eee', marginRight: 12, borderWidth: 2, borderColor: 'rgb(144, 238, 144)' },
  iconBtn: { padding: 10 },
  userName: { fontWeight: 'bold', fontSize: 16 },
  userLocation: { color: '#888' },
  amountBox: { flex: 1, backgroundColor: '#fff', borderRadius: 10, padding: 12, marginHorizontal: 4, alignItems: 'center', borderWidth: 1, borderColor: 'rgb(144, 238, 144)' },
  amountLabel: { color: '#888', fontSize: 12 },
  amountValue: { fontWeight: 'bold', fontSize: 18 },
  link: { color: 'rgb(144, 238, 144)', fontSize: 12, marginTop: 4, fontWeight: 'bold' },
  sectionTitle: { fontWeight: 'bold', fontSize: 14, marginVertical: 8 },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  navBtn: { color: '#888', fontWeight: 'bold' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 6, padding: 8, marginBottom: 6, borderWidth: 1, borderColor: '#e5e7eb' },
  headerCell: { flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 12, color: '#666' },
  purchaseRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 8, padding: 8, marginBottom: 4, borderWidth: 1, borderColor: '#eef2f7' },
  purchaseCell: { flex: 1, textAlign: 'center' },
  finalTotal: { fontWeight: 'bold', textAlign: 'right', marginTop: 4, backgroundColor: '#eef2f7', padding: 8, borderRadius: 6 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 },
  actionBtn: { flex: 1, backgroundColor: 'rgb(144, 238, 144)', borderRadius: 22, marginHorizontal: 4, padding: 12, alignItems: 'center', elevation: 2 },
  settingsBox: { marginTop: 20, backgroundColor: '#fff', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: 'rgb(144, 238, 144)' },
  settingsTitle: { fontWeight: 'bold', fontSize: 16 },
  settingsSubtitle: { color: '#888', fontSize: 12 },
});
