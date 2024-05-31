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
import Carousel from "../../component/Carousel";
import { patchWebProps } from "@rneui/base";

const data = [
    {
        title: 'WHO cảnh báo gánh nặng viêm gan siêu vi toàn cầu',
        img: 'https://i1-suckhoe.vnecdn.net/2024/05/17/hepatitisb-share-jpeg-17159116-6627-3432-1715911762.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=NBTMn3vPpr46JuzMAvj4mQ',
        path: 'https://vnexpress.net/who-canh-bao-ganh-nang-viem-gan-sieu-vi-toan-cau-4747161.html'
    },
    {
        title: 'Mỹ phê duyệt thuốc ung thư phổi giá 780.000 USD',
        img: 'https://i1-suckhoe.vnecdn.net/2024/05/17/20190428-074106-675940-cancer-8919-9826-1715931515.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=YMDaroHilya8YGScL2GsZw',
        path: 'https://vnexpress.net/my-phe-duyet-thuoc-ung-thu-phoi-gia-780-000-usd-4747359.html'
    },
    {
        title: 'Lợi ích của nước ion kiềm hydrogen với sức khỏe',
        img: 'https://i1-suckhoe.vnecdn.net/2024/05/16/1-8376-1715827420.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=fh2hOqMWHWquOCOd_PpHag',
        path: 'https://vnexpress.net/loi-ich-cua-nuoc-ion-kiem-hydrogen-voi-suc-khoe-4746383.html'
    },
  ];  

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
                <View style={{ flex: 1, backgroundColor: 'green' }} />
                <View style={styles.carousel}>
                <Carousel data={data} />
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
    carousel: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gainsboro',
        borderRadius: 5,
        padding: 12,

    }
});

export default HomeScreen;
