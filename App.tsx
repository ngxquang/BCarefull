import React from 'react';
import type {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BCarefulTheme} from './app/component/Theme';
import {Icon} from '@rneui/base';

// Screen import
import HomeScreen from './app/screens/mainScreen/HomeScreen';
import NotificationScreen from './app/screens/mainScreen/NotificationScreen';
import ProfileScreen from './app/screens/mainScreen/ProfileScreen';
import InformationScreen from './app/screens/mainScreen/InformationScreen';
import DatLichScreen from './app/screens/home/DatLichSreen';
import LichThuocScreen from './app/screens/home/LichThuocScreen';
import QuyTrinhScreen from './app/screens/home/quyTrinh/QuyTrinhScreen';
import TheoDoiScreen from './app/screens/home/TheoDoiScreen';
import ThongTinScreen from './app/screens/profile/ThongTinScreen';
import ChiDuongScreen from './app/screens/home/quyTrinh/ChiDuongScreen';
import DonThuocScreen from './app/screens/home/quyTrinh/DonThuocScreen';
import DSDVScreen from './app/screens/home/quyTrinh/DSDVScreen';
import ThanhToanScreen from './app/screens/home/quyTrinh/ThanhToanScreen';
import KetQuaKhamScreen from './app/screens/home/quyTrinh/KetQuaKhamScreen';
import LichSuKhamScreen from './app/screens/home/quyTrinh/LichSuKhamSreen';
import LogoutScreen from './app/screens/auth/LogoutScreen';
import LoginScreen from './app/screens/auth/LoginScreen';
import RegisterScreen from './app/screens/auth/RegisterScreen';
import CarouselScreen from './app/screens/auth/CarouselScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Home = createBottomTabNavigator();
function HomeTabsScreen() {
  let name = '';

  return (
    <Home.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Information') {
            iconName = focused ? 'documents' : 'documents-outline';
          }
          return <Icon name={iconName} type="ionicon" color={color} />;
        },
        headerShown: false,
      })}>
      <Home.Screen name="Home" component={HomeScreen} />
      <Home.Screen name="Notification" component={NotificationScreen} />
      <Home.Screen name="Profile" component={ProfileScreen} />
      <Home.Screen name="Information" component={InformationScreen} />
    </Home.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={BCarefulTheme}>
      <Stack.Navigator
        initialRouteName="Carousel"
        screenOptions={{headerShown: false}}>
        {/* Home */}
        <Stack.Screen name="HomeTabs" component={HomeTabsScreen} />
        <Stack.Group>
          <Stack.Screen name="DatLich" component={DatLichScreen} />
          <Stack.Screen name="LichThuoc" component={LichThuocScreen} />
          <Stack.Screen name="QuyTrinh" component={QuyTrinhScreen} />
          <Stack.Group>
            <Stack.Screen name="ChiDuong" component={ChiDuongScreen} />
            <Stack.Screen name="DonThuoc" component={DonThuocScreen} />
            <Stack.Screen name="DSDV" component={DSDVScreen} />
            <Stack.Screen name="KetQuaKham" component={KetQuaKhamScreen} />
            <Stack.Screen name="ThanhToan" component={ThanhToanScreen} />
            <Stack.Screen name="LichSuKham" component={LichSuKhamScreen} />
          </Stack.Group>
          <Stack.Screen name="TheoDoi" component={TheoDoiScreen} />
        </Stack.Group>

        <Stack.Screen name="ThongTin" component={ThongTinScreen} />
        <Stack.Group>
          <Stack.Screen name="Carousel" component={CarouselScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Logout" component={LogoutScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
