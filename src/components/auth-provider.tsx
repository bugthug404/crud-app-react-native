import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Center from "./center";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../pages/home-screen";
import LoginScreen from "../pages/login-screen";
import SignupScreen from "../pages/signup-screen";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useAtom, useSetAtom } from "jotai";
import { userAuthTokenAtom, userDataAtom } from "../utils/user-atom";
import Button from "./button";
import { useAuth } from "../utils/auth-hook";
import SomethingNotRight from "../utils/SomethingNotRight";

export default function AuthProvider() {
  const [loading, setLoading] = useState<boolean | null>(null);
  const [user, setUser] = useAtom(userDataAtom);
  const [userToken, setUserToken] = useAtom(userAuthTokenAtom);
  const userData = useAsyncStorage("userData");

  const Stack = createNativeStackNavigator();

  async function getData() {
    if (!loading && !user) {
      setLoading(true);

      const data = await userData.getItem();
      const u = JSON.parse(data ?? "{}").user;
      const t = JSON.parse(data ?? "{}").token;
      setUser(u && t ? u : null);
      setUserToken(u && t ? t : null);
      setLoading(false);
      return;
    } else {
      return;
    }
  }

  useEffect(() => {
    if (!user) {
      getData();
    }
  }, [user]);

  if (loading) {
    return (
      <Center>
        <Text>Loading...</Text>
      </Center>
    );
  } else if (!!user === true) {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerBackVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
      </Stack.Navigator>
    );
  } else if (!user && loading === false) {
    return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerBackVisible: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: "Signup" }}
        />
      </Stack.Navigator>
    );
  } else {
    return <Text>we got this user = {`${JSON.stringify(user)}`}</Text>;
  }
}
