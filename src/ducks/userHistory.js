import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import { SERVER_BASE_API, EXAM_API } from '../constants/endpoints';

const InitialState = {
  loading: false,
  error: null,
  data: [],
};

export const getUserHistory = createAsyncThunk(
  'userHistory/getUserHistory',
  async (data) => {
    const { accessToken } = data;

    const res = await fetch(`${SERVER_BASE_API}${EXAM_API.HISTORY}`, {
      method: 'GET',
      headers: {
        'x-access-token': accessToken,
      },
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

const userHistorySlice = createSlice({
  name: 'userHistory',
  initialState: InitialState,
  reducers: {},
  extraReducers: {
    [getUserHistory.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserHistory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [getUserHistory.rejected]: (state, { error }) => {
      state.loading = false;
      state.data = {};
      state.error = error?.message || error;
    },
  },
});

export default userHistorySlice.reducer;
