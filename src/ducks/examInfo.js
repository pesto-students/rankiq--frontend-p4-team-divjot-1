import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getExamDetailsFromHtml } from '../utils/commonUtils';

const InitialState = {
  loading: false,
  error: null,
  data: {},
};

export const saveExamData = createAsyncThunk(
  'examInfo/saveExamData',
  async (data) => {
    const examData = await getExamDetailsFromHtml(data.url);
    // logic to add data in db
    return examData;
  }
);

const examInfoSlice = createSlice({
  name: 'examInfo',
  initialState: InitialState,
  reducers: {},
  extraReducers: {
    [saveExamData.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [saveExamData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [saveExamData.rejected]: (state, { error }) => {
      state.loading = false;
      state.data = {};
      state.error = error?.message || error;
    },
  },
});

export default examInfoSlice.reducer;
