import { all, call, put, takeLatest } from 'typed-redux-saga/macro';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signOutUser
} from '../../utils/firebase/firebase.utils';
import { signInFailed, signInSuccess, signUpFailed, signUpSuccess } from './user-actions';
import { EmailSignInStart, SignUpStart, SignUpSuccess, USER_ACTION_TYPES } from './user-types';
import { User, AuthError } from 'firebase/auth';
import { AdditionalData } from '../../utils/firebase/fb-types';


export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalData) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);
        if ( userSnapshot ) yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield* put(signInFailed(error as AuthError));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as AuthError));
    }
}

export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
    try {
        const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);
        if ( userCredential ) {
            const { user } = userCredential;
            yield* call(getSnapshotFromUserAuth, user);
        }
    } catch (error) {
        yield* put(signInFailed(error as AuthError));
    }
}

export function* signOut() {
    yield* call(signOutUser);
}

export function* signUp({ payload: { email, password, displayName } }: SignUpStart) {
    try {
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
        if ( userCredential ) {
            const { user } = userCredential;
            yield* put(signUpSuccess(user, { displayName }));
        }
    } catch (error) {
        yield* put(signUpFailed(error as AuthError));
    }
}

export function* LogInAfterSigningUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
    try {
        yield* call(getSnapshotFromUserAuth, user, additionalDetails);
    } catch (error) {
        yield* put(signInFailed(error as AuthError));
    }
}

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, LogInAfterSigningUp);
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT, signOut);
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SING_IN_START, signInWithEmail);
}

export function* onSignInWithGoogleStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if ( !userAuth ) return;
        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFailed(error as AuthError));
    }
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSaga() {
    yield* all([
        call(onCheckUserSession),
        call(onSignInWithGoogleStart),
        call(onEmailSignInStart),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}