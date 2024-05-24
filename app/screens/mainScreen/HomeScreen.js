import React from "react";
import { Button, ThemeProvider, } from "@rneui/themed";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { BCarefulTheme2 } from "../../component/Theme";
import { ButtonHome } from "../../component/ButtonHome";
import { SafeAreaView } from "react-native-safe-area-context";
import Fonts from "../../../assets/fonts/Fonts";
import LinearGradient from "react-native-linear-gradient";

import BackgroundImage1 from "../../../assets/images/Vector01.png";
import BackgroundImage2 from "../../../assets/images/Vector02.png";
import BackgroundImage3 from "../../../assets/images/Vector03.png";


function HomeScreen({ navigation }) {
    return (
        <ThemeProvider theme={BCarefulTheme2}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Bcareful
                    <Text style={{ fontFamily: Fonts.medium, fontSize: 24, }}> Xin chào,</Text>
                </Text>
                <View style={styles.menu}>
                    <View style={[styles.column, { paddingRight: 10 }]}>
                        <ButtonHome title={'Đặt lịch khám'} name={'DatLich'} navigation={navigation} />
                        <ButtonHome title={'Theo dõi sức khỏe'} name={'TheoDoi'} navigation={navigation} />
                    </View>
                    <View style={[styles.column, { paddingLeft: 10 }]}>
                        <ButtonHome title={'Quy trình khám'} name={'QuyTrinh'} navigation={navigation} />
                        <ButtonHome title={'Lịch uống thuốc'} name={'LichThuoc'} navigation={navigation} />
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'green' }} navigation={navigation} />
                <View style={{ flex: 1, backgroundColor: 'yellow' }} navigation={navigation}>
                </View>
            </SafeAreaView >
        </ThemeProvider >
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
});

export default HomeScreen;
