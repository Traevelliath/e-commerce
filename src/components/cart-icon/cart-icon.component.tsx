import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { setHideDropdown } from '../../store/cart/cart-action';
import { selectCartCount, selectHideDropdown } from '../../store/cart/cart-selector';

import './cart-icon.styles.scss';


const CartIconComponent = () => {
    const dispatch = useDispatch();
    const hideDropdown = useSelector(selectHideDropdown);
    const cartTotalCount = useSelector(selectCartCount);

    const setDropdown = () => dispatch(setHideDropdown(!hideDropdown));

    return (
        <div className='cart-icon-container' onClick={ setDropdown }>
            <ShoppingIcon className='shopping-icon'></ShoppingIcon>
            <span className='item-count'>{ cartTotalCount }</span>
        </div>
    );
};

export default CartIconComponent;