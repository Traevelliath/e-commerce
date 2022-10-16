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
    // @ts-ignore
    const type= BUTTON_TYPE_CLASSES[buttonType]
    return <button disabled={ isLoading }
                   className={ `button-container ${ type }` }
                   { ...otherProps }>
        { isLoading ?
          <SpinnerComponent props='button'/> :
          children }
    </button>;
};

export default ButtonComponent;