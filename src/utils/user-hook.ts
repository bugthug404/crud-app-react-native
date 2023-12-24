import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { loaderOpenState, userAuthTokenAtom } from "./user-atom";
import { apiConfig } from "./config";
import { Alert } from "react-native";
import { UserModel } from "./user-model";

export function useUserCrud() {
  const setLoader = useSetAtom(loaderOpenState);
  const userToken = useAtomValue(userAuthTokenAtom);

  async function deleteUser(userId: string) {
    setLoader(true);
    try {
      const data = await axios.delete(
        `${apiConfig.api}/user/delete/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setLoader(false);
      alert("User deleted successfully!");
      return { data };
    } catch (error: any) {
      alert(error?.response?.data?.error ?? "Error deleting user");
      setLoader(false);
      return { error };
    }
  }

  async function editUser(
    userId: string,
    userData: Partial<UserModel>,
    callBack: Function
  ) {
    setLoader(true);
    try {
      const data = await axios.put(
        `${apiConfig.api}/user/edit/${userId}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setLoader(false);
      Alert.alert("User updated successfully!");
      callBack();
      return { data };
    } catch (error: any) {
      setLoader(false);
      Alert.alert(error?.response?.data?.error ?? "Error editing user");
      return { error };
    }
  }

  async function addUser(userData: any) {
    setLoader(true);
    try {
      const data = await axios.post(`${apiConfig.api}/user/add`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      setLoader(false);
      Alert.alert("User added successfully!");

      return { data, error: null };
    } catch (error: any) {
      setLoader(false);
      console.error(error?.response?.data?.error, error);
      Alert.alert(error?.response?.data?.error ?? "Error adding user");
      return { error, data: null };
    }
  }

  return { editUser, deleteUser, addUser };
}
