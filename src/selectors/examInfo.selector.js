import { createSelector } from '@reduxjs/toolkit';
import { get, isEmpty } from 'lodash';

export const examInfoSelector = (state) => get(state, 'examInfo', {});

export const isExamInfoPresentSelector = createSelector(
  examInfoSelector,
  (examInfo) => !isEmpty(examInfo.data)
);
