import SpinnerComponent from '../spinner/spinner.component';
import './button.styles.scss';
import { buttonComponentProps } from '../../types';
import { FC } from 'react';


export enum BUTTON_TYPE_CLASSES {
    google   = 'google-sign-in',
    inverted = 'inverted'
}


const ButtonComponent: FC<buttonComponentProps> = ({
                                                       children,
                                                       buttonType,
                                                       isLoading,
                                                       ...otherProps
}) => {
    return <button disabled={ isLoading }
                   className={ `button-container ${ buttonType }` }
                   { ...otherProps }>
        { isLoading ?
          <SpinnerComponent props='button'/> :
          children }
    </button>;
};

export default ButtonComponent;