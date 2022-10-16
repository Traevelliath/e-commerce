import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/user/user-actions';
import { selectError, selectUserReducer } from '../../store/user/user-selector';
import ButtonComponent, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInputComponent from '../form-input/form-input.component';
import SpinnerComponent from '../spinner/spinner.component';

import './sign-in-form.styles.scss';


const defaultFormField = {
    email   : '',
    password: '',
};

const SignInFormComponent = () => {
    const dispatch                        = useDispatch();
    const { isLoading }                   = useSelector(selectUserReducer);
    const errorCode                       = useSelector(selectError);
    const [ isSigningIn, setIsSigningIn ] = useState(false);
    const [ formFields, setFormFields ]   = useState(defaultFormField);
    const { email, password }             = formFields;

    const setIsLoading = () => setIsSigningIn(!isSigningIn);

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const signInWithGoogle = () => dispatch(googleSignInStart());

    const resetFormFields = () => setFormFields(defaultFormField);

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading();
        dispatch(emailSignInStart(email, password));
        setIsLoading();
        resetFormFields();

        switch (errorCode) {
            case 'auth/user-not-found':
                alert('User not found');
                break;
            case 'auth/wrong-password':
                alert('email and/or password are incorrect');
                break;
            default:
                console.log(errorCode);
                return;
        }
    };

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email</span>
            <form onSubmit={ submitHandler }>
                <FormInputComponent
                    label='Email'
                    type='email'
                    required
                    name='email'
                    onChange={ changeHandler }
                    value={ email }/>

                <FormInputComponent
                    label='Password'
                    type='password'
                    required
                    name='password'
                    onChange={ changeHandler }
                    value={ password }/>
                <div className='buttons-container'>
                    <ButtonComponent type='submit'>
                        { isLoading && isSigningIn ?
                          <SpinnerComponent props='button inverted'/> :
                          'Sign In' }
                    </ButtonComponent>
                    <ButtonComponent
                        type='button'
                        buttonType={ BUTTON_TYPE_CLASSES.google }
                        onClick={ signInWithGoogle }>
                        Google Sign In
                    </ButtonComponent>
                </div>
            </form>
        </div>
    );
};

export default SignInFormComponent;