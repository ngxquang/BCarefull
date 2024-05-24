import React, {useState} from 'react';
import {Button} from '@rneui/themed';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  useColorScheme,
  TextInput,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
// import Home from './home'
import Fonts from '../../../assets/fonts/Fonts';
import {login} from '../../redux/slice/authSlice';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../services/userService';
import { style, BCarefulTheme } from '../../component/Theme';

const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const LoginScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const [email, setEmail] = useState('22520357@gm.uit.edu.vn');
  const [password, setPassword] = useState('Abc@1234');
  const defaultObjValidInput = {
    isValidEmail: true,
    isEmail: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!email) {
      setObjValidInput({...defaultObjValidInput, isValidEmail: false});
      return;
    }
    if (!isValidEmail(email)) {
      setObjValidInput({...defaultObjValidInput, isEmail: false});
      return;
    }
    if (!password) {
      setObjValidInput({...defaultObjValidInput, isValidPassword: false});
      return;
    }
    console.log(JSON.stringify({email, password}));

    const response = await loginUser(email, password);

    if (response && response.data && response.data.errcode === 0) {
      console.log('response', response);
      const roles = response.data.data.roles;
      const username = response.data.data.username;
      const groupName = response.data.data.groupName;
      const groupID = response.data.data.groupID;
      const userInfo = response.data.data.userInfo;
      const token = response.data.data.access_token; // token chứa username và roles

      let data = {
        isAuthenticated: true,
        token,
        account: {
          roles,
          groupName,
          groupID,
          username,
          userInfo,
        },
      };
      console.log('data', data);

      dispatch(login(data));
      Alert.alert('', `${response.data.message}`);
      navigation.navigate('HomeTabs');
      setEmail('');
      setPassword('');
    }
    if (response && response.data && response.data.errcode !== 0) {
      console.log('response', response);

      Alert.alert('Error', `${response.data.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/BackgroundLogin.png')}
        resizeMode="cover"
        style={styles.image}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <ScrollView
          style={styles.scrollView}
          // contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="hanlde">
          <View style={styles.container01}>
            <Image
              source={require('../../../assets/images/Logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.container02}>
            <View style={styles.container021}>
              <Text style={[style.h1]}>Chào Mừng Trở Lại BCareful!</Text>
              <Text style={style.p1}>Đăng Nhập Để Tiếp Tục</Text>
            </View>
            <View style={styles.container022}>
              <View style={styles.itemGroup}>
                <Text style={style.h4}>Email</Text>
                <TextInput
                  style={[
                    style.input,
                    {
                      borderColor:
                        objValidInput.isValidEmail && objValidInput.isEmail
                          ? '#7864EA'
                          : 'red',
                    },
                    {
                      color:
                        objValidInput.isValidEmail && objValidInput.isEmail
                          ? 'black'
                          : 'red',
                    },
                  ]}
                  value={email}
                  onChangeText={value => setEmail(value)}
                />
                <View style={styles.error}>
                  {!objValidInput.isValidEmail && (
                    <Text style={[style.t3, style.danger]}>Chưa nhập email</Text>
                  )}
                  {!objValidInput.isEmail && (
                    <Text style={[style.t3, style.danger]}>
                      Email không đúng định dạng.
                    </Text>
                  )}
                </View>
              </View>
              <View>
                <View style={style.spacebtw}>
                  <Text style={style.h4}>Mật Khẩu</Text>
                </View>
                <TextInput
                  style={[
                    style.input,
                    {
                      borderColor: objValidInput.isValidPassword
                        ? '#7864EA'
                        : 'red',
                    },
                    {color: objValidInput.isValidPassword ? 'black' : 'red'},
                  ]}
                  value={password}
                  onChangeText={value => setPassword(value)}
                  autoCapitalize="none"
                  secureTextEntry={true}
                />
                <View style={styles.error}>
                  {!objValidInput.isValidPassword ? (
                    <Text style={[style.t3, style.danger]}>Chưa nhập password</Text>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
              <View style={style.row}>
                <TouchableOpacity style={styles.saveInfoBtn} />
                <Text style={[style.t3, style.px3]}>Lưu Thông Tin Đăng Nhập</Text>
              </View>
            </View>
            <View style={styles.container023}>
              <TouchableOpacity
                style={style.btn}
                onPress={handleLogin}>
                <Text style={[style.h4, style.white]}>Đăng Nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ForgotPassword');
                }}>
                <Text style={style.t4}>Quên Mật Khẩu?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container03}>
            <TouchableOpacity
              style={style.btnOutlineSub}
              onPress={() => {
                navigation.navigate('Register01');
              }}>
              <Text style={style.h4}>Đăng Kí Tài Khoản Mới</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  container01: {
    flex: 1,
  },
  container02: {
    flex: 1,
    marginHorizontal: 40,
    marginTop: 10,
  },
  container021: {
    flex: 3,
    borderColor: 'back',
  },
  container022: {
    flex: 7,
    borderColor: 'back',
  },
  container023: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: 'back',
  },
  container03: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    marginLeft: 40,
    marginTop: 80,
  },
  error: {
    height: 24,
  },
  forgotPasswordText: {
    color: '#606060',
    fontSize: 10,
    fontFamily: Fonts.regular,
  },
  saveInfoBtn: {
    borderColor: BCarefulTheme.colors.secondary,
    borderWidth: 4,
    borderRadius: 10,
    width: 20,
    height: 20,
  },
  newText: {
    color: '#A8A8A8',
    fontFamily: Fonts.regular,
  },
});

export default LoginScreen;
