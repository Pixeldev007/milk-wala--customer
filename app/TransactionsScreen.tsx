import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function TransactionsScreen() {
  // Dummy data for UI only
  const transactions = [
    { id: '1', month: 'June 2022', purchased: 1200, paid: 1200 },
    { id: '2', month: 'July 2022', purchased: 7890, paid: 7890 },
    { id: '3', month: 'August 2022', purchased: 1800, paid: 1440 },
    { id: '4', month: 'September 2022', purchased: 180, paid: 0 },
    { id: '5', month: 'October 2022', purchased: 180, paid: 0 },
    { id: '6', month: 'January 2023', purchased: 900, paid: 0 }
  ];
  const totalPurchased = 12150;
  const totalPaid = 11070;
  const totalDue = 1080;

  return (
    <View style={styles.container}>
      <Text style={styles.amountDue}>Amount Due {'\u20B9'}{totalDue}</Text>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.month}</Text>
            <Text style={styles.cell}>{'\u20B9'}{item.purchased}</Text>
            <Text style={styles.cell}>{'\u20B9'}{item.paid}</Text>
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>PURCHASED</Text>
            <Text style={styles.headerCell}>PAID</Text>
          </View>
        }
      />
      <View style={styles.footerRow}>
        <Text style={styles.footerCell}>{'\u20B9'}{totalPurchased} Purchased</Text>
        <Text style={styles.footerCell}>{'\u20B9'}{totalPaid} Paid</Text>
        <Text style={styles.footerCell}>{'\u20B9'}{totalDue} Due</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7fb', padding: 16 },
  amountDue: { color: '#e53935', fontWeight: 'bold', fontSize: 22, textAlign: 'center', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 6 },
  cell: { flex: 1, textAlign: 'center', fontSize: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  headerCell: { flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 14 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  footerCell: { flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#888' },
});
