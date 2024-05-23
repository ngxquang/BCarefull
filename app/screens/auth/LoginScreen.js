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

const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const LoginScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const [email, setEmail] = useState('1@gmail.com');
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
      navigation.navigate('LichSuKham');
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
              <Text style={styles.title}>Chào Mừng Trở Lại BCareful!</Text>
              <Text style={styles.content}>Đăng Nhập Để Tiếp Tục</Text>
            </View>
            <View style={styles.container022}>
              <View style={styles.itemGroup}>
                <Text style={styles.itemText}>Email</Text>
                <TextInput
                  style={[
                    styles.itemTextInput,
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
                    <Text style={styles.errorText}>Chưa nhập email</Text>
                  )}
                  {!objValidInput.isEmail && (
                    <Text style={styles.errorText}>
                      Email không đúng định dạng.
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.itemGroup}>
                <View style={styles.password}>
                  <Text style={styles.itemText}>Mật Khẩu</Text>
                </View>
                <TextInput
                  style={[
                    styles.itemTextInput,
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
                    <Text style={styles.errorText}>Chưa nhập password</Text>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
              <View style={styles.saveInfo}>
                <TouchableOpacity style={styles.saveInfoBtn} />
                <Text style={styles.saveInfoText}>Lưu Thông Tin Đăng Nhập</Text>
              </View>
            </View>
            <View style={styles.container023}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}>
                <Text style={styles.loginText}>Đăng Nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ForgotPassword');
                }}>
                <Text style={styles.forgotPasswordText}>Quên Mật Khẩu?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container03}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => {
                navigation.navigate('Register01');
              }}>
              <Text style={styles.createText}>Đăng Kí Tài Khoản Mới</Text>
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
  title: {
    fontFamily: Fonts.bold,
    fontSize: 26,
    color: '#000000',
  },
  content: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: '#000000',
    marginTop: -10,
  },
  itemGroup: {},
  itemText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  itemTextInput: {
    fontSize: 16,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: '#7864EA',
    backgroundColor: '#E8D5FF',
    fontFamily: Fonts.regular,
    paddingLeft: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  error: {
    height: 24,
  },
  password: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgotPasswordText: {
    color: '#606060',
    fontSize: 10,
    fontFamily: Fonts.regular,
  },
  saveInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveInfoBtn: {
    borderColor: '#EA793A',
    borderWidth: 4,
    borderRadius: 10,
    width: 20,
    height: 20,
  },
  saveInfoText: {
    marginLeft: 14,
    fontFamily: Fonts.regular,
  },
  loginButton: {
    backgroundColor: '#7864EA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Fonts.bold,
    width: '40%',
    marginTop: 30,
  },
  loginText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
  newText: {
    color: '#A8A8A8',
    fontFamily: 'Nunito-Regular',
  },
  createButton: {
    borderColor: '#EA793A',
    borderWidth: 4,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontSize: 16,
    fontFamily: Fonts.bold,
    justifyContent: 'center',
    alignItems: 'center',
    width: '54%',
    marginHorizontal: 'auto',
  },
  createText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: Fonts.bold,
  },
});

export default LoginScreen;
