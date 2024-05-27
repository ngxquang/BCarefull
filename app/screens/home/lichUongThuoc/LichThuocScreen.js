import {Button} from '@rneui/themed';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fonts from '../../../../assets/fonts/Fonts';

function LichThuocScreen() {
  const flatListRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [medicationStatus, setMedicationStatus] = useState({});

  const handleMedication = medication => {
    setSelectedMedication(medication);
    setModalVisible(true);
  };

  useEffect(() => {
    scrollToSelectedDate();
  }, [selectedDate]);

  const scrollToSelectedDate = () => {
    const index = weekDays.findIndex(day =>
      day.date.isSame(selectedDate, 'day'),
    );
    if (index !== -1) {
      flatListRef.current.scrollToIndex({animated: true, index: index - 3});
    }
  };

  const renderDay = ({item}) => {
    const isSelected = item.date.isSame(selectedDate, 'day');
    const dayStyle = isSelected
      ? styles.calendarDaySelected
      : styles.calendarDay;
    const dateStyle = isSelected
      ? styles.calendarDateSelected
      : styles.calendarDate;
    const containerStyle = isSelected
      ? styles.dayContainerSelected
      : styles.dayContainer;

    return (
      <TouchableOpacity onPress={() => setSelectedDate(item.date)}>
        <View style={containerStyle}>
          <Text style={dayStyle}>{item.day}</Text>
          <Text style={dateStyle}>{item.date.format('DD')}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const generateWeekDays = date => {
    const startOfWeek = moment(date).startOf('isoWeek');
    return Array.from({length: 14}).map((_, index) => {
      const day = moment(startOfWeek).add(index - 7, 'days');
      return {
        day: day.format('dd').toUpperCase(),
        date: day,
        isToday: day.isSame(moment(), 'day'),
      };
    });
  };
  const weekDays = generateWeekDays(selectedDate);

  const medications = [
    {
      id: 1,
      name: 'Cetirizin dihydrochlorid',
      time: '08:00',
      dosage: 'Uống 1 viên trước ăn',
    },
    {
      id: 2,
      name: 'Cetirizin dihydrochlorid',
      time: '09:00',
      dosage: 'Uống 2 viên sau ăn',
    },
    {id: 3, name: 'Ibuprofen', time: '12:00', dosage: 'Uống 1 viên sau ăn'},
    {id: 4, name: 'Paracetamol', time: '14:00', dosage: 'Uống 2 viên sau ăn'},
    {id: 5, name: 'Amoxicillin', time: '19:00', dosage: 'Uống 1 viên trước ăn'},
  ];

  const filterMedicationsByTime = (startHour, endHour) => {
    return medications.filter(med => {
      const medHour = moment(med.time, 'HH:mm').hour();
      return medHour >= startHour && medHour < endHour;
    });
  };

  const handleMedicationAction = action => {
    setMedicationStatus(prevStatus => ({
      ...prevStatus,
      [selectedMedication.id]: action,
    }));
    setModalVisible(false);
  };

  const renderMedicationStatus = medicationId => {
    const status = medicationStatus[medicationId];
    if (status === 'taken') {
      return <Icon name="check-circle" size={24} color="green" />;
    } else if (status === 'skipped') {
      return <Icon name="times-circle" size={24} color="red" />;
    }
    return <Icon name="circle-o" size={24} color="grey" />;
  };

  const renderMedicationCard = (title, meds) => {
    if (meds.length === 0) return null;
    return (
      <View style={styles.medicationCard}>
        <Text style={styles.timeOfDay}>{title}</Text>
        {meds.map(med => (
          <View key={med.id} style={styles.medicationItemContainer}>
            <View style={styles.statusContainer}>
              {renderMedicationStatus(med.id)}
            </View>
            <TouchableOpacity
              style={styles.medicationItem}
              onPress={() => handleMedication(med)}>
              <Text style={styles.medicationText}>{med.name}</Text>
              <Text style={styles.medicationTime}>
                {med.time} - {med.dosage}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  const morningMeds = filterMedicationsByTime(4, 11);
  const noonMeds = filterMedicationsByTime(11, 13);
  const afternoonMeds = filterMedicationsByTime(13, 18);
  const eveningMeds = filterMedicationsByTime(18, 21);

  const noMedications =
    morningMeds.length === 0 &&
    noonMeds.length === 0 &&
    afternoonMeds.length === 0 &&
    eveningMeds.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.header}>
          <Text style={styles.title}>Quản Lý</Text>
          <TouchableOpacity>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={weekDays}
          renderItem={renderDay}
          keyExtractor={item => item.date.toString()}
          horizontal
          style={styles.calendar}
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={7}
          getItemLayout={(data, index) => ({
            length: 50,
            offset: 50 * index,
            index,
          })}
        />

        <Text style={styles.currentDate}>
          {selectedDate.isSame(moment(), 'day') ? 'Hôm nay, ' : ''}
          Ngày {selectedDate.format('DD')} tháng {selectedDate.format('MM')},{' '}
          {selectedDate.format('YYYY')}
        </Text>

        <View style={styles.actionButtons}>
          <Button
            title="NGỪNG TẤT CẢ"
            buttonStyle={styles.stopAllButton}
            onPress={() => {}}
          />
          <Button
            title="DÙNG TẤT CẢ"
            buttonStyle={styles.takeAllButton}
            onPress={() => {}}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.patientName}>LÊ DUY NGUYÊN (N23-0253996)</Text>

        {renderMedicationCard('Buổi sáng', morningMeds)}
        {renderMedicationCard('Buổi trưa', noonMeds)}
        {renderMedicationCard('Buổi chiều', afternoonMeds)}
        {renderMedicationCard('Buổi tối', eveningMeds)}

        {noMedications && (
          <Text style={styles.noMedicationText}>Bạn chưa có lịch nào</Text>
        )}

        <Button
          title="Quản lý toa thuốc"
          buttonStyle={styles.manageButton}
          onPress={() => {}}
        />
      </ScrollView>

      {selectedMedication && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Xác nhận uống thuốc</Text>
              <Text style={styles.modalPatientName}>
                LÊ DUY NGUYÊN (N23-0253996)
              </Text>
              <Text style={styles.modalMedicationName}>
                {selectedMedication.name}
              </Text>
              <Text style={styles.modalMedicationTime}>
                {selectedMedication.time} - {selectedMedication.dosage}
              </Text>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleMedicationAction('skipped')}>
                  <Text style={styles.modalButtonText}>Bỏ qua</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleMedicationAction('taken')}>
                  <Text style={styles.modalButtonText}>Dùng thuốc</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    /* logic điều chỉnh */
                  }}>
                  <Text style={styles.modalButtonText}>Điều chỉnh</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  calendarIcon: {
    fontSize: 24,
  },
  calendar: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
  },
  calendarDay: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  calendarDaySelected: {
    fontSize: 14,
    textAlign: 'center',
    color: '#007bff',
  },
  calendarDate: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  calendarDateSelected: {
    fontSize: 16,
    textAlign: 'center',
    color: '#007bff',
    fontWeight: 'bold',
  },
  dayContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainerSelected: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  currentDate: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  stopAllButton: {
    backgroundColor: 'red',
  },
  takeAllButton: {
    backgroundColor: 'green',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 210, // Adjust this value based on the height of the fixed header
  },
  medicationCard: {
    backgroundColor: '#f9f9f9',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#7864EA',
  },
  patientName: {
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  timeOfDay: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  medicationItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  medicationItem: {
    flexDirection: 'column',
    flex: 1,
  },
  medicationText: {
    fontSize: 14,
    color: '#333',
  },
  medicationTime: {
    fontSize: 12,
    color: '#666',
  },
  statusContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  noMedicationText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
  manageButton: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#007bff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalPatientName: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalMedicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMedicationTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#999',
  },
});

export default LichThuocScreen;
