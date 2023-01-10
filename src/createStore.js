/* eslint-disable dot-notation */
import { configureStore } from '@reduxjs/toolkit';
import {
  authReducer,
  examInfoReducer,
  rankDataReducer,
  userHistoryReducer,
} from './ducks';

function setupStore() {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      examInfo: examInfoReducer,
      rankData: rankDataReducer,
      userHistory: userHistoryReducer,
    },
  });

  return store;
}

const store = setupStore();

export default store;
