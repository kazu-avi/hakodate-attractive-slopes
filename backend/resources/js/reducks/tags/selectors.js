import { createSelector } from 'reselect';
const TagSelector = (state) => state.tags;

export const getTagsList = createSelector([TagSelector], (state) => state.list);
