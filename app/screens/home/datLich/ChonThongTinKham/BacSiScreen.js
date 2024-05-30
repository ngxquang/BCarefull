import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListItem, Icon } from '@rneui/themed';
import { style } from '../../../../component/Theme';

const doctors = [
    { id: '1', name: 'Bác Sĩ 1', time: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], desc: 'Đây là Bác Sĩ 1' },
    { id: '2', name: 'Bác Sĩ 2', time: [0, 1, 5, 6, 7, 8, 9], desc: 'Đây là Bác Sĩ 2' },
    { id: '3', name: 'Bác Sĩ 3', time: [0, 1, 2, 3, 8, 9], desc: 'Đây là Bác Sĩ 3' },
    { id: '4', name: 'Bác Sĩ 4', time: [1, 3, 4, 5, 6, 7, 8], desc: 'Đây là Bác Sĩ 4' },
    { id: '5', name: 'Bác Sĩ 5', time: [2, 3, 6, 7, 8, 9], desc: 'Đây là Bác Sĩ 5' },
    { id: '6', name: 'Bác Sĩ 6', time: [0, 1, 2, 4, 5, 6, 7], desc: 'Đây là Bác Sĩ 6' },
    { id: '7', name: 'Bác Sĩ 7', time: [0, 1, 2, 3], desc: 'Đây là Bác Sĩ 7' },
    { id: '8', name: 'Bác Sĩ 8', time: [7, 8, 9], desc: 'Đây là Bác Sĩ 8' },
];

const schedule = ['7h00', '8h00', '9h00', '10h00', '11h00', '13h00', '14h00', '15h00', '16h00', '17h00'];

const BacSiScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { setDoctor, setSchedule } = route.params;

    const [expanded, setExpanded] = useState({});

    const toggleExpand = (doctorId) => {
        setExpanded(prev => ({ ...prev, [doctorId]: !prev[doctorId] }));
    };

    const handleSelect = (doctorName, schedule) => {
        setDoctor(doctorName);
        setSchedule(schedule);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={style.container}>
            <FlatList
                data={doctors}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ListItem.Accordion

                        content={
                            <ListItem.Content
                                style={style.input}
                            >
                                <ListItem.Title>{item.name}</ListItem.Title>
                                <ListItem.Subtitle>{item.desc}</ListItem.Subtitle>
                            </ListItem.Content>
                        }
                        isExpanded={expanded[item.id]}
                        onPress={() => toggleExpand(item.id)}
                    >
                        {item.time.map((timeIndex) => (
                            <ListItem
                                key={timeIndex}
                                onPress={() => handleSelect(item.name, schedule[timeIndex])}
                            >
                                <ListItem.Content>
                                    <ListItem.Title>{schedule[timeIndex]}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </ListItem.Accordion>
                )}
            />
        </SafeAreaView>
    );
};

export default BacSiScreen;
