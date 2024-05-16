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
import DatLichScreen from './app/screens/DatLichSreen';
import LichThuocScreen from './app/screens/LichThuoc';
import QuyTrinhScreen from './app/screens/QuyTrinhScreen';
import TheoDoiScreen from './app/screens/TheoDoiScreen';

const Tab = createBottomTabNavigator();

const Home = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <Home.Navigator screenOptions={{headerShown: false}}>
      <Home.Screen name="HomeScreen" component={HomeScreen} />
      <Home.Screen name="DatLich" component={DatLichScreen} />
      <Home.Screen name="LichThuoc" component={LichThuocScreen} />
      <Home.Screen name="QuyTrinh" component={QuyTrinhScreen} />
      <Home.Screen name="TheoDoi" component={TheoDoiScreen} />
    </Home.Navigator>
  );
}

const Notification = createNativeStackNavigator();
function NotificationStackScreen() {
  return (
    <Notification.Navigator screenOptions={{headerShown: false}}>
      <Notification.Screen name="NotificationScreen" component={NotificationScreen} />
    </Notification.Navigator>
  );
}

const Profile = createNativeStackNavigator();
function ProfileStackScreen() {
  return (
    <Profile.Navigator screenOptions={{headerShown: false}}>
      <Profile.Screen name="ProfileScreen" component={ProfileScreen} />
    </Profile.Navigator>
  );
}

const Information = createNativeStackNavigator();
function InformationStackScreen() {
  return (
    <Information.Navigator screenOptions={{headerShown: false}}>
      <Information.Screen name="InformationScreen" component={InformationScreen} />
    </Information.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={BCarefulTheme}>
      {/* Tav */}
      <Tab.Navigator
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

            // You can return any component that you like here!
            return <Icon name={iconName} type="ionicon" color={color} />;
          },
          headerShown: false,
        })}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Notification" component={NotificationStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
        <Tab.Screen name="Information" component={InformationStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
