import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './DashboardScreen';
import MilkOrderScreen from './MilkOrderScreen';
import PaymentScreen from './PaymentScreen';
import SettingsScreen from './SettingsScreen';
import TransactionsScreen from './TransactionsScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#bebebe',
        tabBarStyle: { backgroundColor: '#01559d', borderTopWidth: 0 },
        tabBarLabelStyle: { fontWeight: 'bold' },
        headerStyle: { backgroundColor: '#01559d' },
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
