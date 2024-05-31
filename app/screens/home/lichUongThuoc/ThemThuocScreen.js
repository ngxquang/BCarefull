import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomHeader } from "../../../component/Header";
import { BCarefulTheme, style } from "../../../component/Theme";
import { useNavigation } from "@react-navigation/native";
import CustomSwitch from "../../../component/CustomSwitch";
import { useState } from "react";
import { Icon } from "@rneui/themed";
import InputSpinner from "react-native-input-spinner";
import Fonts from "../../../../assets/fonts/Fonts";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, fonts } from "@rneui/base";
//import DateTimePicker from "react-native-modal-datetime-picker";

function ThemThuocScreen() {
    const navigation = useNavigation();
    const [mode, setMode] = useState(1);
    const [cards, setCards] = useState([
        { time: '08:00', dosage: 1, unit: 'viên', note: 'trước ăn' },
        { time: '12:00', dosage: 1, unit: 'viên', note: '' },
        { time: '18:00', dosage: 1, unit: 'viên', note: '' },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const onSelectSwitch = (index) => {
        setMode(index);
    };

    const handleDeleteDosageCard = (index) => {
        setCards(cards.filter((_, i) => i !== index));
        setModalVisible(false); // close modal after deletion
    };

    const handleSelectCard = (index) => {
        setSelectedCard(index !== null ? { ...cards[index], index } : { time: '', dosage: 1, unit: 'viên', note: '' });
        setModalVisible(true);
    };

    const renderDosageCard = (time, dosage, unit, note, index) => {
        return (
            <View key={index} style={style.row}>
                <TouchableOpacity
                    style={{ backgroundColor: '#f7d0cd', padding: 4, borderRadius: 120 }}
                    onPress={() => handleDeleteDosageCard(index)}
                >
                    <Icon name="trash-outline" type="ionicon" color={BCarefulTheme.colors.red} size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[style.card, style.spacebtw, style.row]}
                    onPress={() => handleSelectCard(index)}
                >
                    <Text style={[style.h1, style.sub, { width: '30%' }]}>{time}</Text>
                    <Text style={[style.t6, styles.seperate, { width: '55%' }]}>Dùng {dosage} {unit} {note}</Text>
                    <Icon name="options-outline" type="ionicon" color={BCarefulTheme.colors.primary} size={24} />
                </TouchableOpacity>
            </View>
        );
    };

    const sortCards = (cards) => {
        return cards.sort((a, b) => {
            const timeA = a.time.split(':').map(Number);
            const timeB = b.time.split(':').map(Number);
            return timeA[0] - timeB[0] || timeA[1] - timeB[1];
        });
    };

    const generateCards = () => {
        return sortCards(cards).map((card, index) => renderDosageCard(card.time, card.dosage, card.unit, card.note, index));
    };

    const handleAddCard = () => {
        handleSelectCard(null);
    };

    const handleSaveCard = () => {
        const updatedCards = [...cards];
        if (selectedCard.index !== undefined) {
            updatedCards[selectedCard.index] = { time: selectedCard.time, dosage: selectedCard.dosage, unit: selectedCard.unit, note: selectedCard.note };
        } else {
            updatedCards.push({ time: selectedCard.time, dosage: selectedCard.dosage, unit: selectedCard.unit, note: selectedCard.note });
        }
        setCards(sortCards(updatedCards));
        setModalVisible(false);
        setSelectedCard(null);
    };

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showTimepicker = () => {
        setShow(true);
    };


    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title={'Thêm thuốc'} />
            <SafeAreaView style={style.container}>
                <Text style={style.h5}>Chọn thuốc</Text>
                <CustomSwitch
                    selectionMode={1}
                    option1={'Hàng ngày'}
                    option2={'Tùy chỉnh'}
                    onSelectSwitch={onSelectSwitch}
                    selectionColor={BCarefulTheme.colors.primary}
                />

                {/* Hàng ngày */}
                {mode === 1 && (
                    <View style={style.mt4}>
                        <Text style={style.h6}>Cài đặt lịch sử dụng</Text>

                        {generateCards()}

                        <TouchableOpacity
                            style={[style.center]}
                            onPress={handleAddCard}
                        >
                            <Text style={[style.h4, style.primary]}>+ thêm thuốc</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Tùy chỉnh */}
                {mode === 2 && (
                    <Text>def</Text>
                )}

                {modalVisible && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <Text style={style.h2}>Đặt liều thuốc</Text>

                                {/* Phần chỉnh giờ */}
                                <TouchableOpacity onPress={showTimepicker}>
                                    <Text style={styles.timeText}>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                </TouchableOpacity>
                                {show && (
                                    <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                    />
                                )}

                                {/* Phần chỉnh số lượng */}
                                <InputSpinner
                                    max={20}
                                    min={1}
                                    step={1}
                                    color={BCarefulTheme.colors.primary}
                                    colorMax={BCarefulTheme.colors.border}
                                    fontFamily={Fonts.bold}
                                    fontSize={32}
                                    style={[style.p4, {
                                        height: 60,
                                    }]}
                                    inputStyle={{ height: 80 }}
                                    value={selectedCard.dosage}
                                    onChange={(num) => setSelectedCard({ ...selectedCard, dosage: num })}
                                />

                                {/* Phần chỉnh đơn vị */}
                                <TextInput
                                    style={[styles.input, style.t1]}
                                    placeholder="Đơn vị"
                                    value={selectedCard.unit}
                                    onChangeText={(text) => setSelectedCard({ ...selectedCard, unit: text })}
                                />

                                {/* Phần note */}
                                <TextInput
                                    style={[styles.input, style.t1]}
                                    placeholder="Ghi chú"
                                    value={selectedCard.note}
                                    onChangeText={(text) => setSelectedCard({ ...selectedCard, note: text })}
                                />

                                <View style={style.spacebtw}>
                                    <TouchableOpacity
                                        style={style.btn}
                                        onPress={handleSaveCard}
                                    >
                                        <Text style={[style.h8, style.white]}>Lưu</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Icon name="close" type="ionicon" color={BCarefulTheme.colors.red} size={30} />
                                </TouchableOpacity>

                                {selectedCard.index !== undefined && (
                                    <TouchableOpacity
                                        style={[styles.trash, {
                                            position: 'absolute',
                                            top: 10,
                                            left: 20,
                                        }]}
                                        onPress={() => handleDeleteDosageCard(selectedCard.index)}
                                    >
                                        <Icon name="trash-outline" type="ionicon" color={BCarefulTheme.colors.red} size={24} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </Modal>
                )}
            </SafeAreaView>
        </View>
    );
}

export default ThemThuocScreen;

const styles = StyleSheet.create({
    seperate: { borderLeftWidth: 2, borderColor: BCarefulTheme.colors.border, borderStyle: 'dashed', padding: 12 },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: BCarefulTheme.colors.border,
        marginVertical: 8,
        padding: 4,
    },
    trash: {
        backgroundColor: '#f7d0cd',
        padding: 4,
        borderRadius: 120,
    },
    timeText: {
        fontSize: 50, // Tăng kích thước font
        margin: 10,
        fontFamily: fonts.bold
    },
});
