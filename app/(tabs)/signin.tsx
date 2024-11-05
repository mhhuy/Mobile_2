// src/components/LoginPage.js

import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { API_URL } from '../url';
import { loginUser } from '../api/auth';
import { Image } from 'react-native';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Thông báo đăng nhập
  const [error, setError] = useState(""); // Thông báo lỗi

  const handleLogin = async () => {
    if (email && password) {
      try {
        const data = await loginUser(email, password); // Gọi hàm đăng nhập
        setMessage(data.message); // Cập nhật thông báo thành công
        setError(""); // Xóa thông báo lỗi
        router.push({pathname: "./home"});
      } catch (error) {
        setMessage(""); // Xóa thông báo thành công nếu có lỗi
        setError("Đăng nhập thất bại!"); // Thông báo lỗi khi đăng nhập không thành công
      }
    } else {
      setError("Vui lòng điền đầy đủ thông tin!"); // Thông báo khi thiếu trường
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
      <Image 
        source={require('../../assets/images/logo-3.png')} 
        style={styles.imageLogo} 
        resizeMode="contain" 
      />
      </View>
      
      <Text style={styles.heading}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#A0A0A0"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.textFooter}>
        Forgot your password?{' '}
        <Link href="../" style={styles.linkText}>Reset here</Link>
      </Text>

      <Text style={styles.textFooter}>
        Don't have an account?{' '}
        <Link href="./signup" style={styles.linkText}>Sign Up</Link>
      </Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  imageLogo:{
      width: '100%',
      height: 200, // Set a fixed height for the logo
      marginBottom: 2, // Add some spacing below the image
      marginLeft:0,
},
  message: {
    fontSize: 20,
    color: "green",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 16,
  },
  errorMessage: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: '#003366',
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    backgroundColor: '#003366',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textFooter: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  linkText: {
    color: '#003366',
    fontWeight: 'bold',
  },
});

export default SignIn;
