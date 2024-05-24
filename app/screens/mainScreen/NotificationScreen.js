import { Button } from '@rneui/themed';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import Fonts from '../../../assets/fonts/Fonts';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BCarefulTheme } from '../../component/Theme';

function NotificationScreen() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [readNotifications, setReadNotifications] = useState([
    {
      id: '1',
      title: 'Thông báo 1 read',
      date: '2024-05-15',
      content: 'Thông báo về cuộc họp tổng kết cuối năm vào ngày 20/12.',
    },
    {
      id: '2',
      title: 'Thông báo 2 read',
      date: '2024-05-18',
      content: 'Lịch nghỉ Tết Nguyên Đán năm nay từ ngày 10/02 đến 16/02.',
    },
    {
      id: '3',
      title: 'Thông báo 3 read',
      date: '2024-05-17',
      content:
        'Công ty sẽ tổ chức buổi dã ngoại vào cuối tuần này tại công viên ABC.',
    },
    {
      id: '4',
      title: 'Thông báo 4 read',
      date: '2024-05-21',
      content: 'Đăng ký khóa học nâng cao kỹ năng mềm từ ngày 01/06.',
    },
  ]);

  const [unreadNotifications, setUnreadNotifications] = useState([
    {
      id: '5',
      title: 'Thông báo 5 unread',
      date: '2024-05-20',
      content:
        'Thông báo về việc thay đổi chính sách bảo hiểm y tế từ tháng sau.',
    },
    {
      id: '6',
      title: 'Thông báo 6 unread',
      date: '2024-05-16',
      content: 'Lịch kiểm tra sức khỏe định kỳ sẽ diễn ra vào ngày 25/05.',
    },
    {
      id: '7',
      title: 'Thông báo 7 unread',
      date: '2024-05-10',
      content: 'Công ty tuyển dụng thêm nhân viên cho vị trí kỹ thuật viên IT.',
    },
    {
      id: '8',
      title: 'Thông báo 8 unread',
      date: '2024-05-3',
      content:
        'Khuyến mãi đặc biệt cho nhân viên khi mua sản phẩm của công ty trong tháng này.',
    },
  ]);

  // sort thong bao
  const sortedNotifications = notifications => {
    return notifications.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Danh dau tat ca da doc
  const markAllAsRead = () => {
    setReadNotifications([...readNotifications, ...unreadNotifications]);
    setUnreadNotifications([]);
  };

  // Hien thi danh sach thong bao
  const renderNotification = ({ item }) => {
    const isUnread = unreadNotifications.some(
      notification => notification.id === item.id,
    );

    return (
      <TouchableOpacity
        style={[
          styles.notificationContainer,
          isUnread ? styles.unreadNotification : styles.readNotification,
        ]}
        onPress={() => {
          setSelectedNotification(item);
          setModalVisible(true);
          if (isUnread) {
            // Nếu thông báo chưa đọc
            // Chuyển thông báo từ mảng chưa đọc sang mảng đã đọc
            setUnreadNotifications(
              unreadNotifications.filter(
                notification => notification.id !== item.id,
              ),
            );
            setReadNotifications([...readNotifications, item]);
          }
        }}>
        {isUnread && <View style={styles.unreadDot} />}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Thông Báo</Text>
        <TouchableOpacity
          // style={styles.markAllAsReadButton}
          onPress={markAllAsRead}>
          {/* <Text style={styles.markAllAsReadButtonText}>Đọc hết</Text> */}
          {/* <FontistoIcon name={'arrow-swap'} style={styles.icon} /> */}
          <Icon name="checkmark-done" type="ionicon" color={'#000'} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[selectedTab === 'all' ? styles.selectedTab : styles.tab]}
          onPress={() => setSelectedTab('all')}>
          <Text
            style={
              selectedTab === 'all' ? styles.selectedTabText : styles.tabText
            }>
            Tất Cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[ selectedTab === 'unread' ? styles.selectedTab : styles.tab,]}
          onPress={() => setSelectedTab('unread')}>
          <Text
            style={
              selectedTab === 'unread' ? styles.selectedTabText : styles.tabText
            }>
            Chưa Đọc
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={
          selectedTab === 'all'
            ? sortedNotifications([
              ...unreadNotifications,
              ...readNotifications,
            ])
            : sortedNotifications(unreadNotifications)
        } // Hiển thị thông báo theo tab đã chọn
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedNotification?.title}</Text>
            <Text style={styles.modalContent}>
              {selectedNotification?.content}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: '#ddd',
  },
  selectedTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderBottomWidth: 2,
    // borderColor: '#ddd',
    borderBottomWidth: 5,
    borderRightColor: '#ddd',
    borderLeftColor: '#ddd',
    borderTopColor: '#ddd',
    borderBottomColor: BCarefulTheme.colors.primary,
  },
  header: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  markAllAsReadButton: {
    backgroundColor: BCarefulTheme.colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  markAllAsReadButtonText: {
    color: 'white',
    fontSize: 16,
  },
  tabText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: '#000',
  },
  selectedTabText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: BCarefulTheme.colors.primary,
    bottom: -2,
  },
  notificationContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  unreadNotification: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: BCarefulTheme.colors.primary,
    marginRight: 10,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    textTransform: 'uppercase',
    color: BCarefulTheme.colors.primary,
  },
  date: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#888',
  },
  content: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#333',
    marginTop: 5,
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
  modalTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    marginBottom: 10,
    textTransform: 'uppercase',
    color: BCarefulTheme.colors.primary,
  },
  modalContent: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: BCarefulTheme.colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default NotificationScreen;
