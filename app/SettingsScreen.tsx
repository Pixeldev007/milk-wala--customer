import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.text}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.icon}>🔒</Text>
        <Text style={styles.text}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.icon}>📄</Text>
        <Text style={styles.text}>Terms And Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.icon}>🚪</Text>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: 'rgb(144, 238, 144)' },
  icon: { fontSize: 20, marginRight: 16 },
  text: { fontSize: 16, fontWeight: 'bold' },
});
