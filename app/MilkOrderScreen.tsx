import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MilkOrderScreen() {
  return (
    <View style={styles.container}>
      {/* Date selector */}
      <View style={styles.dateRow}>
        <Text style={styles.dateBtn}>MON 30</Text>
        <Text style={styles.dateBtn}>TUE 31</Text>
        <Text style={styles.dateBtn}>WED 01</Text>
        <Text style={styles.dateBtn}>THU 02</Text>
      </View>
      <Text style={styles.selectedDate}>30-January-2023</Text>
      <Text style={styles.infoText}>Your scheduled milk is coming daily so no need to change anything here, but if you want extra milk or less milk or don't want milk you can set from here. Once you put any order your milkman notified instantly.</Text>
      <View style={styles.productRow}>
        <Text style={styles.productName}>BUFFALO MILK - ₹60</Text>
        <View style={styles.qtyBox}>
          <Text style={styles.qtyLabel}>Morning</Text>
          <Text style={styles.qtyValue}>6</Text>
        </View>
        <View style={styles.qtyBox}>
          <Text style={styles.qtyLabel}>Evening</Text>
          <Text style={styles.qtyValue}>3</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.placeOrderBtn}><Text style={{color:'#fff'}}>Place Order For 30-January-2023</Text></TouchableOpacity>
      <TouchableOpacity style={styles.noDeliveryBtn}><Text style={{color:'#fff'}}>Don't Deliver For 30-January-2023</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  dateBtn: { backgroundColor: '#fff', color: '#222', borderColor: 'rgb(144, 238, 144)', borderWidth: 1, padding: 8, borderRadius: 6, fontWeight: 'bold', minWidth: 60, textAlign: 'center' },
  selectedDate: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  infoText: { color: '#888', fontSize: 13, marginBottom: 12 },
  productRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: 'rgb(144, 238, 144)' },
  productName: { flex: 2, fontWeight: 'bold' },
  qtyBox: { flex: 1, alignItems: 'center' },
  qtyLabel: { color: '#888', fontSize: 12 },
  qtyValue: { fontWeight: 'bold', fontSize: 18 },
  placeOrderBtn: { backgroundColor: 'rgb(144, 238, 144)', borderRadius: 8, padding: 14, alignItems: 'center', marginBottom: 10 },
  noDeliveryBtn: { backgroundColor: '#ffb300', borderRadius: 8, padding: 14, alignItems: 'center' },
});
