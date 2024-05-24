import { Button, Input } from "@rneui/themed";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { BCarefulTheme } from "../../../component/Theme";
import { useEffect, useState } from "react";
import { DatLichHeader } from "../../../component/Header";
import Progress from "../../../component/datLich/Progress";
import { SafeAreaView } from "react-native-safe-area-context";
import Fonts from "../../../../assets/fonts/Fonts";

function DatLichScreen() {
    const [values, setValues] = useState(0);

    useEffect(() => { }, [values]);

    return (
        <View style={{ flex: 1 }}>
            <DatLichHeader title={'Chọn thông tin khám'} values={values} />
            {/* <Button title={'Press'} onPress={() => setValues(values + 0.5)} /> */}
            {console.log(values)}
            <SafeAreaView style={styles.container}>
                {values == 0 &&
                    <View style={styles.innerContainer}>
                        <View style={styles.line}>
                            <Text style={styles.label}>Dịch vụ</Text>
                            <TextInput
                                placeholder='Chọn dịch vụ' style={styles.itemTextInput}
                            />
                        </View>

                        <View style={styles.line}>
                            <Text style={styles.label}>Ngày khám</Text>
                            <TextInput
                                placeholder='Chọn ngày' style={styles.itemTextInput}
                            />
                        </View>

                        <View style={styles.line}>
                            <Text style={styles.label}>Bác sĩ</Text>
                            <TextInput
                                placeholder='Chọn bác sĩ' style={styles.itemTextInput}
                            />
                        </View>
                    </View>
                }
            </SafeAreaView>
        </View>
    );
}

export default DatLichScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    line: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        gap: 12,
    },
    label: {
        flexShrink: 0,
        fontFamily: Fonts.regular,
    },
    itemTextInput: {
        flex: 1,
        fontSize: 16,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: BCarefulTheme.colors.primary,
        backgroundColor: '#E8D5FF',
        fontFamily: Fonts.regular,
        padding: 8,
    },
});
