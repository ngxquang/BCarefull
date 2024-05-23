import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {IFNgay} from '../../../component/Layout/TabLayout/InputForm';
import {fetchLSKByIdBnAction} from '../../../redux/action/fetchPhieuKhamAction';
import Fonts from '../../../../assets/fonts/Fonts';
import {BCarefulTheme} from '../../../component/Theme';

function LichSuKhamScreen() {
  const dispatch = useDispatch();
  const lichSuKham = useSelector(state => state.phieuKham.lskByIdBn) || [];
  const user = useSelector(state => state.auth?.user.account.userInfo[0]); // user chứa token, isAuthenticated, account
  console.log('user', user);
  console.log('lickSuKham', lichSuKham);
  const [trangThaiList, setTrangThaiList] = useState([
    {id: 1, title: 'Chưa thực hiện'},
    {id: 2, title: 'Đang thực hiện'},
    {id: 3, title: 'Đã hoàn thành'},
    {id: 4, title: 'Đã hủy'},
  ]);

  const trangThaiRenderItem = ({item}) => (
    <View style={styles.listItem}>
      <Button
        title={item.title}
        style={styles.listItemText}
        onPress={() => {}}
      />
    </View>
  );

  const phieuKhamRenderItem = ({item}) => (
    <View style={[styles.listItem, {marginVertical: 10}]}>
      <View style={styles.bodyLeft}>
        <View style={styles.chainLeft}></View>
        <View style={styles.chain}></View>
        <View style={styles.chainRight}></View>
      </View>
      <View style={styles.bodyRight}>
        <View style={styles.listItemDateTime}>
          <Text style={styles.dateTime}>{item.NGAYKHAMMIN}</Text>
          <Text style={styles.trangThaiThucHien}>{item.TRANGTHAITH}</Text>
        </View>
        <View style={styles.listItemDetail}>
          <TouchableOpacity style={styles.detail}>
            <View style={{flex: 4}}>
              <Text style={styles.maPhieuKham}>MAPK - {item.MAPK}</Text>
              <Text style={styles.tenDichVu}>{item.TENDV.toUpperCase()}</Text>
            </View>
            <FontistoIcon
              name={'angle-right'}
              style={[styles.icon, {alignSelf: 'center', flex: 1}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    dispatch(fetchLSKByIdBnAction(user.MABN));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lịch sử khám</Text>
        <Text style={styles.patientName}>
          {user.HOTEN} (Mã BN - {user.MABN})
        </Text>
      </View>
      <View style={styles.status}>
        <FlatList
          data={trangThaiList}
          renderItem={trangThaiRenderItem}
          horizontal={true}
        />
      </View>
      <View style={styles.date}>
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: '#000',
            paddingLeft: 16,
            fontSize: 16,
          }}>
          Chọn ngày
        </Text>
        <View style={styles.dateRange}>
          <IFNgay title={'Từ ngày'} />
          <FontistoIcon name={'arrow-swap'} style={styles.icon} />
          <IFNgay title={'Đến ngày'} />
        </View>
      </View>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.body}>
          <FlatList data={lichSuKham} renderItem={phieuKhamRenderItem} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DED9FA',
  },
  header: {
    padding: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: '#000',
  },
  patientName: {
    fontSize: 16,
    color: '#000',
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 2,
    backgroundColor: '#fff',
  },
  date: {
    backgroundColor: '#fff',
    marginVertical: 6,
    paddingVertical: 8,
  },
  dateRange: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: 26,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
  },
  icon: {
    fontSize: 26,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
  },
  scrollView: {
    flex: 1,
  },
  body: {
    marginTop: 10,
  },
  listItem: {
    flex: 1,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bodyLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  bodyRight: {
    flex: 14,
    paddingVertical: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemDateTime: {
    flex: 3,
  },
  listItemDetail: {
    flex: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  detail: {
    borderWidth: 4,
    borderRadius: 10,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderColor: BCarefulTheme.colors.primary,
    paddingVertical: 10,
  },
  listItemText: {
    fontSize: 16,
  },
  dateTime: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#000',
  },
  trangThaiThucHien: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: '#000',
  },
  maPhieuKham: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: '#000',
  },
  tenDichVu: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: '#000',
  },
  chain: {
    borderWidth: 2,
    borderColor: 'red',
    width: 1,
    height: 10,
    flexGrow: 1,
  },
  chainLeft: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 5,
    width: 10,
    height: 10,
  },
  chainRight: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    width: 10,
    height: 10,
  },
});

export default LichSuKhamScreen;
