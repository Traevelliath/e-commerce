import { useDispatch, useSelector } from 'react-redux';
import { clearItemFromCart } from '../../store/cart/cart-action';
import { selectCartItems } from '../../store/cart/cart-selector';

import './cart-item.styles.scss';
import { CheckoutItemComponentProps } from '../../types';


const CartItemComponent = ({ cartItem }: CheckoutItemComponentProps) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, imageUrl, price, quantity } = cartItem;

    const clearFromCart = () =>
        dispatch(clearItemFromCart(cartItems, cartItem));

    return (
        <div className='cart-item-container'>
            <img src={ imageUrl } alt={ name }/>
            <div className='item-details'>
                <h3 className='name'>{ name }</h3>
                <span className='price'>{ quantity } x ${ price }</span>
            </div>
            <div className='inline-end-section'>
                <div className='remove-button-dropdown' onClick={ clearFromCart }>&#10005;</div>
                <span className='price'>${ price * quantity }</span>
            </div>
        </div>
    );
};

export default CartItemComponent;