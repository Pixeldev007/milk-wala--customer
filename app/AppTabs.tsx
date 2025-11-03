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
    <Tab.Navigator initialRouteName="Dashboard">
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Milk Order" component={MilkOrderScreen} />
      <Tab.Screen name="Payment" component={PaymentScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
