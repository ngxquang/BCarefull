import {Text, TouchableOpacity, View, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader} from '../../../component/Header';
import {style} from '../../../component/Theme';
import {useNavigation} from '@react-navigation/native';
import { fetchCTDTByIdAction } from '../../../redux/action/fetchCTDTById'
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';

function DatLichNhacThuocScreen({route}) {
  const navigation = useNavigation();
  const maPK = route.params.item.MAPK;
  const tenDV = route.params.item.TENDV;
  console.log('params: ', route.params.item);
  console.log('mapk: ', maPK);
  const dispatch = useDispatch();
  const ctdtById = useSelector(state => state.ctdtById.data) || [];
  console.log('ctdt', ctdtById);
  const isLoading = useSelector(state => state.ctdtById?.isLoading);
  const user = useSelector(state => state.auth?.user?.account?.userInfo[0]);

  useEffect(() => {
    dispatch(fetchCTDTByIdAction(maPK));
  }, [dispatch]);

  const renderMedicineItem = ({ item }) => (
    <View style={styles.medicineCard}>
      <Text style={styles.medicineName}>{item.TENTHUOC}</Text>
      <Text>Lần/ngày: {item.SOLANUONG}</Text>
      <Text>Số lượng / lần: {item.SOLUONGUONG}</Text>
      <Text>Cách dùng: {item.GHICHU}</Text>
      <TouchableOpacity style={styles.reminderButton} onPress={() => navigation.navigate('ThemThuoc', { item: item })}>
        <Text style={styles.reminderButtonText}>Đã đặt lịch nhắc</Text>
      </TouchableOpacity>
    </View>
  );



  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title={'Đặt lịch nhắc thuốc'} />
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View style={styles.header}>
          <Text style={styles.headerText}>Toa thuốc: {tenDV}</Text>
        </View>
        <FlatList
          data={ctdtById}
          renderItem={renderMedicineItem}
          keyExtractor={item => item.MATHUOC.toString()}
          ListEmptyComponent={<Text>Không có dữ liệu thuốc</Text>}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  medicineCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reminderButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#4caf50',
    alignItems: 'center',
  },
  reminderButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DatLichNhacThuocScreen;
