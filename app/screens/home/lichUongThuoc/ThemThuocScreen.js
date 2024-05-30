import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomHeader } from "../../../component/Header";
import { style } from "../../../component/Theme";
import { useNavigation } from "@react-navigation/native";

function ThemThuocScreen() {
    const navigation = useNavigation();

    return (
        <View style={{flex: 1}}>
            <CustomHeader title={'Thêm thuốc'} />
            <SafeAreaView>

            </SafeAreaView>
        </View>
    );
}

export default ThemThuocScreen;