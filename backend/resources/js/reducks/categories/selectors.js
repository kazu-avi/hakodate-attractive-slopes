import { createSelector } from 'reselect';

const CategorySelector = (state) => state.categories;

export const getCategoriesList = createSelector([CategorySelector], (state) => state.list);
