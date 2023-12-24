import axios from "axios";
import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { Toast } from "toastify-react-native";
import { apiConfig } from "./config";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { userAuthTokenAtom, userDataAtom } from "./user-atom";

export function useAuth() {
  const [user, setUser] = useAtom(userDataAtom);
  const setUserToken = useSetAtom(userAuthTokenAtom);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const userStorage = useAsyncStorage("userData");

  function login(data: any) {
    axios
      .post(`${apiConfig.api}/login`, data, {
        headers: {
          mode: "cors",
          "Content-Type": "application/json",
          acccept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(async function (response) {
        if (response.data?.token && response?.data?.user) {
          setUserToken(response?.data?.token);
          setUser(response?.data?.user);
          await userStorage.setItem(JSON.stringify(response?.data));
        } else {
          Toast.warn("mission data", "top");
        }

        Toast.success("Login Successfull");
      })
      .catch((error: any) => {
        Toast.error("Login Failed", "top");
        error.message &&
          alert(`Api Response : ${JSON.stringify(error) ?? "no data"}`);
      });
  }

  function signup(data: any) {
    axios
      .post(`${apiConfig.api}/signup`, data, {
        headers: {
          mode: "cors",
          "Content-Type": "application/json",
          acccept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        Toast.success("Signup Success");
      })
      .catch((error) => {
        error.message &&
          alert(`Api Response : ${JSON.stringify(error) ?? "no data"}`);
        Toast.error("Signup Error", "top");
      });
  }

  function testApiCall() {
    // setLoader(true);
    axios
      .get(`${apiConfig.api}`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        res.data.data && alert(`Api Response : ${res.data.data}`);
      })
      .catch((err) => {
        err.message && alert(`Api Response : ${err.message ?? "no data"}`);
      });
  }

  async function logout() {
    await userStorage.removeItem();
    setUser(null);
    setUserToken(null);
  }

  return { login, signup, testApiCall, logout, isLoggedIn, user };
}
