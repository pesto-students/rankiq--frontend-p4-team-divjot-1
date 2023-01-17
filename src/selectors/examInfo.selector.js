import { createSelector } from '@reduxjs/toolkit';
import { get, isEmpty } from 'lodash';

export const examInfoSelector = (state) => get(state, 'examInfo', {});
export const rankDataSelector = (state) => get(state, 'rankData', {});

export const isExamInfoPresentSelector = createSelector(
  examInfoSelector,
  (examInfo) => !isEmpty(examInfo.data)
);

const examDataSelector = createSelector(examInfoSelector, (examInfo) =>
  get(examInfo, 'data', {})
);

export const primaryDetailsSelector = createSelector(examDataSelector, (data) =>
  get(data, 'primaryDetails', {})
);

export const answeKeyUrlSelector = createSelector(examDataSelector, (data) =>
  get(data, 'url', '')
);

export const getUserInitialsSelector = createSelector(
  primaryDetailsSelector,
  (primaryDetails) => {
    const { name = '' } = primaryDetails;
    const nameArr = name.split(' ');
    return nameArr.reduce((acc, curr) => `${acc}${curr[0]}`, '');
  }
);

export const sectionDetailsSelector = createSelector(examDataSelector, (data) =>
  get(data, 'sectionDetails[0]', {})
);
