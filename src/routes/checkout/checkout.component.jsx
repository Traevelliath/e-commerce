import { useSelector } from 'react-redux';

import CheckoutHeaderComponent from '../../components/checkout-header/checkout-header.component';
import CheckoutItemComponent from '../../components/checkout-item/checkout-item.component';
import PaymentFormComponent from '../../components/payment-form/payment-form.component';
import { selectCartCost, selectCartItems } from '../../store/cart/cart-selector';

import './checkout.styles.scss';


const checkoutHeaders = [
    'product',
    '|description',
    '|quantity',
    '|price',
    '|remove'
];

const CheckoutComponent = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotalCost = useSelector(selectCartCost);

    return (
        <section className='checkout-container'>
            <div className='checkout-header'>
                { checkoutHeaders.map(header => <CheckoutHeaderComponent
                    key={ checkoutHeaders.indexOf(header) }
                    header={ header }
                />) }
            </div>
            <div className='checkout-body'>
                {
                    !(cartItems.length === 0) ?
                        cartItems.map(item => <CheckoutItemComponent key={ item.id } cartItem={ item }/>) :
                        <div className='empty-cart-header'>
                            Cart is empty...
                        </div>
                }
            </div>
            <span className='total'>Total Cost: ${ cartTotalCost }</span>
            <PaymentFormComponent/>
        </section>
    );
};

export default CheckoutComponent;