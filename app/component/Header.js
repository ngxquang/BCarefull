import * as React from "react";
import { Header, Icon } from "@rneui/base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BCarefulTheme } from "./Theme";
import { StyleSheet } from "react-native";
import Fonts from "../../assets/fonts/Fonts";
import { BackToHomeBtn } from "./ButtonHome";

export default function DatLichHeader({ title }) {
    return (
        <Header
            backgroundColor="white"
            backgroundImageStyle={{}}
            barStyle="default"
            centerComponent={{
                text: title,
                style: styles.header
            }}
            centerContainerStyle={{alignContent: 'flex-start'}}
            leftComponent={BackToHomeBtn}
            leftContainerStyle={{ top: -5}}
            linearGradientProps={{}}
            placement="center"
            statusBarProps={{}}
        />
    );
}

const styles = StyleSheet.create({
    header: {
        color: 'black',
        fontFamily: Fonts.bold,
        fontSize: 20,
        
    }
})