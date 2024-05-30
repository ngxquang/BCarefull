import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ListItem, Icon } from "@rneui/themed";
import { BCarefulTheme, style } from "../../../../component/Theme";

function ChonThongTinKham() {
    const navigation = useNavigation();
    const [selectedDV, setSelectedDV] = useState(1);
    const [step, setStep] = useState(2);
    const [service, setService] = useState('Chọn dịch vụ');
    const [date, setDate] = useState('Chọn ngày khám');
    const [doctor, setDoctor] = useState('Chọn bác sĩ');
    const [schedule, setSchedule] = useState('Chọn giờ khám');

    const steps = ['ChonDichVu', 'NgayKham', 'ChonBacSi', 'GioKham'];

    return (
        <View style={style.container}>
            <View>
                <View style={{ gap: 12, marginTop: 20 }}>
                    <ListItem
                        Component={TouchableOpacity}
                        containerStyle={style.input}
                        onPress={() => navigation.navigate(steps[step], { setService })}
                        disabledStyle={{ opacity: 0.5 }}
                    >
                        <Icon name="medical-services" type="material" color={BCarefulTheme.colors.primary} />
                        <ListItem.Content>
                            <ListItem.Title><Text style={style.t2}>{service}</Text></ListItem.Title>
                        </ListItem.Content>
                        {step === 0 && <ListItem.Chevron color={BCarefulTheme.colors.primary} />}
                    </ListItem>
                    <ListItem containerStyle={style.input}>
                        <Icon name="calendar-month" type="material" color={BCarefulTheme.colors.primary} />
                        <ListItem.Content>
                            <ListItem.Title><Text style={style.t2}>{date}</Text></ListItem.Title>
                        </ListItem.Content>
                        {step === 1 && <ListItem.Chevron color={BCarefulTheme.colors.primary} />}
                    </ListItem>
                    <ListItem
                        Component={TouchableOpacity}
                        containerStyle={style.input}
                        onPress={() => navigation.navigate(steps[step], { setDoctor, setSchedule })}
                        disabledStyle={{ opacity: 0.5 }}
                    >
                        <Icon name="doctor" type="material-community" color={BCarefulTheme.colors.primary} />
                        <ListItem.Content>
                            <ListItem.Title><Text style={style.t2}>{doctor}</Text></ListItem.Title>
                        </ListItem.Content>
                        {step === 2 && <ListItem.Chevron color={BCarefulTheme.colors.primary} />}
                    </ListItem>
                    <ListItem containerStyle={style.input}>
                        <Icon name="hourglass-half" type="font-awesome-5" color={BCarefulTheme.colors.primary} />
                        <ListItem.Content>
                            <ListItem.Title><Text style={style.t2}>{schedule}</Text></ListItem.Title>
                        </ListItem.Content>
                        {step === 3 && <ListItem.Chevron color={BCarefulTheme.colors.primary} />}
                    </ListItem>
                </View>
                <TouchableOpacity style={style.seperateHorizontal}></TouchableOpacity>
            </View>
            <View style={style.center}>
                <TouchableOpacity style={style.btnSub}>
                    <Text style={[style.h4, style.white]}>Thêm dịch vụ</Text>
                </TouchableOpacity>
            </View>

            {selectedDV === 0 && (
                <View style={{ flex: 1, marginTop: 20 }}>
                    <Text style={[style.h4, style.italic]}>Vui lòng chọn dịch vụ ở phía trên</Text>
                </View>
            )}

            {selectedDV > 0 && (
                <View style={{ flex: 1, marginTop: 20 }}>
                    <Text style={style.h4}>Danh sách các dịch vụ đã chọn</Text>
                </View>
            )}
        </View>
    );
}

export default ChonThongTinKham;
