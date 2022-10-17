
import { Action, ActionWithPayload } from '../../utils/create-action.utils';
import { AdditionalData, SignUpData, UserData } from '../../utils/firebase/fb-types';
import { User, AuthError } from 'firebase/auth';

declare global {
    interface Error {
        code: string
    }
}

export enum USER_ACTION_TYPES {
    // SET_CURRENT_USER     = 'user/SET_CURRENT_USER',
    CHECK_USER_SESSION   = 'user/CHECK_USER_SESSION',
    GOOGLE_SIGN_IN_START = 'user/GOOGLE_SIGN_IN_START',
    EMAIL_SING_IN_START  = 'user/EMAIL_SIGN_IN_START',
    SIGN_IN_SUCCESS      = 'user/SIGN_IN_SUCCESS',
    SIGN_IN_FAILED       = 'user/SIGN_IN_FAILED',
    SIGN_UP_START        = 'user/SIGN_UP_START',
    SIGN_UP_SUCCESS      = 'user/SIGN_UP_SUCCESS',
    SIGN_UP_FAILED       = 'user/SIGN_UP_FAILED',
    SIGN_OUT             = 'user/SIGN_OUT',
}

export type UserState = {
    readonly currentUser: UserData | null,
    readonly isLoading: boolean,
    readonly error: AuthError | null,
}

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>

export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SING_IN_START,
    { email: string, password: string }>

export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS,
    UserData>

export type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED,
    AuthError>

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT>

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START,
    SignUpData>

export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS,
    { user: User, additionalDetails: AdditionalData }>

export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED,
    AuthError>