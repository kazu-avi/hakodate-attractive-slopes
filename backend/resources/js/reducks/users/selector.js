import { createSelector } from 'reselect';

// state(users)を受け取る
const userSelector = (state) => state.users;

export const getUserId = createSelector([userSelector], (state) => state.uid);

export const getUsername = createSelector([userSelector], (state) => state.username);

export const getIsSignedIn = createSelector([userSelector], (state) => state.isSignedIn);

export const getUserImage = createSelector([userSelector], (state) => state.img);
