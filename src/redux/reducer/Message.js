// http://localhost:3001/api/v1/users/list

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// All Users Get Here
export const getAllMessage = createAsyncThunk(
  "getAllMessage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/users/allMessages?skip=${data.pageNo}&limit=10`,
        {
          myId: Cookies.get("refreshToken"),
          chatId: data.chatId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.data;
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Send a Message
export const sendMessage = createAsyncThunk(
  "sendMessage",
  async (data, { rejectWithValue }) => {
    try {
      const { content, chatId, myId } = data;

      const res = await axios.post(
        "http://localhost:3001/api/v1/users/sendMessage",
        {
          content,
          chatId,
          myId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.data;
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Initial State
const initialState = {
  data: [],
  loading: false,
  error: null,
  message: null,
  pagination: null,
};

// Slice
const MessageSlice = createSlice({
  name: "getAllMessageAPI",
  initialState,
  reducers: {
    clearMessages: (state, action) => {
      state.data = undefined;
      state.data = [];
    },
  },
  extraReducers: {
    [getAllMessage.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllMessage.fulfilled]: (state, action) => {
      const newMessage = action.payload.data;

      const newMessageIds = newMessage.map((message) => message._id);

      const filteredData = state.data.filter(
        (message) => !newMessageIds.includes(message._id)
      );

      state.data = [...newMessage, ...filteredData];

      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    [getAllMessage.rejected]: (state, action) => {
      state.loading = false;
      state.error = action;
    },
    [sendMessage.fulfilled]: (state, action) => {
      const newMessage = action.payload.data;
      newMessage.sendByMe = true;
      state.data.push(newMessage);
      state.loading = false;
    },
  },
});

export const { clearMessages } = MessageSlice.actions;

export default MessageSlice.reducer;
