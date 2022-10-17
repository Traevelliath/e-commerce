import { createAction, withMatcher } from '../../utils/create-action.utils';
import {
    CheckUserSession,
    EmailSignInStart,
    GoogleSignInStart,
    SignInFailed,
    SignInSuccess,
    SignOutStart,
    SignUpFailed,
    SignUpStart,
    SignUpSuccess,
    USER_ACTION_TYPES,
} from './user-types';
import { AdditionalData, UserData } from '../../utils/firebase/fb-types';
import { User } from 'firebase/auth';
import firebase from 'firebase/compat';
import AuthError = firebase.auth.AuthError;

/*
export const setCurrentUser = user =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
 */

export const checkUserSession = withMatcher((): CheckUserSession =>
    createAction(USER_ACTION_TYPES.CHECK_USER_SESSION));

export const googleSignInStart = withMatcher((): GoogleSignInStart =>
    createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START));

export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart =>
    createAction(USER_ACTION_TYPES.EMAIL_SING_IN_START, { email, password }));

export const signInSuccess = withMatcher((user: UserData & { id: string }): SignInSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user));

export const signInFailed = withMatcher((error: AuthError): SignInFailed =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error));

export const signOutStart = withMatcher((): SignOutStart =>
    createAction(USER_ACTION_TYPES.SIGN_OUT));

export const signUpStart = withMatcher((
    email: string,
    password: string,
    displayName: string
): SignUpStart =>
    createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName }));

export const signUpSuccess = withMatcher((user: User, additionalDetails: AdditionalData): SignUpSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails }));

export const signUpFailed = withMatcher((error: AuthError): SignUpFailed =>
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error));