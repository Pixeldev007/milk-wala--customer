import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { DrawerContentComponentProps } from '@react-navigation/drawer';
export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}>
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
        <TouchableOpacity style={[styles.menuItem, {backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}]} onPress={() => navigation.navigate('Dashboard')}>
          <AntDesign name="home" color="#222" size={20} style={styles.menuIcon} />
          <Text style={styles.menuText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, {backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}]} onPress={() => navigation.navigate('Transactions')}>
          <Feather name="credit-card" color="#222" size={20} style={styles.menuIcon} />
          <Text style={styles.menuText}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, {backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}]} onPress={() => navigation.navigate('Milk Order')}>
          <Feather name="shopping-bag" color="#222" size={20} style={styles.menuIcon} />
          <Text style={styles.menuText}>Milk Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, {backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}]} onPress={() => navigation.navigate('Payment')}>
          <Feather name="dollar-sign" color="#222" size={20} style={styles.menuIcon} />
          <Text style={styles.menuText}>Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, {backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}]} onPress={() => Linking.openURL('market://details?id=com.milkwalacustomer') /* Replace with your app's package */}>
          <Feather name="star" size={20} color="#222" style={styles.menuIcon} />
          <Text style={styles.menuText}>Rate Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, {backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}]} onPress={() => {
          // TODO: Clear user session/token here
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], // Replace 'Login' with your actual login screen name
          });
        }}>
          <Feather name="log-out" color="#222" size={20} style={styles.menuIcon} />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {/* Bottom Section */}
      <View style={[styles.bottomSection, {backgroundColor: 'transparent'}]}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 18}}>
          {/* Black skeleton/logo icon, e.g., a simple SVG or emoji placeholder */}
          <Feather name="globe" size={26} color="#222" />
          <Text style={styles.langText}>English ▼</Text>
        </View>
        <View style={styles.socialRow}>
          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com')} style={styles.socialBtn}><FontAwesome name="instagram" size={18} color="#C13584" /></TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')} style={styles.socialBtn}><FontAwesome name="facebook" size={18} color="#1877F3" /></TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://youtube.com')} style={styles.socialBtn}><FontAwesome name="youtube" size={18} color="#FF0000" /></TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.socialBtn}><Feather name="share-2" size={18} color="#222" /></TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  userInfo: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgb(144, 238, 144)', padding: 16, borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgb(144, 238, 144)', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: 'bold', fontSize: 18, color: '#fff' },
  userName: { fontWeight: 'bold', fontSize: 15, color: '#222' },
  userPhone: { color: '#222', fontSize: 13 },
  userAddress: { color: '#222', fontSize: 13 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: 'rgb(144, 238, 144)' },
  menuIcon: { fontSize: 18, marginRight: 12, color: '#fff' },
  menuText: { fontSize: 15, color: '#222' },
  bottomSection: { marginTop: 30, alignItems: 'center', backgroundColor: 'transparent' },
  langBtn: { backgroundColor: 'rgb(144, 238, 144)', borderRadius: 20, padding: 7, borderColor: '#fff', borderWidth: 1 },
  langIcon: { fontSize: 18, color: '#fff' },
  langText: { marginTop: 6, marginBottom: 14, color: '#222' },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
  socialBtn: { backgroundColor: 'rgb(144, 238, 144)', borderRadius: 20, padding: 10, marginHorizontal: 4 },
});
