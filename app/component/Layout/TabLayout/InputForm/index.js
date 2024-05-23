import {color} from '@rneui/base';
import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {BCarefulTheme} from '../../../Theme';
import Fonts from '../../../../../assets/fonts/Fonts';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

export function IFNgay({title, style}) {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View>
      <DatePicker
        modal
        open={open}
        date={chosenDate}
        onConfirm={date => {
          setOpen(false);
          setChosenDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View style={[styles.container, style]}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.status}>
          <FontistoIcon name={'calendar'} style={styles.icon} />
          <Text style={styles.date} onPress={() => setOpen(true)}>
            {chosenDate.toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#999',
    paddingRight: 10,
  },
  icon: {
    color: '#999',
    fontFamily: Fonts.regular,
    marginRight: 6,
    fontSize: 16,
  },
  date: {
    color: BCarefulTheme.colors.primary,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
});
