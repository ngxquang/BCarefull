import { Button } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";
import { LinearProgress } from "@rneui/themed";
import { BCarefulTheme } from "../../../component/Theme";
import { useEffect, useState } from "react";
import Header from "../../../component/Header";


function DatLichScreen() {
    const [values, setValues] = useState(0.5);

    useEffect(() => {

    }, [values]);

    return (
        <View>
            <Header title={'Chọn thông tin khám'} />
            <Button title={'Press'} onPress={() => setValues(values + 0.1)} />
            <LinearProgress style={styles.progress} color={BCarefulTheme.colors.secondary} value={values} />
        </View>
    );
}

export default DatLichScreen;

const styles = StyleSheet.create({
    progress: {
        height: 10,
    }
})
