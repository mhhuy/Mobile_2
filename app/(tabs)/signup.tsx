// src/components/LoginPage.js

import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { API_URL } from '../url';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // Trạng thái đăng ký

  const handleRegister = async () => {
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirmpassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Đăng ký thành công");
        Alert.alert("Success", "Đăng kí thành công");
        router.push({pathname: "./signin"});
      } else {
        setMessage(data.message || "Something went wrong");
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Đăng kí thất bại");
      Alert.alert("Error", "Đăng kí thất bại");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#A0A0A0"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmpassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#A0A0A0"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.textFooter}>
        Already have an account?{' '}
        <Link href="./signin" style={styles.linkText}>Sign in</Link>
      </Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
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
  message: {
    fontSize: 20,
    color: "green",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
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

export default SignUp;
