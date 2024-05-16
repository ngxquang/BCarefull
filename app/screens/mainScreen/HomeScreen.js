import React from "react";
import { Button, ThemeProvider } from "@rneui/themed";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BCarefulTheme, BCarefulTheme2 } from "../../component/Theme";
import { ButtonIcon } from "../../component/ListButton";
import { SafeAreaView } from "react-native-safe-area-context";

function HomeScreen({ navigation }) {
    return (
        <ThemeProvider theme={BCarefulTheme2}>
            <SafeAreaView style={styles.container}>
                <Text>HomeScreen</Text>
                <View style={styles.menu}>
                    <View style={[styles.column, {paddingRight: 10}]}>
                        <ButtonIcon title={'Đặt lịch khám'} name={'DatLich'} navigation={navigation} />
                        <ButtonIcon title={'Theo dõi sức khỏe'} name={'TheoDoi'} navigation={navigation} />
                    </View>
                    <View style={[styles.column, {paddingLeft: 10}]}>
                        <ButtonIcon title={'Quy trình khám'} name={'QuyTrinh'} navigation={navigation} />
                        <ButtonIcon title={'Lịch uống thuốc'} name={'LichThuoc'} navigation={navigation} />
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'green' }} navigation={navigation} />
                <View style={{ flex: 1, backgroundColor: 'yellow' }} navigation={navigation} />
            </SafeAreaView>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    test: {
        backgroundColor: 'red'
    },

    container: {
        flex: 1,
        padding: 20,
    },
    column: {
        flex: 1,
    },
    menu: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'space-between'
    }
});

export default HomeScreen;
