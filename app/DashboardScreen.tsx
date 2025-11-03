import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default function DashboardScreen() {
  // Dummy data for UI only
  const purchases = [
    { id: '1', item: 'BUFFALO MILK', liter: 6, price: 60, total: 360 }
  ];

  return (
    <View style={styles.container}>
      {/* Month/Year selectors */}
      <View style={styles.row}>
        <Text style={styles.selector}>January ▼</Text>
        <Text style={styles.selector}>2023 ▼</Text>
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
          <Text style={styles.link}>View</Text>
        </View>
        <View style={styles.amountBox}>
          <Text style={styles.amountLabel}>January - 2023</Text>
          <Text style={styles.amountValue}>₹360</Text>
          <Text style={styles.link}>View</Text>
        </View>
      </View>
      {/* Purchases Table */}
      <Text style={styles.sectionTitle}>29 January Purchase</Text>
      <FlatList
        data={purchases}
        keyExtractor={item => item.id}
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
        <TouchableOpacity style={styles.actionBtn}><Text>Milk Order</Text></TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}><Text>Do Payment</Text></TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}><Text>Transaction</Text></TouchableOpacity>
      </View>
      {/* Settings */}
      <View style={styles.settingsBox}>
        <Text style={styles.settingsTitle}>Settings</Text>
        <Text style={styles.settingsSubtitle}>Language Change, Logout</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7fb', padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  selector: { backgroundColor: '#fff', padding: 8, borderRadius: 6, fontWeight: 'bold', marginRight: 8 },
  userBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#e0e0e0', marginRight: 12 },
  iconBtn: { padding: 10 },
  userName: { fontWeight: 'bold', fontSize: 16 },
  userLocation: { color: '#888' },
  amountBox: { flex: 1, backgroundColor: '#fff', borderRadius: 10, padding: 12, marginHorizontal: 4, alignItems: 'center' },
  amountLabel: { color: '#888', fontSize: 12 },
  amountValue: { fontWeight: 'bold', fontSize: 18 },
  link: { color: '#2d8cff', fontSize: 12, marginTop: 4 },
  sectionTitle: { fontWeight: 'bold', fontSize: 14, marginVertical: 8 },
  purchaseRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 8, padding: 8, marginBottom: 4 },
  purchaseCell: { flex: 1, textAlign: 'center' },
  finalTotal: { fontWeight: 'bold', textAlign: 'right', marginTop: 4 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 },
  actionBtn: { flex: 1, backgroundColor: '#2d8cff', borderRadius: 8, marginHorizontal: 4, padding: 12, alignItems: 'center' },
  settingsBox: { marginTop: 20, backgroundColor: '#fff', borderRadius: 10, padding: 12 },
  settingsTitle: { fontWeight: 'bold', fontSize: 16 },
  settingsSubtitle: { color: '#888', fontSize: 12 },
});
