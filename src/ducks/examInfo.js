import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getExamDetailsFromHtml } from '../utils/commonUtils';
import { SERVER_BASE_API, EXAM_API } from '../constants/endpoints';

const InitialState = {
  loading: false,
  error: null,
  data: {},
};

export const saveExamData = createAsyncThunk(
  'examInfo/saveExamData',
  async (data) => {
    const {
      examUrl,
      reservation,
      category,
      zone,
      userId,
      saveData = true,
    } = data;
    const examData = await getExamDetailsFromHtml(examUrl);
    const {
      primaryDetails: { rollNumber, name, subject, date, time },
      sectionDetails,
    } = examData;
    if (saveData) {
      const reqObj = {
        rollNumber,
        name,
        subject,
        shift: time,
        date,
        mark: sectionDetails[0]?.sectionMarks,
        caste: category,
        reservation,
        zone,
        url: examUrl,
        userId,
      };

      const res = await fetch(`${SERVER_BASE_API}${EXAM_API.LOG_MARKS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqObj),
      });
      const responseData = await res.json();

      if (!res.ok) {
        const { message = '' } = responseData;
        const err = new Error(message || res);
        err.response = res;
        err.status = res.status;
        throw err;
      }
    }

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
