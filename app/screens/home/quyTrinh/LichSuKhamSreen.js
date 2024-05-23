import {Button} from '@rneui/themed';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IFNgay} from '../../../component/Layout/TabLayout/InputForm';
import {fetchLSKByIdBnAction} from '../../../redux/action/fetchPhieuKhamAction';

function LichSuKhamScreen() {
  const dispatch = useDispatch();
  const lichSuKham = useSelector(state => state.phieuKham.lskByIdBn) || [];
  const [trangThaiList, setTrangThaiList] = useState([
    {id: 1, title: 'Chưa thực hiện'},
    {id: 2, title: 'Đang thực hiện'},
    {id: 3, title: 'Đã hoàn thành'},
    {id: 4, title: 'Đã hủy'},
  ]);

  const trangThaiRenderItem = ({item}) => (
    <View style={styles.listItem}>
      <Button style={styles.listItemText}>{item.title}</Button>
    </View>
  );
  const phieuKhamRenderItem = ({item}) => (
    <View style={styles.listItem}>
      <Button style={styles.listItemText}>
        {item.NGAYKHAMMIN + ' PK' + item.MAPK + ' ' + item.TENDV + ' ' + item.TRANGTHAITH}
      </Button>
    </View>
  );

  useEffect(() => {
    dispatch(fetchLSKByIdBnAction(171));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lịch sử khám</Text>
        <Text style={styles.patientName}>LÊ DUY NGUYÊN (N23-0253996)</Text>
      </View>
      <View style={styles.status}>
        <FlatList
          data={trangThaiList}
          renderItem={trangThaiRenderItem}
          horizontal={true} // Set this to true for horizontal layout
        />
      </View>
      <View style={styles.dateRange}>
        <IFNgay title={'Từ:'} />
        <IFNgay title={'Đến:'} />
      </View>
      <FlatList data={lichSuKham} renderItem={phieuKhamRenderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  patientName: {
    fontSize: 16,
    color: '#888',
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  dateRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default LichSuKhamScreen;
