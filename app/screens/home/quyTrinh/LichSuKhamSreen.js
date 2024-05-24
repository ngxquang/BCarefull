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
import {TTKICon} from '../../../component/StatusIcon';
import { compareDates } from '../../../util/appUtil';

function LichSuKhamScreen() {
  const dispatch = useDispatch();
  const lichSuKham = useSelector(state => state.phieuKham.lskByIdBn) || [];
  const user = useSelector(state => state.auth?.user?.account?.userInfo[0]);
  const [displayLSK, setDisplayLSK] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  console.log('user', user);
  console.log('lickSuKham', lichSuKham);
  const [trangThaiList, setTrangThaiList] = useState([
    {id: 1, title: 'Chưa thực hiện'},
    {id: 2, title: 'Đang thực hiện'},
    {id: 3, title: 'Đã hoàn thành'},
    {id: 4, title: 'Đã hủy'},
  ]);

  useEffect(() => {
    if (lichSuKham) {
      let filteredLSK = [...lichSuKham];
      // Lọc theo ngày bắt đầu và ngày kết thúc
      if (startDate && endDate) {
        filteredLSK = filteredLSK.filter((data) => {
          const formatedNGAYKHAM = new Date(data.NGAYKHAM);
          return (
            compareDates(startDate, formatedNGAYKHAM) >= 0 &&
            compareDates(formatedNGAYKHAM, endDate) >= 0
          );
        });
      } else if (startDate) {
        // Chỉ có ngày bắt đầu
        filteredLSK = filteredLSK.filter((data) => {
          const formatedNGAYKHAM = new Date(data.NGAYKHAM);

          return compareDates(startDate, formatedNGAYKHAM) >= 0;
        });
      } else if (endDate) {
        // Chỉ có ngày kết thúc
        filteredLSK = filteredLSK.filter((data) => {
          const formatedNGAYKHAM = new Date(data.NGAYKHAM);

          return compareDates(formatedNGAYKHAM, endDate) >= 0;
        });
      }

      // Lọc theo từ khóa tìm kiếm
      console.log('searchKeyword', searchKeyword);
      if (searchKeyword) {
        filteredLSK = filteredLSK.filter(
          data => data.TRANGTHAITH === searchKeyword,
        );
      }
      console.log('filteredLSK', filteredLSK);
      console.log('startDate', startDate);
      console.log('endDate', endDate);

      setDisplayLSK(filteredLSK);
    }
  }, [lichSuKham, searchKeyword, startDate, endDate]);

  const trangThaiRenderItem = ({item}) => (
    <View
      style={
        item.title === searchKeyword
          ? styles.listItemActive
          : styles.listItemPassive
      }>
      <TouchableOpacity
        onPress={() => {
          setSearchKeyword(item.title);
        }}>
        <Text
          style={
            item.title === searchKeyword
              ? styles.listItemTextActive
              : styles.listItemTextPassive
          }>
          {item.title}
        </Text>
      </TouchableOpacity>
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
          <View>
            <TTKICon
              style={styles.trangThaiThucHien}
              value={item.TRANGTHAITH}
            />
          </View>
        </View>
        <View style={styles.listItemDetail}>
          <TouchableOpacity style={styles.detail}>
            <View style={{flex: 5}}>
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
          <IFNgay title={'Từ ngày'} onDateChange={value => setStartDate(value)}/>
          <FontistoIcon name={'arrow-swap'} style={styles.icon} />
          <IFNgay title={'Đến ngày'} onDateChange={value => setEndDate(value)}/>
        </View>
      </View>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.body}>
          <FlatList data={displayLSK} renderItem={phieuKhamRenderItem} />
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
  },
  listItemActive: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: BCarefulTheme.colors.primary,
    borderBottomWidth: 4,
  },
  listItemPassive: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: 10,
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
    flexDirection: 'row',
    borderColor: BCarefulTheme.colors.primary,
    paddingVertical: 10,
  },
  listItemText: {
    fontSize: 16,
  },
  listItemTextActive: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: BCarefulTheme.colors.primary,
  },
  listItemTextPassive: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: '#000',
  },
  dateTime: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#000',
  },
  trangThaiThucHien: {
    paddingHorizontal: 20,
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
    borderRadius: 10,
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
