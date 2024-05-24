import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Fonts from '../../assets/fonts/Fonts';

const stylesMap = ['danger', 'warning', 'success', 'info'];

function TTKICon({ value }) {
  const values = [
    'Đã hủy',
    'Chưa thực hiện',
    'Đã hoàn thành',
    'Đang thực hiện',
  ];
  const stt = findIndexByValue(values, value);
  const style = getStyles(stt);
  return (
    <View style={[styles.common, style]}>
      <Text style={styles.text}>{values[stt]}</Text>
    </View>
  );
}

function TTTT({ value }) {
  const values = ['Không có đơn', 'Chưa thanh toán', 'Đã thanh toán'];
  const stt = findIndexByValue(values, value);
  const style = getStyles(stt);
  return (
    <View style={[styles.common, style]}>
      <Text style={styles.text}>{values[stt]}</Text>
    </View>
  );
}

function TTCLS({ value }) {
  const values = ['Không có đơn', 'Chưa thanh toán', 'Đã thanh toán'];
  const stt = findIndexByValue(values, value);
  const style = getStyles(stt);
  return (
    <View style={[styles.common, style]}>
      <Text style={styles.text}>{values[stt]}</Text>
    </View>
  );
}

function TTT({ value }) {
  const values = ['Không có đơn', 'Chưa thanh toán', 'Đã thanh toán'];
  const stt = findIndexByValue(values, value);
  const style = getStyles(stt);
  return (
    <View style={[styles.common, style]}>
      <Text style={styles.text}>{values[stt]}</Text>
    </View>
  );
}

function findIndexByValue(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1;
}

function getStyles(index) {
  switch (index) {
    case 0:
      return styles.danger;
    case 1:
      return styles.warning;
    case 2:
      return styles.success;
    case 3:
      return styles.info;
    default:
      return {};
  }
}

const styles = StyleSheet.create({
  common: {
    padding: 4,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 16
  },
  danger: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderColor: 'red',
    color: 'red',
  },
  warning: {
    backgroundColor: 'rgba(255, 255, 0, 0.1)',
    borderColor: 'orange',
    color: 'orange',
  },
  success: {
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    borderColor: 'green',
    color: 'green',
  },
  info: {
    backgroundColor: 'rgba(0, 0, 255, 0.1)',
    borderColor: 'blue',
    color: 'blue',
  },
});

export { TTKICon, TTTT, TTCLS, TTT };
