import { Button } from "@rneui/themed";
import { Text, View } from "react-native";
import { ButtonQuyTrinh } from "../../../component/ButtonQuyTrinh";


function QuyTrinhScreen() {
    return (
        <View style={{flex: 1}}>
            <Text>QuyTrinhScreen</Text>
            <ButtonQuyTrinh title={"LichSuKham"} name={"LichSuKham"} />
            <ButtonQuyTrinh title={"ChiDuong"} name={"ChiDuong"} />
            <ButtonQuyTrinh title={"DonThuoc"} name={"DonThuoc"} />
            <ButtonQuyTrinh title={"DSDV"} name={"DSDV"} />
            <ButtonQuyTrinh title={"KetQuaKham"} name={"KetQuaKham"} />
            <ButtonQuyTrinh title={"ThanhToan"} name={"ThanhToan"} />
        </View>
    );
}

export default QuyTrinhScreen;