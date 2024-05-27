import {Button} from '@rneui/themed';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from '../../../setup/axios';
import {Linking} from 'react-native';
import {BCarefulTheme} from '../../../component/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import Fonts from '../../../../assets/fonts/Fonts';
import {useDispatch, useSelector} from 'react-redux';

function ThanhToanScreen({navigation, route}) {
  const item = route.params.item;
  console.log('ITEM THANH TOAN>>>>>>>>>', item);
  const user = useSelector(state => state.auth?.user?.account?.userInfo[0]);

  const openDeepLink = url => {
    Linking.openURL(url)
      .then(supported => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const handleThanhToan = async () => {
    const response = await axios.post('hoadon/test-momo');
    // const jsonRes = JSON.parse(response.data);
    console.log('DEEPLINK>>>>>', response.data.data.deeplink);
    openDeepLink(response.data.data.deeplink);
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hóa Đơn</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Thời gian</Text>
          <Text style={styles.value}>{item.NGAYKHAMMIN}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Khách hàng</Text>
          <Text style={styles.value}>
            {user.HOTEN}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Mã hồ sơ</Text>
          <Text style={styles.value}>
            BN - {user.MABN}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Nội dung</Text>
          <Text style={styles.value}>{item.TENDV}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Người lập hóa đơn</Text>
          <Text style={styles.value}>Bưởi Company</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Loại hóa đơn</Text>
          <Text style={styles.value}>Hóa Đơn Khám</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.labelBold}>Tổng hóa đơn</Text>
          <Text style={styles.valueBold}>200.000 VNĐ</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Phương thức thanh toán</Text>
          <Text style={styles.value}>Momo</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleThanhToan}>
            <Text style={styles.buttonText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    backgroundColor: '#7864EA',
    width: 361,
    height: 111,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 36,
  },
  separator: {
    height: 3,
    backgroundColor: '#7864EA',
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 2,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: '#6A0DAD',
    flex: 1,
    textAlign: 'left',
  },
  value: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: '#000000',
    flex: 2,
    textAlign: 'right',
  },
  labelBold: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#6A0DAD',
  },
  valueBold: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#000000',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#EA793A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: 180,
  },
  buttonText: {
    fontFamily: Fonts.bold,
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default ThanhToanScreen;
