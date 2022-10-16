import './form-input.styles.scss';
import { FormInputComponentPros } from '../../types';
import { FC } from 'react';


const FormInputComponent: FC<FormInputComponentPros>  = ({ label, ...otherProps }) => {
    return (
        <div className='group'>
            <input className='form-input' { ...otherProps } />
            { label && (
                <label className={ `${
                    typeof otherProps.value === 'string' && otherProps.value?.length && 'shrink'
                } form-input-label` }>
                    { label }
                </label>
            ) }
        </div>
    );
};

export default FormInputComponent;