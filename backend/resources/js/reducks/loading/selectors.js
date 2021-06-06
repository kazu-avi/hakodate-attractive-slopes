import { createSelector } from 'reselect';

const loadingSelector = (state) => state.loading;

export const getIsBeingLoaded = createSelector([loadingSelector], (state) => state.isBeingLoaded);

export const getLoadingText = createSelector([loadingSelector], (state) => state.text);
