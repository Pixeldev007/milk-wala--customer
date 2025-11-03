import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default function PaymentScreen() {
  // Dummy data for UI only
  const payments = [
    { id: '1', month: 'June 2022', total: 1200, paid: 1200, due: 0 },
    { id: '2', month: 'July 2022', total: 7890, paid: 7890, due: 0 },
    { id: '3', month: 'August 2022', total: 1800, paid: 1440, due: 360 },
    { id: '4', month: 'September 2022', total: 180, paid: 0, due: 180 },
    { id: '5', month: 'October 2022', total: 180, paid: 0, due: 180 },
    { id: '6', month: 'January 2023', total: 900, paid: 540, due: 360 }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={payments}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.month}</Text>
            <Text style={styles.cell}>{'\u20B9'}{item.total}</Text>
            <Text style={styles.cell}>{'\u20B9'}{item.paid}</Text>
            <Text style={[styles.cell, {color: item.due > 0 ? '#e53935' : '#4caf50'}]}>{'\u20B9'}{item.due}</Text>
            {item.due > 0 && (
              <TouchableOpacity style={styles.payBtn}><Text style={{color:'#fff'}}>PAY DUE</Text></TouchableOpacity>
            )}
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>MONTH</Text>
            <Text style={styles.headerCell}>TOTAL</Text>
            <Text style={styles.headerCell}>PAID</Text>
            <Text style={styles.headerCell}>DUE</Text>
            <Text style={styles.headerCell}></Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7fb', padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 6 },
  cell: { flex: 1, textAlign: 'center', fontSize: 15 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  headerCell: { flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 13 },
  payBtn: { backgroundColor: '#2d8cff', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 14, marginLeft: 6 },
});
