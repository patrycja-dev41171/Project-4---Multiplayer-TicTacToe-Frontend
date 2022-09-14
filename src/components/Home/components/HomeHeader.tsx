import React from "react";
import { Button, ListItemText } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./HomeHeadaer.css";

export const HomeHeader = () => {
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
                Misiaczek
                <KeyboardArrowDownIcon className="home-layout__header__menu__button__icon" />
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem
                  className="home-layout__header__menu__element"
                  dense={true}
                  onClick={popupState.close}
                >
                  <ListItemText style={{ textAlign: "center" }}>
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
          Points: <span>155</span>
        </p>
        <p>
          Number of games: <span>6</span>
        </p>
        <p>
          Ranking place: <span>24</span>
        </p>
      </div>
    </div>
  );
};
