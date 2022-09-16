import { createSlice } from "@reduxjs/toolkit";

interface User {
  user_id: string;
  username: string;
  points: number;
  games: number;
  room_id: string;
  accessToken: string;
  expirationTime: number;
  scoreboard: [];
}

const initialState: User = {
  user_id: "",
  username: "",
  points: 0,
  games: 0,
  room_id: "",
  accessToken: "",
  expirationTime: 0,
  scoreboard: [],
};

interface SetUser_id {
  payload: string;
}

interface SetUsername {
  payload: string;
}

interface SetPoints {
  payload: number;
}

interface SetGames {
  payload: number;
}

interface SetRoom_id {
  payload: string;
}

interface SetAccessToken {
  payload: string;
}

interface SetExpirationTime {
  payload: number;
}

interface SetScoreboard {
  payload: [];
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser_id: (state, action: SetUser_id) => {
      state.user_id = action.payload;
    },
    setUsername: (state, action: SetUsername) => {
      state.username = action.payload;
    },
    setPoints: (state, action: SetPoints) => {
      state.points = action.payload;
    },
    setGames: (state, action: SetGames) => {
      state.games = action.payload;
    },
    setRoom_id: (state, action: SetRoom_id) => {
      state.room_id = action.payload;
    },
    setAccessToken: (state, action: SetAccessToken) => {
      state.accessToken = action.payload;
    },
    setExpirationTime: (state, action: SetExpirationTime) => {
      state.expirationTime = action.payload;
    },
    setScoreboard: (state, action: SetScoreboard) => {
      state.scoreboard = action.payload;
    },
    setReset:() => {
      return initialState;
    }
  },
});

export const {
  setUser_id,
  setUsername,
  setAccessToken,
  setExpirationTime,
  setRoom_id,
  setGames,
  setPoints,
  setScoreboard,
  setReset
} = userSlice.actions;
