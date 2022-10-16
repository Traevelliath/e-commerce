import { UserState } from './user-types';
import { AnyAction } from 'redux';
import {
    emailSignInStart,
    googleSignInStart,
    signInFailed,
    signInSuccess,
    signOutStart,
    signUpFailed,
    signUpStart
} from './user-actions';


const INITIAL_VALUE: UserState = {
    currentUser: null,
    isLoading  : false,
    error      : null
};

export const userReducer = (
    state = INITIAL_VALUE,
    action: AnyAction
): UserState => {
    if (
        emailSignInStart.match(action) ||
        signUpStart.match(action)      ||
        googleSignInStart.match(action)
    )
        return {
            ...state,
            isLoading: true,
        };

    if ( signInSuccess.match(action) )
        return {
            ...state,
            error      : null,
            currentUser: action.payload,
            isLoading  : false,
        };

    if (
        signInFailed.match(action) ||
        signUpFailed.match(action)
    )
        return {
            ...state,
            error    : action.payload,
            isLoading: false,
        };

    if ( signOutStart.match(action) )
        return {
            ...INITIAL_VALUE
        };

    return state;
};