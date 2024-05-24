import React, {useState, useEffect} from 'react';
import {View, Text, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {confirmUser} from '../../services/userService';
import Fonts from '../../../assets/fonts/Fonts';
import {verifyUser} from '../../services/userService';


// XAC THUC EMAIL 
const VerificationForm = ({navigation, route}) => {
  console.log('validation', route.params);
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  let interval = null;

  useEffect(() => {
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const handleResendOtp = async () => {
    setCountdown(60);
    setIsResendDisabled(true);
    setOtp(''), 
    await verifyUser(route.params.email);
  };

  const handleConfirm = async () => {
    const email = route.params.email;

    console.log('email', email, 'otp', otp);
    const response = await confirmUser(email, otp);
    if (response && response.data && response.data.errcode === 0) {
      Alert.alert('', `${response.data.message}`);
      clearInterval(interval);
      navigation.navigate('Register02', {...route.params});
    } else {
      console.log('response', response);
      Alert.alert('Error', `${response.data.message}`);
      clearInterval(interval);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Nhập mã OTP</Text>
        <Text style={styles.text}>Vui lòng kiểm tra Email và nhập mã OTP</Text>
        <Text style={styles.text}>chúng tôi vừa gửi cho bạn.</Text>
      </View>

      <OtpInput
        style={styles.otpInput}
        numberOfDigits={6}
        value={otp}
        onTextChange={value => setOtp(value)}
        focusColor={'#7864EA'}
        focusStickBlinkingDuration={400}
        textInputProps={{
          accessibilityLabel: 'One-Time Password',
        }}
        theme={{
          containerStyle: styles.containerOtpInput,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          focusStickStyle: styles.focusStick,
          focusedPinCodeContainerStyle: styles.activePinCodeContainer,
        }}
      />
      <View style={styles.resendCode}>
        <Text style={styles.text}>Không nhận được mã?</Text>
        <TouchableOpacity onPress={handleResendOtp}>
          <Text style={styles.btnText}> Gửi lại mã.</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Mã OTP hết hạn sau: {countdown}s</Text>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.submitBtnText}>Xác Nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  content: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 10,
    fontFamily: Fonts.bold,
    color: '#000000',
  },
  button: {
    backgroundColor: '#7864EA',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginTop: 40,
  },
  resendCode: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#7864EA',
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
  text: {
    fontFamily: Fonts.regular,
    color: '#000000',
    fontSize: 16,
  },
  submitBtnText: {
    fontFamily: Fonts.bold,
    color: '#ffffff',
    fontSize: 18,
  },
  containerOtpInput: {
    color: '#ffffff',
  },
  pinCodeContainer: {
    color: '#ffffff',
  },
  pinCodeText: {
    color: '#ffffff',
  },
  focusStick: {
    color: '#ffffff',
  },
  activePinCodeContainer: {
    color: '#ffffff',
  },
});

export default VerificationForm;
