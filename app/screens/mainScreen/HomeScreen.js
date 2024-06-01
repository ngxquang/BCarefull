import React from 'react';
import {Button, ThemeProvider} from '@rneui/themed';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {BCarefulTheme, BCarefulTheme2, style} from '../../component/Theme';
import {ButtonHome} from '../../component/ButtonHome';
import {SafeAreaView} from 'react-native-safe-area-context';
import Fonts from '../../../assets/fonts/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import socket from '../../setup/socket';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {selectAction} from '../../util/selectAction';
import {onDisplayNotification} from '../../util/appUtil';
import Carousel from '../../component/Carousel';
import {patchWebProps} from '@rneui/base';
import {fetchCTPKFutureByIdAction} from '../../redux/action/fetchCTPKFutureByIdAction';
import Icon from 'react-native-vector-icons/Octicons';

const {width: screenWidth} = Dimensions.get('window');

const data = [
  {
    title: 'WHO cảnh báo gánh nặng viêm gan siêu vi toàn cầu',
    img: 'https://i1-suckhoe.vnecdn.net/2024/05/17/hepatitisb-share-jpeg-17159116-6627-3432-1715911762.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=NBTMn3vPpr46JuzMAvj4mQ',
    path: 'https://vnexpress.net/who-canh-bao-ganh-nang-viem-gan-sieu-vi-toan-cau-4747161.html',
  },
  {
    title: 'Mỹ phê duyệt thuốc ung thư phổi giá 780.000 USD',
    img: 'https://i1-suckhoe.vnecdn.net/2024/05/17/20190428-074106-675940-cancer-8919-9826-1715931515.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=YMDaroHilya8YGScL2GsZw',
    path: 'https://vnexpress.net/my-phe-duyet-thuoc-ung-thu-phoi-gia-780-000-usd-4747359.html',
  },
  {
    title: 'Lợi ích của nước ion kiềm hydrogen với sức khỏe',
    img: 'https://i1-suckhoe.vnecdn.net/2024/05/16/1-8376-1715827420.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=fh2hOqMWHWquOCOd_PpHag',
    path: 'https://vnexpress.net/loi-ich-cua-nuoc-ion-kiem-hydrogen-voi-suc-khoe-4746383.html',
  },
];

function HomeScreen({navigation}) {
  const user = useSelector(state => state.auth?.user?.account?.userInfo[0]);
  const ctpkFutureById = useSelector(state => state.ctpkFutureById.data);
  console.log('ctpkFutureById', ctpkFutureById);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('USER >>>>>>>>>>>>>> ', user);
    socket.emit('send-message', {message: 'HELLO FROM MOBILE'});
    socket.on('receive-message', data => {
      // Alert.alert('Co nguoi khac dang nhap');
      const fetchAction = selectAction(data?.actionName);
      if (fetchAction !== null) {
        data?.maID ? dispatch(fetchAction(data.maID)) : dispatch(fetchAction());
        console.log('MESSAGE FROM SERVER >>>>>>>>>> ', data);
        if (data.maBN && data.maBN === user.MABN) {
          onDisplayNotification(data.title, data.message);
        }
        // toast(`Người dùng ${data.id} vừa thực hiện thay đổi`)
      }
    });
  }, []);

  useEffect(() => {
    dispatch(fetchCTPKFutureByIdAction(user.MABN));
  }, []);

  const renderItem = ({item}) => (
    <View style={[styles.listItemContainer, {width: screenWidth - 46}]}>
      <View style={styles.itemGroup}>
        <Icon name={'clock'} style={styles.icon} />
        <Text style={[style.t1, {marginRight: 10}]}>
          {item?.GIODATLICH || '11:11'}
        </Text>
        <Text style={[style.t1]}>{item.NGAYKHAMMIN.split(' - ')[0]}</Text>
      </View>
      <View style={styles.itemGroup}>
        <Text style={[style.t1, {marginRight: 10}]}>Nội dung:</Text>
        <Text style={[style.t1, {fontFamily: Fonts.semiBold}]}>
          {item.TENDV}
        </Text>
      </View>
    </View>
  );

  return (
    <ThemeProvider theme={BCarefulTheme2}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Bcareful
          <Text style={{fontFamily: Fonts.medium, fontSize: 24}}>
            {' '}
            Xin chào,
          </Text>
        </Text>

        <View style={styles.menu}>
          <View style={[styles.column, {paddingRight: 10}]}>
            <ButtonHome
              title={'Đặt lịch khám'}
              name={'DatLich'}
              navigation={navigation}
            />
            <ButtonHome
              title={'Theo dõi sức khỏe'}
              name={'TheoDoi'}
              navigation={navigation}
            />
          </View>
          <View style={[styles.column, {paddingLeft: 10}]}>
            <ButtonHome
              title={'Quy trình khám'}
              name={'QuyTrinh'}
              navigation={navigation}
            />
            <ButtonHome
              title={'Lịch uống thuốc'}
              name={'LichThuoc'}
              navigation={navigation}
            />
          </View>
        </View>

        <View style={{flex: 1, marginTop: -20, marginBottom: 10}}>
          <Text style={[style.h3, {marginVertical: 2, marginLeft: 6}]}>
            Nhắc nhở
          </Text>
          <View style={styles.remindContainer}>
            <View>
              <Text style={[style.h4, {marginTop: 2, marginLeft: 20}]}>
                Lịch khám
              </Text>
              <FlatList
                data={ctpkFutureById}
                renderItem={renderItem}
                horizontal={true}
                snapToAlignment={'center'}
                snapToInterval={screenWidth - 46}
                decelerationRate={'fast'}
              />
            </View>
            <View style={styles.breakline}></View>
            <View>
              <Text style={[style.h4, {marginTop: 2, marginLeft: 20}]}>
                Thuốc
              </Text>
              <FlatList
                data={ctpkFutureById}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToAlignment={'center'}
                snapToInterval={screenWidth - 46}
                decelerationRate={'fast'}
              />
            </View>
          </View>
        </View>

        <View style={styles.carousel}>
          <Text style={style.h3}>Tin nổi bật</Text>
          <Carousel data={data} />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    paddingTop: 10,
  },
  title: {
    fontFamily: Fonts.bold,
    color: 'black',
    fontSize: 28,
  },
  remindContainer: {
    flex: 1,
    borderColor: BCarefulTheme.colors.primary,
    borderWidth: 3,
    borderRadius: 10,
  },
  carousel: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gainsboro',
    borderRadius: 10,
    padding: 12,
    paddingTop: 4,
    elevation: 2,
  },
  listItemContainer: {
    paddingHorizontal: 20,
  },
  itemGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    borderRadius: 10,
    fontFamily: Fonts.regular,
    paddingHorizontal: 12,
    flexGrow: 1,
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconContainer: {
    color: BCarefulTheme.colors.primary,
    fontSize: 16,
    alignSelf: 'flex-end',
    padding: 4,
    borderWidth: 1,
    borderColor: BCarefulTheme.colors.border,
    borderRadius: 4,
  },
  icon: {
    color: BCarefulTheme.colors.primary,
    fontSize: 18,
    marginRight: 4,
  },
  body: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: '#000',
  },
  breakline: {
    borderTopWidth: 2,
    borderColor: BCarefulTheme.colors.primary,
    borderStyle: 'dashed',
    marginHorizontal: 20,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
    minWidth: '40%',
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
});

export default HomeScreen;
