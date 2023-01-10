import { createSelector } from '@reduxjs/toolkit';
import { get, isEmpty } from 'lodash';

export const userHistorySelector = (state) => get(state, 'userHistory', {});

export const isUserHistoryPresentSelector = createSelector(
  userHistorySelector,
  (history) => !isEmpty(history?.data)
);
