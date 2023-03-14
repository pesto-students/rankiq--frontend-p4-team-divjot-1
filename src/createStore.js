/* eslint-disable dot-notation */
import { configureStore } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import {
  authReducer,
  examInfoReducer,
  rankDataReducer,
  userHistoryReducer,
} from './ducks';

function setupStore() {
  const sentryReduxEnhancer = Sentry.createReduxEnhancer({});
  const store = configureStore({
    reducer: {
      auth: authReducer,
      examInfo: examInfoReducer,
      rankData: rankDataReducer,
      userHistory: userHistoryReducer,
    },
    enhancers: [sentryReduxEnhancer],
  });

  return store;
}

const store = setupStore();

export default store;
