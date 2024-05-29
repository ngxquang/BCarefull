import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCTDTByIdAction} from '../../../redux/action/fetchCTDTById';
import {fetchBenhNhanByIdAction} from '../../../redux/action/fetchAllBenhNhanAction';
import {fetchDSHDByIdAction} from '../../../redux/action/fetchHoaDonAction';
import {fetchDsClsByIdAction} from '../../../redux/action/fetchCLSAction';
import {fetchTTKAction} from '../../../redux/action/fetchTTKAction';
import {fetchBenhByIdAction} from '../../../redux/action/fetchBenhByIdAction';
import {fetchLSKByIdBnAction, fetchPkByIdHdAction} from '../../../redux/action/fetchPhieuKhamAction';
import {BCarefulTheme} from '../../../component/Theme';
import {fetchPhieuKhamByIdAction} from '../../../redux/action/fetchPhieuKhamByIdAction';
import {TTKICon, TTTTIcon} from '../../../component/StatusIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../../../../assets/fonts/Fonts';
import {selectItemThanhToan} from '../../../redux/slice/selectedItemSlice';
import axios from '../../../setup/axios';
import socket from '../../../setup/socket';

function DSDVScreen({navigation, route}) {
  console.log('ROUTE >>>>>>>>>>>>>>>> ', route);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth?.user?.account?.userInfo[0]);
  const selectedItemThanhToan = useSelector(
    state => state.selectedItem?.selectedItemThanhToan,
  );
  const selectedItem = useSelector(state => state.selectedItem?.selectedItem);
  const maPK = route.params.item ? route.params?.item.MAPK : selectedItem.MAPK;
  const maHDofPK = route.params.item
    ? route.params?.item.MAHD
    : selectedItem.MAHD;
  const NGAYKHAMMIN = route.params.item
    ? route.params?.item.NGAYKHAMMIN
    : selectedItem.NGAYKHAMMIN;

  // useEffect(async () => {
  //
  // }, []);

  useEffect(() => {
    console.log('ROUTE IN USEEFFECT >>>>>>>>>>>>>>>> ', route);

    const updateHoaDon = async (selectedItemThanhToan) => {
      const response = await axios.post('/hoadon/thanhtoan', {
        MAHD: selectedItemThanhToan.MAHD,
        THANHTIEN: selectedItemThanhToan.THANHTIEN,
        maLT: 102,
        tttt: 'Đã thanh toán',
        tdtt: new Date(),
        pttt: 'Chuyển khoản',
      });
      if (response.status === 200) {
        dispatch(fetchCTDTByIdAction(maPK));
        dispatch(fetchPhieuKhamByIdAction(maPK));
        dispatch(fetchDsClsByIdAction(maPK));
        dispatch(fetchLSKByIdBnAction(user.MABN));
        socket.emit('send-message', {actionName: 'DSHD', maID: maPK});
        socket.emit('send-message', {actionName: 'DSDK'});
        // socket.emit('send-message', {actionName: 'LSKBYIDBN', maID: user.MABN});
      }
    };

    if (route && route.params.resultCode === "0") {
      updateHoaDon(selectedItemThanhToan);
    }

    dispatch(fetchCTDTByIdAction(maPK));
    dispatch(fetchBenhNhanByIdAction(maPK));
    dispatch(fetchDSHDByIdAction(maPK));
    dispatch(fetchDsClsByIdAction(maPK));
    dispatch(fetchPkByIdHdAction(maHDofPK));
    dispatch(fetchTTKAction(maPK));
    dispatch(fetchBenhByIdAction(maPK));
    dispatch(fetchPhieuKhamByIdAction(maPK));
  }, [route]);

  const ctdtById = useSelector(state => state.ctdtById.data) || [];
  console.log('ctdtById', ctdtById);
  const hoaDon = useSelector(state => state.hoaDon.dshd) || [];
  const pkByIdHd = useSelector(state => state.dsdk.pkByIdHd) || [];
  const ttk = useSelector(state => state.ttk.data) || [];
  const benhById = useSelector(state => state.benhById.data) || [];
  const clsById = useSelector(state => state.clsById.dsClsById) || [];
  const isLoadingCLS = useSelector(state => state.clsById.isLoading);
  const phieuKhamById = useSelector(state => state.phieuKhamById?.data) || [];
  const isLoadingPK = useSelector(state => state.isLoading?.data);
  const isLoading = isLoadingCLS && isLoadingPK;

  const phieuKhamArray = Array.isArray(phieuKhamById)
    ? phieuKhamById
    : [phieuKhamById];
  const clsByIdArray = Array.isArray(clsById) ? clsById : [clsById];

  const donThuoc = {
    TENDV: 'Đơn thuốc',
    NGAYKHAMMIN: ctdtById[0]?.TDTTMIN,
    TDTTMIN: ctdtById[0]?.TDTTMIN,
    TTTT: ctdtById[0]?.TTTT,
    NGUOIBAN: ctdtById[0]?.HOTEN,
    TENLOAIDV: 'Hóa đơn thuốc',
    MAHD: ctdtById[0]?.MAHD,
    THANHTIEN: ctdtById[0]?.THANHTIEN,
  };

  const data = [...phieuKhamArray, ...clsByIdArray, donThuoc];

  const handleThanhToan = item => {
    dispatch(selectItemThanhToan(item));
    navigation.navigate('ThanhToan', {item, ctdtById, clsByIdArray, pkByIdHd});
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
          {item.TRANGTHAITH && (
            <View style={styles.statusContainer}>
              <TTKICon
                style={styles.trangThaiThucHien}
                value={item.TRANGTHAITH}
              />
            </View>
          )}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('KetQuaKham', {item, ctdtById, benhById})
            }>
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
              ) : item.INFOBS ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={[styles.doctor, {fontFamily: Fonts.bold}]}>
                    Bác sĩ:{' '}
                  </Text>
                  <Text style={styles.doctor}>{item.INFOBS}</Text>
                </View>
              ) : item.NGUOIBAN ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={[styles.doctor, {fontFamily: Fonts.bold}]}>
                    Người bán:{' '}
                  </Text>
                  <Text style={styles.doctor}>{item.NGUOIBAN}</Text>
                </View>
              ) : null}
              {/* <Text style={styles.stt}>STT: 07</Text> */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.paidButton}
                  onPress={() => handleThanhToan(item)}>
                  <TTTTIcon value={item.TTTT} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.routeButton}>
                  <Text style={styles.routeText}>Chỉ đường</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.content}>Chi tiết phiếu khám MAPK - {maPK}</Text>
          <Text style={styles.dateTime}>{NGAYKHAMMIN}</Text>
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.body}>
          <FlatList data={data} renderItem={phieuKhamRenderItem} />
        </View>
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
