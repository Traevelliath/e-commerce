import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpStart } from '../../store/user/user-actions';
import { selectError, selectUserReducer } from '../../store/user/user-selector';
import ButtonComponent from '../button/button.component';
import FormInputComponent from '../form-input/form-input.component';

import '../sign-in-form/sign-in-form.styles.scss';
import SpinnerComponent from '../spinner/spinner.component';


const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpFormComponent = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(selectUserReducer);
    const errorCode = useSelector(selectError);
    const [ formFields, setFormFields ] = useState(defaultFormField);
    const [ isSigningUp, setIsSigningUp ] = useState(false);
    const { displayName, email, password, confirmPassword } = formFields;

    const setIsLoading = () => setIsSigningUp(!isSigningUp);

    const resetFormFields = () => setFormFields(defaultFormField);

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if ( password !== confirmPassword ) return alert('passwords are not identical, fix it.');

        setIsLoading();
        dispatch(signUpStart(email, password, displayName));
        setIsLoading();
        resetFormFields();
        alert('You are registered now.');

        if ( errorCode && errorCode === 'auth/email-already-in-use' ) alert('email provided is already in use');
        else console.log(errorCode);

    };

    return (
        <div className='sign-in-container'>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email</span>
            <form onSubmit={ submitHandler }>
                <FormInputComponent
                    label='Display Name'
                    type='text'
                    required
                    name='displayName'
                    onChange={ changeHandler }
                    value={ displayName }/>

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

                <FormInputComponent
                    label='Confirm Password'
                    type='password'
                    required
                    name='confirmPassword'
                    onChange={ changeHandler }
                    value={ confirmPassword }/>
                <ButtonComponent type='submit'>
                    { isLoading && isSigningUp ?
                        <SpinnerComponent props='button inverted'/> :
                        'Submit' }
                </ButtonComponent>
            </form>
        </div>
    );
};

export default SignUpFormComponent;