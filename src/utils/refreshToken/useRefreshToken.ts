import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { StoreState } from "../../redux-toolkit/store";
import {
  setAccessToken,
  setExpirationTime,
  setUser_id,
  setUsername,
} from "../../redux-toolkit/features/user/user-slice";
import { apiUrl } from "../config/api";

interface AccessToken {
  name: string;
  exp: number;
}

export const useRefreshToken = async () => {
  const dispatch = useDispatch();
  const { accessToken, expirationTime } = useSelector(
    (store: StoreState) => store.user
  );
  const currentDate = new Date();

  const refresh = async () => {
    if (accessToken === "" || expirationTime * 1000 < currentDate.getTime()) {
      const response = await axios({
        method: "GET",
        url: `${apiUrl}/refreshToken`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        responseType: "json",
      });
      if (response.data !== "") {
        const decoded = jwtDecode<AccessToken>(response.data.accessToken);
        dispatch(setUser_id(response.data.user_id));
        dispatch(setAccessToken(response.data.accessToken));
        dispatch(setExpirationTime(decoded.exp));
        dispatch(setUsername(response.data.username));
      } else {
        return;
      }
    } else return;
  };

  useEffect(() => {
    refresh();
  }, []);
};
