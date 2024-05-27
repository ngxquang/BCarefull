import React, {useEffect, useState} from 'react';
import {Button} from '@rneui/themed';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  TextInput,
  Alert,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Fonts from '../../../../assets/fonts/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCTDTByIdAction} from '../../../redux/action/fetchCTDTById';
import {fetchBenhNhanByIdAction} from '../../../redux/action/fetchAllBenhNhanAction';
import {fetchDSHDByIdAction} from '../../../redux/action/fetchHoaDonAction';
import {fetchDsClsByIdAction} from '../../../redux/action/fetchCLSAction';
import {fetchTTKAction} from '../../../redux/action/fetchTTKAction';
import {fetchBenhByIdAction} from '../../../redux/action/fetchBenhByIdAction';
import {fetchPkByIdHdAction} from '../../../redux/action/fetchPhieuKhamAction';
import {BCarefulTheme} from '../../../component/Theme';
import {fetchPhieuKhamByIdAction} from '../../../redux/action/fetchPhieuKhamByIdAction';
import {TTKICon} from '../../../component/StatusIcon';
import {TTTTIcon} from '../../../component/StatusIcon';
import Icon from 'react-native-vector-icons/Ionicons';

function DSDVScreen({navigation, route}) {
  const dispatch = useDispatch();
  const maPK = route.params.item.MAPK;
  console.log('route.params.item', route.params.item);
  const ctdtById = useSelector(state => state.ctdtById.data) || [];
  console.log('ctdtById', ctdtById);
  const benhNhan = useSelector(state => state.benhNhan.data) || [];
  console.log('benhNhan', benhNhan);
  const hoaDon = useSelector(state => state.hoaDon.dshd) || [];
  console.log('hoaDon', hoaDon);
  const lskByIdBn = useSelector(state => state.dsdk.lskByIdBn) || [];
  const pkByIdHd = useSelector(state => state.dsdk.pkByIdHd) || [];
  console.log('lskByIdBn', lskByIdBn);
  console.log('pkByIdHd', pkByIdHd);
  const ttk = useSelector(state => state.ttk.data) || [];
  console.log('ttk', ttk);
  const benhById = useSelector(state => state.benhById.data) || [];
  console.log('benhById', benhById);
  const clsById = useSelector(state => state.clsById.dsClsById) || [];
  const isLoadingCLS = useSelector(state => state.clsById.isLoading);
  console.log('isLoadingCLS', isLoadingCLS);

  console.log('clsById', clsById);
  const phieuKhamById = useSelector(state => state.phieuKhamById?.data) || [];
  const isLoadingPK = useSelector(state => state.isLoading?.data);

  console.log('isLoadingPK', isLoadingPK);

  console.log('phieuKhamById', phieuKhamById);
  const phieuKhamArray = Array.isArray(phieuKhamById)
    ? phieuKhamById
    : [phieuKhamById];
  const data = [...phieuKhamArray, ...clsById];
  console.log('data', data);
  const isLoading = isLoadingCLS && isLoadingPK;
  console.log('isLoading', isLoading);

  const [displayLSK, setDisplayLSK] = useState([]);

  const handleThanhToan = item => {
    console.log('item.TTTT', item.TTTT);

    if (item.TTTT !== 'Đã thanh toán') {
      navigation.navigate('ThanhToan');
    }
  };

  const phieuKhamRenderItem = ({item}) => (
    <View style={[styles.listItem]}>
      <View style={styles.bodyLeft}>
        <View style={styles.chainLeft}></View>
        <View style={styles.chain}></View>
        <View style={styles.chainRight}></View>
      </View>
      <View style={styles.bodyRight}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {item.NGAYKHAMMIN ? item.NGAYKHAMMIN.split(' - ')[1] : ''}
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.statusContainer}>
            <TTKICon
              style={styles.trangThaiThucHien}
              value={item.TRANGTHAITH}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.tenDichVu}>{item.TENDV}</Text>
            {item.INFOBSCD && item.INFOBSTH ? (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={[styles.doctor, {fontFamily: Fonts.bold}]}>
                    BSCD:{' '}
                  </Text>
                  <Text style={styles.doctor}>{item.INFOBSCD}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={[styles.doctor, {fontFamily: Fonts.bold}]}>
                    BSTH:{' '}
                  </Text>
                  <Text style={styles.doctor}>{item.INFOBSTH}</Text>
                </View>
              </>
            ) : (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={[styles.doctor, {fontFamily: Fonts.bold}]}>
                    Bác sĩ:{' '}
                  </Text>
                  <Text style={styles.doctor}>{item.INFOBS}</Text>
                </View>
              </>
            )}

            <Text style={styles.stt}>STT: 07</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.paidButton}
                onPress={() => {
                  handleThanhToan(item);
                }}>
                <TTTTIcon value={item.TTTT} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.routeButton}>
                <Text style={styles.routeText}>Chỉ đường</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    dispatch(fetchCTDTByIdAction(maPK));
    dispatch(fetchBenhNhanByIdAction(maPK));
    dispatch(fetchDSHDByIdAction(maPK));
    dispatch(fetchDsClsByIdAction(maPK));
    dispatch(fetchPkByIdHdAction(maPK));
    dispatch(fetchTTKAction(maPK));
    dispatch(fetchBenhByIdAction(maPK));
    dispatch(fetchPhieuKhamByIdAction(maPK));
  }, [maPK]);

  console.log('mapk', maPK);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.content}>Chi tiết phiếu khám MAPK - {maPK}</Text>
          <Text style={styles.dateTime}>{route.params.item.NGAYKHAMMIN}</Text>
        </View>
      </View>
      {isLoadingCLS ? (
        <>
          <ActivityIndicator size="large" />
        </>
      ) : (
        <>
          <View style={styles.body}>
            <FlatList data={data} renderItem={phieuKhamRenderItem} />
          </View>
        </>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.routeText}>Hủy phiếu khám</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: '#6C4EF1',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  statusContainer: {
    position: 'absolute',
    top: -20,
    left: -44,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  timeContainer: {
    marginRight: 2,
  },
  timeText: {
    fontSize: 16,
    color: '#000',
  },
  detailsContainer: {
    flex: 1,
  },
  doctor: {
    fontSize: 16,
    color: '#000',
    marginVertical: 4,
  },
  stt: {
    fontSize: 14,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  paidButton: {
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 1,
  },
  routeButton: {
    borderColor: BCarefulTheme.colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 1,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeText: {
    color: BCarefulTheme.colors.primary,
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#DED9FA',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: '#000',
  },
  dateTime: {
    fontSize: 16,
    color: '#000',
  },
  icon: {
    fontSize: 26,
    color: '#000',
    marginLeft: -10,
    marginRight: 10,
  },
  body: {
    marginTop: 20,
    flex: 1,
  },
  listItem: {
    flex: 1,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  bodyLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  bodyRight: {
    flex: 20,
    paddingVertical: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tenDichVu: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    marginTop: 10,
    color: '#000',
  },
  chain: {
    borderWidth: 2,
    borderColor: 'blue',
    width: 1,
    height: 10,
    flexGrow: 1,
  },
  chainLeft: {
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 10,
    width: 10,
    height: 10,
  },
  chainRight: {
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 10,
    width: 10,
    height: 10,
  },
  footer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    borderColor: BCarefulTheme.colors.primary,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default DSDVScreen;
