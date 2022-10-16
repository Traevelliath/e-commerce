import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartCost } from '../../store/cart/cart-selector';
import { selectUser } from '../../store/user/user-selector';
import ButtonComponent, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import './payment-form.styles.scss';


const PaymentFormComponent = () => {
    const stripe                                          = useStripe();
    const elements                                        = useElements();
    const amount                                          = useSelector(selectCartCost) * 100;
    const user                                            = useSelector(selectUser);
    const [ isProcessingPayment, setIsProcessingPayment ] = useState(false);


    const paymentHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if ( !stripe || !elements ) return;

        setIsProcessingPayment(true);

        const response = await fetch('../.netlify/functions/create-payment-intent', {
            method : 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body   : JSON.stringify({ amount })
        }).then(res => res.json());

        const { paymentIntent: { client_secret } } = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card           : elements.getElement(CardElement)!,
                billing_details: {
                    name: user?.displayName || 'Guest'
                }
            }
        });

        setIsProcessingPayment(false);

        if ( paymentResult.error ) alert(paymentResult.error);
        if ( paymentResult.paymentIntent?.status === 'succeeded' ) alert('Payment successful');
    };

    return (
        <div className='payment-form'>
            <div className='card-element'>
                <CardElement/>
                <ButtonComponent
                    buttonType={ BUTTON_TYPE_CLASSES.inverted }
                    isLoading={ isProcessingPayment }
                    onClick={ paymentHandler }>
                    Pay now
                </ButtonComponent>
            </div>
        </div>
    );
};

export default PaymentFormComponent;