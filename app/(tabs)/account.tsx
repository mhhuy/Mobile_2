import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { logoutUser } from '../api/auth';

const AccountScreen = () => {
  
  const [message, setMessage] = useState(""); // Thông báo đăng nhập
  const [error, setError] = useState("")
  const handleLogout = async () => {
    try {
      const data = await logoutUser(); // Gọi hàm đăng xuất
      setMessage(data.message); // Cập nhật thông báo thành công
      setError(""); // Xóa thông báo lỗi
      router.push({pathname: "./"});
    } catch (error) {
      setMessage(""); // Xóa thông báo thành công nếu có lỗi
      setError("Đăng nhập thất bại!"); // Thông báo lỗi khi đăng nhập không thành công
    }
    
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hình đại diện và thông tin người dùng */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: '../../assets/images/react-logo.png' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>Đồng Minh Huy</Text>
        </View>
      </View>

      {/* Thông tin tài khoản */}
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Địa chỉ:</Text>
        <Text style={styles.infoText}>122 Tăng Nhơn Phú, P. Tăng Nhơn Phú A, TP. Thủ Đức, TP.HCM</Text>

        <Text style={styles.label}>Số điện thoại:</Text>
        <Text style={styles.infoText}>0348416852</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.infoText}>minhhuy@gmail.com</Text>
      </View>

      {/* Nút đăng xuất (cải tiến) */}
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ff5c5c',
  },
  userInfo: {
    marginLeft: 20,
  },
  username: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  welcomeText: {
    marginTop: 5,
    color: '#888',
  },
  profileInfo: {
    marginVertical: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
  },
  logoutButtonContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: '#003366',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#ff5c5c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AccountScreen;
