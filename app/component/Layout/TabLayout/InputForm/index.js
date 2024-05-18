import React, {useState} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';

export function IFNgay({title}) {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View>
      <DatePicker
        modal
        open={open}
        date={chosenDate}
        onConfirm={chosenDate => {
          setOpen(false);
          setChosenDate(chosenDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View style={styles.status}>
        <Text>{title}</Text>
        <Text onPress={() => setOpen(true)}>
          {' '}
          {chosenDate.toLocaleDateString()}{' '}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  status: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
});
