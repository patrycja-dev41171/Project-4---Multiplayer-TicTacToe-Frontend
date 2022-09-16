import { apiUrl } from "../config/api";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { StoreState } from "../../redux-toolkit/store";
import axios from "axios";
import {
  setAccessToken,
  setExpirationTime,
  setUser_id,
  setUsername,
} from "../../redux-toolkit/features/user/user-slice";
import { useNavigate } from "react-router-dom";

interface AccessToken {
  name: string;
  exp: number;
}

export const useRefreshToken = async () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
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
        await dispatch(setUser_id(response.data.user_id));
        await dispatch(setAccessToken(response.data.accessToken));
        await dispatch(setExpirationTime(decoded.exp));
        await dispatch(setUsername(response.data.username));
        // navigate("/home");
      } else {
        return
      }
    } else return;
  };

  useEffect(() => {
    refresh();
  }, []);
};
