import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BCarefulTheme, style } from "../../../component/Theme";
import { useEffect, useState } from "react";
import { DatLichHeader } from "../../../component/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import ChonThongTinKham from "./ChonThongTinKham/ChonThongTinKham";

function DatLichScreen() {
    const [values, setValues] = useState(0);

    useEffect(() => { }, [values]);

    return (
        <View style={{ flex: 1 }}>
            <DatLichHeader title={'Chọn thông tin khám'} values={values} />
            {/* <Button title={'Press'} onPress={() => setValues(values + 0.5)} /> */}
            {console.log(values)}
            <SafeAreaView style={style.container}>
                {values == 0 &&
                    <ChonThongTinKham />
                }
            </SafeAreaView>
        </View>
    );
}

export default DatLichScreen;

const styles = StyleSheet.create({
    seperateHorizontal: {
        justifyContent: 'center',
        borderTopWidth: 2,
        borderTopColor: BCarefulTheme.colors.primary,
        alignItems: 'center',
        margin: 12,
        marginHorizontal: 8,
    },
});
