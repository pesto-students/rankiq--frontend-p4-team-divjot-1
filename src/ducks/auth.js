import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as Sentry from '@sentry/react';
import { SERVER_BASE_API, USER_API } from '../constants/endpoints';

const accessToken = localStorage.getItem('accessToken')
  ? localStorage.getItem('accessToken')
  : null;

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {};

const initialState = {
  loading: false,
  userInfo,
  accessToken,
  error: null,
  success: false,
};

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (userData) => {
    const res = await fetch(`${SERVER_BASE_API}${USER_API.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const responseData = await res.json();
    if (!res.ok) {
      // create error object and reject if not a 2xx response code
      const err = new Error(responseData?.message);
      err.response = res;
      err.status = res.status;
      Sentry.captureException(err);
      throw err;
    }
    const { accessToken: token, ...dataToLog } = responseData;
    localStorage.setItem('accessToken', responseData.accessToken);
    localStorage.setItem('userInfo', JSON.stringify(dataToLog));
    return responseData;
  }
);

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (userData) => {
    const res = await fetch(`${SERVER_BASE_API}${USER_API.SIGNUP}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const responseData = await res.json();

    if (!res.ok) {
      const { message = '' } = responseData;
      const err = new Error(message || res);
      err.response = res;
      err.status = res.status;
      Sentry.captureException(err);
      throw err;
    }
    return responseData;
  }
);

const authDataSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userInfo');
      const stateToReturn = { ...initialState, accessToken: null };
      return stateToReturn;
    },
  },
  extraReducers: {
    [signInUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signInUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.accessToken = payload.accessToken;
      state.success = true;
    },
    [signInUser.rejected]: (state, { error }) => {
      state.loading = false;
      state.data = {};
      state.error = error?.message || error;
    },
    [signUpUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signUpUser.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [signUpUser.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error?.message || error;
    },
  },
});

export const { logout } = authDataSlice.actions;

export default authDataSlice.reducer;
