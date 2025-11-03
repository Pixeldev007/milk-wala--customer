import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from './DashboardScreen';
import TransactionsScreen from './TransactionsScreen';
import MilkOrderScreen from './MilkOrderScreen';
import PaymentScreen from './PaymentScreen';
import SettingsScreen from './SettingsScreen';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: { backgroundColor: 'rgb(144, 238, 144)' },
        headerTintColor: '#fff',
        headerShadowVisible: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{ headerTitle: '' }} />
      <Drawer.Screen name="Transactions" component={TransactionsScreen} />
      <Drawer.Screen name="Milk Order" component={MilkOrderScreen} />
      <Drawer.Screen name="Payment" component={PaymentScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
