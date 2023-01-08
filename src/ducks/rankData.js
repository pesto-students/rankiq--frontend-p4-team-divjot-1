import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_BASE_API, EXAM_API } from '../constants/endpoints';

const InitialState = {
  loading: false,
  error: null,
  data: {},
};

export const getStudentRank = createAsyncThunk(
  'rankData/getStudentRank',
  async (data) => {
    const { rollNumber } = data;

    const res = await fetch(`${SERVER_BASE_API}${EXAM_API.RANK}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rollNumber }),
    });
    const responseData = await res.json();

    if (!res.ok) {
      const { message = '' } = responseData;
      const err = new Error(message || res);
      err.response = res;
      err.status = res.status;
      throw err;
    }
    return responseData;
  }
);

const rankDataSlice = createSlice({
  name: 'rankData',
  initialState: InitialState,
  reducers: {
    resetRankData() {
      return InitialState;
    },
  },
  extraReducers: {
    [getStudentRank.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getStudentRank.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [getStudentRank.rejected]: (state, { error }) => {
      state.loading = false;
      state.data = {};
      state.error = error?.message || error;
    },
  },
});

export const { resetRankData } = rankDataSlice.actions;

export default rankDataSlice.reducer;
