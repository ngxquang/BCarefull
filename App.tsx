import React from 'react';
import type {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BCarefulTheme} from './app/component/Theme';
import {Icon} from '@rneui/base';
import {Provider} from 'react-redux';
import store from './app/redux/store';
// import PrivateRoute from './app/helper/PrivateRoute';
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
import ForgotPassword from './app/screens/auth/ForgotPasswordScreen';
import LoginScreen from './app/screens/auth/LoginScreen';
import RegisterScreen01 from './app/screens/auth/RegisterScreen01';
import RegisterScreen02 from './app/screens/auth/RegisterScreen02';
import RegisterScreen03 from './app/screens/auth/RegisterScreen03';
import VerificationForm from './app/screens/auth/VerificationForm';
import ChonHoSo from './app/component/ChonHoSo';
import { Linking, AppState } from 'react-native';
import { useEffect, useState } from 'react';
import socket from './app/setup/socket';
import { Alert } from 'react-native';
import axios from './app/setup/axios';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Home = createBottomTabNavigator();

function HomeTabsScreen() {
  return (
    <Home.Navigator
      initialRouteName="Profile"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

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
  const linking = {
    prefixes: ['bcareful://'],
    config: {
      screens: {
        LichSuKham: 'dsdv',
      }
    }
  };

  const handleDeepLink = async ({ url }: { url: string }) => {
    console.log(">>>>>>>>>ham handle deeplink dược sọi")
    if (url) {
      console.log('Parsed parameters:', url);
      const response = await axios.post("/hoadon/thanhtoan", {
        MAHD: 204,
        MALOAIHD: 1,
        THANHTIEN: 300000,
        maLT: 102,
        tttt: "Đã thanh toán",
        tdtt: new Date(),
        pttt: 'Chuyển khoản',
      });
      if (response.status === 200) {
        socket.emit("send-message", {actionName: 'DSHD', maID: 181});
        socket.emit("send-message", {actionName: 'DSDK'});
      }
    }
    else {
      console.log('>>>>>>> ko nhan duoc url deeplink');
    }
  };

  useEffect(() => {
    socket.emit("send-message", {message: 'HELLO FROM MOBILE'});
    socket.on("receive-message", (data: object)=>{
      Alert.alert("Co nguoi khac dang nhap");
    })
    
    // Bộ lắng nghe sự kiện để xử lý các sự kiện deep link
    const linkingListener = Linking.addEventListener('url', handleDeepLink);

    return () => {
      linkingListener.remove();
    };
  })
  
  return (
    <Provider store={store}>
      <NavigationContainer theme={BCarefulTheme} linking={linking}>
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
          {/* Home */}
          <Stack.Screen name="HomeTabs" component={HomeTabsScreen} />
          <Stack.Group>
            <Stack.Screen name="DatLich" component={DatLichScreen} />
            <Stack.Screen name="LichThuoc" component={LichThuocScreen} />
            <Stack.Screen name="QuyTrinh" component={QuyTrinhScreen} />
            <Stack.Group>
              <Stack.Screen name="HoSo" component={ChonHoSo} />
              <Stack.Screen name="ChiDuong" component={ChiDuongScreen} />
              <Stack.Screen name="DonThuoc" component={DonThuocScreen} />
              <Stack.Screen name="DSDV" component={DSDVScreen} />
              <Stack.Screen name="KetQuaKham" component={KetQuaKhamScreen} />
              <Stack.Screen name="ThanhToan" component={ThanhToanScreen} />
              <Stack.Screen name="LichSuKham" component={LichSuKhamScreen} />
            </Stack.Group>
            <Stack.Screen name="TheoDoi" component={TheoDoiScreen} />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Register01" component={RegisterScreen01} />
            <Stack.Screen name="Register02" component={RegisterScreen02} />
            <Stack.Screen name="Register03" component={RegisterScreen03} />
            <Stack.Screen name="VerificationForm" component={VerificationForm} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <PrivateRoute name="HomeTabs" component={HomeTabsScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }

export default App;
