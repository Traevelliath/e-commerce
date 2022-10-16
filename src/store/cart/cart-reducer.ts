import { CartState } from './cart-types';
import { AnyAction } from 'redux';
import { addItemToCart, clearItemFromCart, removeItemFromCart, setHideDropdown } from './cart-action';


export const CART_INITIAL_VALUES: CartState = {
    cartItems   : [],
    hideDropdown: true,
};

export const cartReducer = (
    state  = CART_INITIAL_VALUES,
    action: AnyAction
): CartState => {
    if ( setHideDropdown.match(action) ) return { ...state, hideDropdown: action.payload };

    if (    addItemToCart.match(action)
         || removeItemFromCart.match(action)
         || clearItemFromCart.match(action) ) return { ...state, cartItems: action.payload };

    return state;
};