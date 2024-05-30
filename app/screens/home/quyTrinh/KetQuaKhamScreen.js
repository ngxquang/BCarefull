import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../../../../assets/fonts/Fonts';
import {BCarefulTheme} from '../../../component/Theme';
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component';

function KetQuaKhamScreen({navigation, route}) {
  const data = route.params.item;
  const ctdtById = route.params.ctdtById;
  const benhById = route.params.benhById;
  console.log('route.params', route.params);
  console.log('tableData', ctdtById);

  const tableHeadCTDTById = [
    'Tên thuốc',
    'Liều dùng',
    'DVT',
    'SL',
    'Thành tiền',
  ];

  const tableDataCTDTById = ctdtById.map(item => [
    item.TENTHUOC,
    item.GHICHU,
    item.TENDONVI,
    item.SOLUONGTHUOC,
    item.GIABANLUCKE,
  ]);

  const widthArrCTDTById = [100, 140, 60, 60, 100];

  const tableHeadBenhById = ['Mã ICD', 'Tên bệnh'];

  const tableDataBenhById = benhById.map(item => [item.MAICD, item.TENBENH]);

  const widthArrBenhById = [100, 200];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.title}>
          {data?.TENLOAIDV === 'Đơn thuốc' ? (
            <>
              <Text style={styles.content}>Chi tiết đơn thuốc</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[styles.dateTime, {fontFamily: Fonts.bold}]}>
                  Ngày bán:{' '}
                </Text>
                <Text style={styles.dateTime}>{data.NGAYKHAMMIN}</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.content}>Kết quả khám</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[styles.dateTime, {fontFamily: Fonts.bold}]}>
                  Ngày khám:{' '}
                </Text>
                <Text style={styles.dateTime}>{data.NGAYKHAMMIN}</Text>
              </View>
            </>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.dateTime, {fontFamily: Fonts.bold}]}>
              Loại dịch vụ:{' '}
            </Text>
            <Text style={styles.dateTime}>
              {data?.TENLOAIDV || 'Dịch vụ khám'}
            </Text>
          </View>
        </View>
      </View>
      {data.TENLOAIDV === 'Đơn thuốc' ? (
        <>
          <ScrollView style={styles.body}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Thông tin đơn thuốc</Text>
              <View style={styles.itemGroup}>
                <Text style={styles.itemLabelLeft}>Người bán</Text>
                <Text style={styles.itemLabelRight}>{data.NGUOIBAN}</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={styles.itemLabelLeft}>Trạng thái thanh toán</Text>
                <Text style={styles.itemLabelRight}>{data.TTTT}</Text>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Chi tiết đơn thuốc</Text>
              <ScrollView horizontal={true}>
                <Table
                  borderStyle={{
                    borderWidth: 1,
                    borderColor: BCarefulTheme.colors.primary,
                  }}>
                  <Row
                    data={tableHeadCTDTById}
                    style={styles.head}
                    widthArr={widthArrCTDTById}
                    textStyle={styles.headText}
                  />
                  <TableWrapper style={styles.wrapper}>
                    <Rows
                      data={tableDataCTDTById}
                      widthArr={widthArrCTDTById}
                      textStyle={[
                        styles.text,
                        {fontFamily: Fonts.regular, textAlign: 'center'},
                      ]}
                    />
                  </TableWrapper>
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </>
      ) : data.TENLOAIDV === 'Cận lâm sàn' ? (
        <>
          <>
            <ScrollView style={styles.body}>
              <View style={styles.itemContainer}>
                <Text style={[styles.text]}>Thông tin khám</Text>
                <View style={styles.itemGroup}>
                  <Text style={styles.itemLabelLeft}>BSCD</Text>
                  <Text style={styles.itemLabelRight}>{data.INFOBSCD}</Text>
                </View>
                <View style={styles.itemGroup}>
                  <Text style={styles.itemLabelLeft}>BSTH</Text>
                  <Text style={styles.itemLabelRight}>{data.INFOBSTH}</Text>
                </View>
                <View style={styles.itemGroup}>
                  <Text style={styles.itemLabelLeft}>Nội dung khám</Text>
                  <Text style={styles.itemLabelRight}>{data.TENDV}</Text>
                </View>
                <View style={styles.itemGroup}>
                  <Text style={styles.itemLabelLeft}>Trạng thái thực hiện</Text>
                  <Text style={styles.itemLabelRight}>{data.TRANGTHAITH}</Text>
                </View>
                <View style={styles.itemGroup}>
                  <Text style={styles.itemLabelLeft}>
                    Trạng thái thanh toán
                  </Text>
                  <Text style={styles.itemLabelRight}>{data.TTTT}</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.text}>Kết quả khám</Text>
                <View style={styles.itemGroup}>
                  <Text style={styles.itemLabelLeft}>Mô tả</Text>
                  <Text style={styles.itemLabelRight}>
                    {data?.MOTA === null ? 'Chưa có' : data?.MOTA}
                  </Text>
                </View>
                <View style={styles.itemGroup}>
                  <Text style={styles.itemLabelLeft}>Kết luận</Text>
                  <Text style={styles.itemLabelRight}>
                    {data?.KETLUANCLS === null ? 'Chưa có' : data?.KETLUANCLS}
                  </Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.text}>Ảnh</Text>
              </View>
            </ScrollView>
          </>
        </>
      ) : (
        <>
          <ScrollView style={styles.body}>
            <View style={styles.itemContainer}>
              <Text style={[styles.text]}>Thông tin khám</Text>
              <View style={styles.itemGroup}>
                <Text style={styles.itemLabelLeft}>Bác sĩ khám</Text>
                <Text style={styles.itemLabelRight}>{data.INFOBS}</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={styles.itemLabelLeft}>Lý do khám</Text>
                <Text style={styles.itemLabelRight}>{data.LYDOKHAM}</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={styles.itemLabelLeft}>Nội dung khám</Text>
                <Text style={styles.itemLabelRight}>{data.TENDV}</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={styles.itemLabelLeft}>Trạng thái thực hiện</Text>
                <Text style={styles.itemLabelRight}>{data.TRANGTHAITH}</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={styles.itemLabelLeft}>Trạng thái thanh toán</Text>
                <Text style={styles.itemLabelRight}>{data.TTTT}</Text>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Chỉ số sinh tồn</Text>
              <View style={styles.itemGroup}>
                <Text style={styles.itemLabelLeft}>Huyết áp</Text>
                <Text style={styles.itemLabelRight}>{data?.HUYETAP} mmHg</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={styles.itemLabelLeft}>Chiều cao</Text>
                <Text style={styles.itemLabelRight}>{data?.CHIEUCAO} cm</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={styles.itemLabelLeft}>Cân nặng</Text>
                <Text style={styles.itemLabelRight}>{data?.CANNANG} kg</Text>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Kết quả khám</Text>
              <View style={styles.itemGroup}>
                <Text style={styles.itemLabelLeft}>Bệnh sử</Text>
                <Text style={styles.itemLabelRight}>
                  {data?.TRIEUCHUNGBENH}
                </Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={styles.itemLabelLeft}>Khám lâm sàn</Text>
                <Text style={styles.itemLabelRight}>
                  {data?.TINHTRANGCOTHE}
                </Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={styles.itemLabelLeft}>Kết luận</Text>
                <Text style={styles.itemLabelRight}>{data?.KETLUAN}</Text>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Kết luận bệnh</Text>
              <ScrollView>
                <View style={styles.tableContainer}>
                  <Table
                    borderStyle={{
                      borderWidth: 1,
                      borderColor: BCarefulTheme.colors.primary,
                    }}>
                    <Row
                      data={tableHeadBenhById}
                      style={styles.head}
                      widthArr={widthArrBenhById}
                      textStyle={styles.headText}
                    />
                    <TableWrapper style={styles.wrapper}>
                      <Rows
                        data={tableDataBenhById}
                        widthArr={widthArrBenhById}
                        textStyle={[
                          styles.text,
                          {fontFamily: Fonts.regular, textAlign: 'center'},
                        ]}
                      />
                    </TableWrapper>
                  </Table>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </>
      )}

      <View style={styles.footer}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#DED9FA',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
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
    marginLeft: 10,
  },
  body: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 20,
  },
  itemContainer: {
    borderTopWidth: 4,
    borderTopColor: BCarefulTheme.colors.primary,
    marginBottom: 10,
    paddingBottom: 10,
  },
  itemGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemLabelLeft: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: BCarefulTheme.colors.primary,
  },
  itemLabelRight: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: '#000',
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: BCarefulTheme.colors.primary,
  },
  head: {
    backgroundColor: '#f1f8ff',
  },
  headText: {
    margin: 6,
    fontFamily: Fonts.bold,
    color: BCarefulTheme.colors.primary,
  },
  footer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default KetQuaKhamScreen;
