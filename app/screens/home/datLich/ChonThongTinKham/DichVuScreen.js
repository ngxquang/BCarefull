import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { style } from '../../../../component/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const services = [
  { id: '1', name: 'Dịch vụ 1', price: '20000', desc: 'Đây là dịch vụ 1' },
  { id: '2', name: 'Dịch vụ 2', price: '230000', desc: 'Đây là dịch vụ 2' },
  { id: '3', name: 'Dịch vụ 3', price: '120000', desc: 'Đây là dịch vụ 3' },
  { id: '4', name: 'Dịch vụ 4', price: '270000', desc: 'Đây là dịch vụ 4' },
  { id: '5', name: 'Dịch vụ 5', price: '980000', desc: 'Đây là dịch vụ 5' },
  { id: '6', name: 'Dịch vụ 6', price: '520000', desc: 'Đây là dịch vụ 6' },
  { id: '7', name: 'Dịch vụ 7', price: '430000', desc: 'Đây là dịch vụ 7' },
  { id: '8', name: 'Dịch vụ 8', price: '10000', desc: 'Đây là dịch vụ 8' },
];

const DichVuScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { setService } = route.params

  const handleSelectService = (serviceName) => {
    setService(serviceName);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={services}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[style.input, {marginVertical: 12}]}
            onPress={() => handleSelectService(item.name)}>
            <View style={[style.line, style.spacebtw, {alignItems: 'flex-start'}]}>
              <View>
                <Text style={style.h4}>
                  {item.name}
                </Text>
                <Text style={style.t1}>{item.desc}</Text>
              </View>
              <Text style={[style.h3, style.primary]}>
                {item.price} VNĐ
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default DichVuScreen;
