import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomHeader } from "../../../component/Header";
import { style } from "../../../component/Theme";
import { useNavigation } from "@react-navigation/native";

function QuanLyThuocScreen() {
    const navigation = useNavigation();

    return (
        <View style={{flex: 1}}>
            <CustomHeader title={'Quản lý toa thuốc'} />
            <SafeAreaView>
                <TouchableOpacity 
                style={style.btn}
                onPress={() => {navigation.navigate('ThemThuoc')}}
                >
                    <Text>Thêm thuốc</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

export default QuanLyThuocScreen;