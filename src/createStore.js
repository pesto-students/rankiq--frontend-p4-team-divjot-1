/* eslint-disable dot-notation */
import { configureStore } from '@reduxjs/toolkit';
import { authReducer, examInfoReducer } from './ducks';

function setupStore() {
  const store = configureStore({
    reducer: { auth: authReducer, examInfo: examInfoReducer },
  });

  return store;
}

const store = setupStore();

export default store;
