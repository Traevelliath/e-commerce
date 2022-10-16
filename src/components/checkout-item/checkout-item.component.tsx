import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart-action';
import { selectCartItems } from '../../store/cart/cart-selector';

import './checkout-item.styles.scss';
import { CheckoutItemComponentProps } from '../../types';


const CheckoutItemComponent = ({ cartItem }: CheckoutItemComponentProps) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, price, imageUrl, quantity } = cartItem;

    const clearFromCart = () =>
        dispatch((clearItemFromCart(cartItems, cartItem)));

    const addItem = () =>
        dispatch((addItemToCart(cartItems, cartItem)));
    const removeItem = () =>
        dispatch((removeItemFromCart(cartItems, cartItem)));

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={ imageUrl } alt={ name }/>
            </div>
            <span className='name'>{ name }</span>
            <div className='quantity'>
                <span className='arrow' onClick={ removeItem }>&#10094;</span>
                <span className='value'>{ quantity }</span>
                <span className='arrow' onClick={ addItem }>&#10095;</span>
            </div>
            <span className='price'>${ price }</span>
            <div className='remove-button' onClick={ clearFromCart }>&#10005;</div>
        </div>
    );
};

export default CheckoutItemComponent;