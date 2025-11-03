import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <View style={styles.avatar}><Text style={styles.avatarText}>NG</Text></View>
        <View style={{marginLeft: 10}}>
          <Text style={styles.userName}>Nikunj Gami (Customer)</Text>
          <Text style={styles.userPhone}>972650293040</Text>
          <Text style={styles.userAddress}>B-104 Samvaad sonnet</Text>
        </View>
      </View>
      {/* Drawer Items */}
      <View style={{flex: 1}}>
        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
          <Text style={styles.menuIcon}>★</Text>
          <Text style={styles.menuText}>Rate Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
          <Text style={styles.menuIcon}>⎋</Text>
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.langBtn}><Text style={styles.langIcon}>🌐</Text></TouchableOpacity>
        <Text style={styles.langText}>English ▼</Text>
        <View style={styles.socialRow}>
          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com')} style={styles.socialBtn}><Text>📷</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://youtube.com')} style={styles.socialBtn}><Text>▶️</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://telegram.org')} style={styles.socialBtn}><Text>✈️</Text></TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  userInfo: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgb(144, 238, 144)', padding: 16, borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: 'bold', fontSize: 18, color: 'rgb(144, 238, 144)' },
  userName: { fontWeight: 'bold', fontSize: 15, color: '#fff' },
  userPhone: { color: '#fff', fontSize: 13 },
  userAddress: { color: '#fff', fontSize: 13 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  menuIcon: { fontSize: 18, marginRight: 12 },
  menuText: { fontSize: 15 },
  bottomSection: { marginTop: 30, alignItems: 'center' },
  langBtn: { backgroundColor: '#fff', borderRadius: 20, padding: 7 },
  langIcon: { fontSize: 18 },
  langText: { marginTop: 6, marginBottom: 14 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
  socialBtn: { backgroundColor: 'rgb(144, 238, 144)', borderRadius: 20, padding: 10, marginHorizontal: 4 },
});
