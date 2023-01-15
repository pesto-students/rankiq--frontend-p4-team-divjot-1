import { createSelector } from '@reduxjs/toolkit';
import { get } from 'lodash';

export const authDataSelector = (state) => get(state, 'auth', {});

export const accessTokenSelector = createSelector(
  authDataSelector,
  (authData) => get(authData, 'accessToken', null)
);

export const userNameSelector = createSelector(authDataSelector, (authData) =>
  get(authData, 'userInfo.firstName', '')
);

export const userEmailSelector = createSelector(authDataSelector, (authData) =>
  get(authData, 'userInfo.email', '')
);
