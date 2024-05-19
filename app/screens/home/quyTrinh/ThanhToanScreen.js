import {Button} from '@rneui/themed';
import {Text, View} from 'react-native';
import axios from '../../../setup/axios';
import {Linking} from 'react-native';

function ThanhToanScreen() {
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
    console.log("DEEPLINK>>>>>", response.data.data.deeplink);
    openDeepLink(response.data.data.deeplink);
  };
  return (
    <View>
      <Text>ThanhToanScreen</Text>
      <Button onPress={handleThanhToan}>Thanh Toán bằng MOMO</Button>
    </View>
  );
}

export default ThanhToanScreen;
