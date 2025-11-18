import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import DashboardScreen from './DashboardScreen';
import MyOrdersScreen from './MyOrdersScreen';
import PaymentScreen from './PaymentScreen';
import SettingsScreen from './SettingsScreen';
import TransactionsScreen from './TransactionsScreen';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: { backgroundColor: '#01559d' },
        headerTintColor: '#fff',
        headerShadowVisible: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{ headerTitle: '' }} />
      <Drawer.Screen name="My Orders" component={MyOrdersScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Transactions" component={TransactionsScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Payment" component={PaymentScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
