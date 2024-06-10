import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { CustomHeader } from "../../../component/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import { BCarefulTheme, style } from "../../../component/Theme";
import Fonts from "../../../../assets/fonts/Fonts";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


function LichThang() {
  const navigation = useNavigation();
  const route = useRoute();
  const { setSelectedDate } = route.params;

  const [selectDate, setSelectDate] = useState(new Date());
  const today = new Date().toISOString().split('T')[0];

  const handleSelectDate = day => {
    const date = new Date(day.timestamp);
    setSelectDate(date);

    // Sử dụng `setSelectedDate` từ màn hình trước
    setSelectedDate(moment(date));

    navigation.goBack();
  };

  const getMarkedDates = () => {
    const dates = {};
    const todayDate = new Date(today);
    const startDate = new Date(today);
    const endDate = new Date(today);
    startDate.setFullYear(todayDate.getFullYear() - 1);
    endDate.setFullYear(todayDate.getFullYear() + 1);

    // Mark past dates
    for (
      let d = new Date(startDate);
      d <= todayDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().split('T')[0];
      dates[dateStr] = {
        customStyles: {
          container: {
            backgroundColor: 'lightgray',
            borderRadius: 8,
            height: 46,
            width: 46,
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            color: 'gray',
            fontSize: 16,
            lineHeight: 20,
          },
        },
      };
    }

    // Mark today's date
    dates[today] = {
      customStyles: {
        container: {
          backgroundColor: 'white',
          elevation: 2,
          borderRadius: 8,
          height: 46,
          width: 46,
          justifyContent: 'center',
          alignItems: 'center',
        },
        text: {
          color: 'blue',
          fontSize: 16,
          lineHeight: 20,
        },
      },
    };

    // Mark future dates
    let futureDate = new Date(todayDate);
    futureDate.setDate(futureDate.getDate() + 1);
    for (let d = futureDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      dates[dateStr] = {
        customStyles: {
          container: {
            backgroundColor: BCarefulTheme.colors.primary,
            borderRadius: 8,
            height: 46,
            width: 46,
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            color: '#fff',
            fontSize: 16,
            lineHeight: 20,
          },
        },
      };
    }

    return dates;
  };

  // const shouldDisableLeftArrow = () => {
  //   const minDate = new Date();
  //   const currentMonth = selectDate.getMonth();
  //   const currentYear = selectDate.getFullYear();
  //   return (
  //     minDate.getMonth() === currentMonth &&
  //     minDate.getFullYear() === currentYear
  //   );
  // };

  // const shouldDisableRightArrow = () => {
  //   const maxDate = new Date();
  //   maxDate.setMonth(maxDate.getMonth() + 1);
  //   const currentMonth = selectDate.getMonth();
  //   const currentYear = selectDate.getFullYear();
  //   return (
  //     maxDate.getMonth() === currentMonth &&
  //     maxDate.getFullYear() === currentYear
  //   );
  // };

  const onMonthChange = month => {
    setSelectDate(new Date(month.year, month.month - 1, 1));
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={'Lịch uống thuốc'} />
      <View style={styles.body}>
        <Calendar
          current={selectDate.toISOString().split('T')[0]}
          onDayPress={handleSelectDate}
          onMonthChange={onMonthChange}
          monthFormat={'MMMM yyyy'}
          hideArrows={false}
          renderArrow={direction => (
              <View style={styles.iconMuiTenContainer}>
                <FontAwesomeIcon
                  name={direction === 'left' ? 'angle-left' : 'angle-right'}
                  size={24}
                  style={styles.iconMuiTen}
                />
              </View>
            )
          }
          hideExtraDays={true}
          firstDay={0}
          disableMonthChange={false}

          theme={{
            calendarBackground: BCarefulTheme.colors.background,
            textSectionTitleColor: BCarefulTheme.colors.primary,
            todayTextColor: '#fff',
            textDisabledColor: '#999',
            arrowStyle: style.h6,
            textDayStyle: style.h7,
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'black',
            textMonthFontFamily: Fonts.bold,
            textDayHeaderFontFamily: Fonts.regular,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
            textDayHeaderFontFamily: Fonts.regular,
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                marginBottom: 5,
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: '#fff',
                borderRadius: 8,
              },
              monthText: {
                margin: 'auto',
                fontSize: 16,
                fontFamily: Fonts.bold,
                color: 'black',
              },
            },
          }}
          markingType={'custom'}
          markedDates={getMarkedDates()}
        />
        <View style={styles.chuThichContainer}>
          <View style={styles.chuThich}>
            <View
              style={[styles.mauChuThich, { backgroundColor: '#fff' }]}></View>
            <Text style={style.t1}>Ngày hôm nay</Text>
          </View>
          <View style={styles.chuThich}>
            <View
              style={[
                styles.mauChuThich,
                { backgroundColor: 'lightgray' },
              ]}></View>
            <Text style={style.t1}>Ngày trống</Text>
          </View>
          <View style={styles.chuThich}>
            <View
              style={[
                styles.mauChuThich,
                { backgroundColor: BCarefulTheme.colors.primary },
              ]}></View>
            <Text style={style.t1}>Ngày có lịch sử dụng thuốc</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  body: {
    marginTop: 20,
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: '#000',
  },
  icon: {
    fontSize: 26,
    color: '#000',
  },
  chuThichContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  chuThich: {
    flexDirection: 'row',
    marginVertical: 2,
    alignItems: 'center',
  },
  mauChuThich: {
    borderColor: 'lightgray',
    borderWidth: 1,
    height: 18,
    width: 18,
    borderRadius: 4,
    marginRight: 8,
  },
  iconMuiTenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    backgroundColor: BCarefulTheme.colors.light,
    borderRadius: 4,
  },
  iconMuiTen: {
    color: 'blue',
    paddingVertical: 4,
  },
});

export default LichThang;
