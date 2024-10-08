// src/components/LoginPage.js

import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';

const LoginPage = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState(null);

  // const handleSubmit = () => {
  //   if (!email || !password) {
  //     //setError('Please fill in both fields.');
  //     return;
  //   }

  //   // Xử lý đăng nhập ở đây (ví dụ: gọi API)
  //   console.log('Email:', email);
  //   console.log('Password:', password);
  //   setError(null);
  // };

  return (

    <View style={styles.container}>
      
      <Text variant="headlineSmall">Sign In</Text>
      {/* {error && (
        <Snackbar
          visible={!!error}
          onDismiss={() => setError(null)}
          action={{
            label: 'Close',
            onPress: () => setError(null),
          }}
        >
          {error}
        </Snackbar>
      )} */}
      <TextInput
        label="Username"
        mode="outlined"
        //value={email}
        //onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        //value={password}
        //onChangeText={setPassword}
        style={styles.input}
      />
      <Button mode="contained"  style={styles.button}> 
        {/* onPress={handleSubmit} */}
        <Link href="./">Sign In</Link>
        
      </Button>
      <Button
        mode="text"
        //onPress={() => navigation.navigate('ForgotPassword')}
        style={styles.forgotPasswordButton}
      >
        Forgot Password?
      </Button>
      <Button 
        mode="text"
        ///onPress={() => navigation.navigate('Login')}
        style={styles.forgotPasswordButton}
      >
        <Link href="./signup">Already have an account? Sign Up</Link>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  forgotPasswordButton: {
    marginTop: 16,
  },
});

export default LoginPage;
