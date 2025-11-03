import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './DashboardScreen';
import TransactionsScreen from './TransactionsScreen';
import MilkOrderScreen from './MilkOrderScreen';
import PaymentScreen from './PaymentScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#222',
        tabBarStyle: { backgroundColor: 'rgb(144, 238, 144)', borderTopWidth: 0 },
        tabBarLabelStyle: { fontWeight: 'bold' },
        headerStyle: { backgroundColor: 'rgb(144, 238, 144)' },
        headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Milk Order" component={MilkOrderScreen} />
      <Tab.Screen name="Payment" component={PaymentScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
