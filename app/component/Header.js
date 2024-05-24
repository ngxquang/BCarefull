import * as React from "react";
import { Header, Icon } from "@rneui/base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BCarefulTheme } from "./Theme";
import { StyleSheet, View } from "react-native";
import Fonts from "../../assets/fonts/Fonts";
import { BackToHomeBtn } from "./ButtonHome";
import Progress from "./datLich/Progress";

export function DatLich({ title }) {
    return (
        <View>
            <Header
                backgroundColor="white"
                backgroundImageStyle={{}}
                barStyle="default"
                centerComponent={{
                    text: title,
                    style: styles.header
                }}
                centerContainerStyle={{ alignContent: 'flex-start' }}
                leftComponent={BackToHomeBtn}
                leftContainerStyle={{ top: -5 }}
                linearGradientProps={{}}
                placement="center"
                statusBarProps={{}}
            />
        </View>
    );
}

export function DatLichHeader({ title, values }) {
    return (
        <>
            <DatLich title={title} />
            <View style={{padding: 30, paddingBottom: 0}}>
                <Progress values={values ? values : 0} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        color: 'black',
        fontFamily: Fonts.bold,
        fontSize: 20,
    }
})