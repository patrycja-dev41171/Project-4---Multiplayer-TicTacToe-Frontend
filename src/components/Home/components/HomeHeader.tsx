import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { setReset } from "../../../redux-toolkit/features/user/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../redux-toolkit/store";

import { Button, ListItemText } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { apiUrl } from "../../../utils/config/api";
import "./HomeHeadaer.css";

export const HomeHeader = () => {
  const { accessToken, username, points, games, scoreboard_place } = useSelector(
    (store: StoreState) => store.user
  );
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    await axios({
      method: "DELETE",
      url: `${apiUrl}/login`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
      responseType: "json",
    })
      .then(async function (response: any) {
        if (response.name === "AxiosError") {
          console.log(response);
        } else {
          await dispatch(setReset());
          navigate("/");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className="home-layout__header">
      <div className="home-layout__header__menu">
        <img
          className="home-layout__header__img"
          src="./images/logo-image.svg"
          alt="Logo"
        />
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button
                className="home-layout__header__menu__button"
                variant="text"
                {...bindTrigger(popupState)}
              >
                <img src="./images/avatar.png" alt="Logo" />
                {username}
                <KeyboardArrowDownIcon className="home-layout__header__menu__button__icon" />
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem
                  className="home-layout__header__menu__element"
                  dense={true}
                  onClick={popupState.close}
                >
                  <ListItemText
                    style={{ textAlign: "center" }}
                    onClick={() => logout()}
                  >
                    <span className="home-layout__header__menu__span">
                      Logout
                    </span>
                  </ListItemText>
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
      <div className="home-layout__header__info">
        <p>
          Points: <span>{points}</span>
        </p>
        <p>
          Number of games: <span>{games}</span>
        </p>
        <p>
          Ranking place: <span>{scoreboard_place}</span>
        </p>
      </div>
    </div>
  );
};
