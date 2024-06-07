import {Text, TouchableOpacity, View, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader} from '../../../component/Header';
import {style} from '../../../component/Theme';
import {useNavigation} from '@react-navigation/native';
import {fetchLSKByIdBnAction} from '../../../redux/action/fetchPhieuKhamAction';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import Fonts from '../../../../assets/fonts/Fonts';

function QuanLyThuocScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const lichSuKham = useSelector(state => state.phieuKham?.lskByIdBn) || [];
  console.log('lich su kham: ', lichSuKham);
  const isLoading = useSelector(state => state.phieuKham?.isLoading);
  const user = useSelector(state => state.auth?.user?.account?.userInfo[0]);

  useEffect(() => {
    dispatch(fetchLSKByIdBnAction(user.MABN));
  }, [dispatch]);

  const handlePress = item => {
    navigation.navigate('DatLichNhacThuoc', {item});
  };

  const renderPrescriptionItem = ({item}) => (
    <TouchableOpacity
      style={styles.prescriptionCard}
      onPress={() => handlePress(item)}>
      <Text style={style.h6}>Mã Phiếu Khám: {item.MAPK}</Text>
      <Text style={style.h6}>Mã Đơn Thuốc: {item.MADT}</Text>
      <Text style={style.t1}>Dịch vụ: {item.TENDV}</Text>
      <Text style={style.t1}>Ngày khám: {item.NGAYKHAMMIN}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'Quản lý toa thuốc'} />
      <SafeAreaView style={{flex: 1, padding: 16}}>
        {/* <TouchableOpacity
          style={style.btn}
          onPress={() => {
            navigation.navigate('ThemThuoc');
          }}>
          <Text>Thêm thuốc</Text>
        </TouchableOpacity> */}
        <Text style={style.h4}>Danh sách toa thuốc ({lichSuKham.length})</Text>
        <FlatList
          data={lichSuKham}
          renderItem={renderPrescriptionItem}
          keyExtractor={item => item.MAPK.toString()}
          ListEmptyComponent={<Text>Không có dữ liệu toa thuốc</Text>}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  prescriptionCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  specialtyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
});

export default QuanLyThuocScreen;
