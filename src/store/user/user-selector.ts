import { createSelector } from 'reselect';
import { UserState } from './user-types';
import { RootState } from '../store';


export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectUser = createSelector(
    [ selectUserReducer ],
    userData => userData.currentUser
);

export const selectError = createSelector(
    [ selectUserReducer ],
    userData => userData.error?.code
);