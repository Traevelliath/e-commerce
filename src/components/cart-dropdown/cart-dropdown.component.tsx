import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { setHideDropdown } from '../../store/cart/cart-action';
import { selectCartItems, selectHideDropdown } from '../../store/cart/cart-selector';
import ButtonComponent from '../button/button.component';
import CartItemComponent from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';


const CartDropdownComponent = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const hideDropdown = useSelector(selectHideDropdown);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
        dispatch((setHideDropdown(!hideDropdown)));
    };

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                { cartItems.map(item => <CartItemComponent key={ item.id } cartItem={ item }/>) }
            </div>
            <ButtonComponent onClick={ goToCheckoutHandler }>Go to Checkout</ButtonComponent>
        </div>
    );
};

export default CartDropdownComponent;