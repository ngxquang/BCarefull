import React, {useState, useEffect, useRef} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import Fonts from '../../../assets/fonts/Fonts';
import {verifyUser} from '../../services/userService';
import {fetchAllBenhNhanAction} from '../../redux/slice/getAllBenhNhanSlice';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';

//NHAP EMAIL VA GUI XAC THUC
const verifyEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const RegisterScreen01 = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayPatients, setDisplayPatients] = useState([]);
  const patients = useSelector(state => state.benhNhan?.data) || [];
  const selectDropdownRef = useRef();
  const [oldPatient, setOldPatient] = useState({});
  console.log('patient', patients);
  console.log('oldPatient', oldPatient.MABN);

  useEffect(() => {
    dispatch(fetchAllBenhNhanAction());
  }, []);

  useEffect(() => {
    if (patients) {
      let filteredPatients = [...patients];
      if (email) {
        filteredPatients = filteredPatients.filter(
          data => data.EMAIL === email,
        );
        setDisplayPatients(filteredPatients);
        if (filteredPatients.length === 0) {
          setOldPatient({});
        }
      } else {
        setDisplayPatients([]);
      }
    }
  }, [email]);

  console.log('displayPatients', displayPatients);

  const defaultObjValidInput = {
    isValidEmail: true,
    isEmail: true,
    isRegister: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const openDropdown = () => {
    if (displayPatients.length > 0) {
      selectDropdownRef.current?.openDropdown();
    } else {
      setObjValidInput({...defaultObjValidInput, isRegister: false});
    }
  };

  const handleVerify = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!email) {
      setObjValidInput({...defaultObjValidInput, isValidEmail: false});
      return;
    }
    if (!verifyEmail(email)) {
      setObjValidInput({...defaultObjValidInput, isEmail: false});
      return;
    }

    setIsLoading(true);
    const response = await verifyUser(email);
    console.log('email', email);

    if (response && response.data && response.data.errcode === 0) {
      setIsLoading(false);
      navigation.navigate('VerificationForm', {...oldPatient, email});
    }
    if (response && response.data && response.data.errcode !== 0) {
      Alert.alert('Error', `${response.data.message}`);
    }
  };

  const handlePatientSelect = selectedItem => {
    setOldPatient({...selectedItem});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
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
          keyboardShouldPersistTaps="hanlde">
          <View style={styles.container01}>
            <Image
              source={require('../../../assets/images/Logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.container02}>
            <View style={styles.container021}>
              <Text style={styles.title}>Chào Mừng Đến Với BCareful!</Text>
              <Text style={styles.content}>Nhập Email Để Tiếp Tục</Text>
            </View>
            <View style={styles.container022}>
              <View>
                <Text style={styles.itemText}>Email</Text>
                <View style={styles.itemGroup}>
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
                      {
                        borderWidth: 4,
                        borderRadius: 0,
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                        flexGrow: 1,
                      },
                    ]}
                    value={email}
                    onChangeText={value => setEmail(value)}
                  />
                  <TouchableOpacity
                    style={[
                      styles.dropdownButtonStyle,
                      {
                        width: 60,
                        borderWidth: 4,
                        borderRadius: 0,
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                      },
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
                      {
                        backgroundColor:
                          email && verifyEmail(email) ? '#E8D5FF' : '#999',
                      },
                    ]}
                    disabled={!(email && verifyEmail(email))}
                    onPress={openDropdown}>
                    <Icon name={'account-search'} style={styles.iconStyle} />
                  </TouchableOpacity>
                </View>
                <View style={styles.error}>
                  {!objValidInput.isValidEmail && (
                    <Text style={styles.errorText}>Chưa nhập email.</Text>
                  )}
                  {!objValidInput.isEmail && (
                    <Text style={styles.errorText}>
                      Email không đúng định dạng.
                    </Text>
                  )}
                  {!objValidInput.isRegister && (
                    <Text style={styles.errorText}>
                      Không tìm thấy hồ sơ tương ứng với email.
                    </Text>
                  )}
                </View>
                <SelectDropdown
                  ref={selectDropdownRef}
                  data={displayPatients}
                  onSelect={selectedItem => handlePatientSelect(selectedItem)}
                  renderItem={(item, index, isSelected) => (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && {backgroundColor: '#D2D9DF'}),
                      }}>
                      <Text style={styles.dropdownItemTxtStyle}>
                        {item.HOTEN + ' - ' + item.SDT}
                      </Text>
                      <Icon name={'chevron-right'} style={styles.iconStyle} />
                    </View>
                  )}
                  showsVerticalScrollIndicator={true}
                  dropdownStyle={styles.dropdownMenuStyle}
                />
              </View>
              {oldPatient.HOTEN ? (
                <View style={styles.displayTTBN}>
                  <Text style={styles.itemText}>Thông tin bệnh nhân</Text>
                  <View style={[styles.itemTextInput]}>
                    <View
                      style={[
                        styles.itemGroup,
                        {justifyContent: 'center', alignItems: 'center'},
                      ]}>
                      <Icon
                        name={'information'}
                        style={[styles.iconStyle, {marginRight: 8}]}
                      />
                      <TextInput
                        style={[
                          styles.itemText,
                          {fontFamily: Fonts.regural, flex: 1},
                        ]}
                        value={oldPatient.HOTEN}
                        editable={false}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={[
                          styles.itemGroup,
                          {
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1, // Thêm flex: 1 để chia đều không gian
                            marginRight: 4, // Thêm khoảng cách giữa các View con nếu cần
                          },
                        ]}>
                        <Icon
                          name={'barcode'}
                          style={[styles.iconStyle, {marginRight: 8}]}
                        />
                        <TextInput
                          style={[
                            styles.itemText,
                            {fontFamily: Fonts.regural, flex: 1},
                          ]}
                          value={'BN - ' + oldPatient.MABN}
                          editable={false}
                        />
                      </View>
                      <View
                        style={[
                          styles.itemGroup,
                          {
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1, // Thêm flex: 1 để chia đều không gian
                          },
                        ]}>
                        <Icon
                          name={'cellphone'}
                          style={[styles.iconStyle, {marginRight: 8}]}
                        />
                        <TextInput
                          style={[
                            styles.itemText,
                            {fontFamily: Fonts.regural, flex: 1},
                          ]}
                          value={oldPatient.SDT}
                          editable={false}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.displayTTBN}></View>
              )}
            </View>
            <View style={styles.container023}>
              <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
                <Text style={styles.verifyText}>Xác thực</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container03}>
            <Text style={styles.questionText}>Đã có tài khoản?</Text>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.loginText}>Đăng Nhập Tài Khoản</Text>
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
  spinnerTextStyle: {
    color: '#FFF',
  },
  dropdownButtonStyle: {
    backgroundColor: '#E8D5FF',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 4,
    borderStartWidth: 0,
    borderColor: '#7864EA',
  },
  iconStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E8D5FF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: '#7864EA',
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: '#000',
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
    marginTop: 10,
  },
  container03: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    marginLeft: 40,
    marginTop: 80,
  },
  questionText: {
    color: '#606060',
    fontSize: 12,
    fontFamily: Fonts.regural,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 26,
    color: '#000000',
  },
  content: {
    fontFamily: Fonts.regural,
    fontSize: 16,
    color: '#000000',
    marginTop: -10,
  },
  itemGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  itemTextInput: {
    color: 'black',
    fontSize: 16,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: '#7864EA',
    backgroundColor: '#E8D5FF',
    fontFamily: Fonts.regural,
    paddingLeft: 8,
  },
  displayTTBN: {
    height: 160,
    marginTop: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: Fonts.regural,
  },
  error: {
    height: 20,
  },
  verifyBtn: {
    backgroundColor: '#EA793A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Fonts.bold,
    width: '40%',
  },
  verifyText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
  loginBtn: {
    borderColor: '#7864EA',
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
  loginText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: Fonts.bold,
  },
});

export default RegisterScreen01;
