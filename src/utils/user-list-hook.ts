import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { loaderOpenState, userAuthTokenAtom } from "./user-atom";
import { useQuery } from "react-query";
import { UserModel } from "./user-model";
import { apiConfig } from "./config";

export function useUsers() {
  const setLoader = useSetAtom(loaderOpenState);
  const token = useAtomValue(userAuthTokenAtom);

  const { data, refetch } = useQuery(
    "userlist",
    () => {
      setLoader(true);
      return axios.get<{ users: UserModel[] }>(`${apiConfig.api}/user/list`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      enabled: !!token,
      onSuccess: () => {
        setLoader(false);
      },
      refetchOnWindowFocus: false,
    }
  );

  return { users: data?.data.users, refetch };
}
