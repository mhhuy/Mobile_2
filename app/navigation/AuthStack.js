import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignIn from "../(tabs)/signin";
import HomeScreen from "../(tabs)";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={SignIn} name="Signin" />
      <Stack.Screen component={HomeScreen} name="Home" />
    </Stack.Navigator>
  );
};

export default AuthStack;
