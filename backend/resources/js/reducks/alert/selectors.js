import { createSelector } from 'reselect';

const alertSelector = (state) => state.alert;

export const getDisplayAlert = createSelector([alertSelector], (state) => state.displayAlert);

export const getDisplayMessage = createSelector([alertSelector], (state) => state.displayMessage);

export const getAlertText = createSelector([alertSelector], (state) => state.text);
