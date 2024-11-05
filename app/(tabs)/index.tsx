import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./signin";

export default function Start() {
  const Stack = createNativeStackNavigator();
  return (
    <>
    <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName="Signin"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="signin" component={SignIn} />
          {/* <Stack.Screen name="Main" component={index} />
          <Stack.Screen name="SignUp" component={SignUp} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

