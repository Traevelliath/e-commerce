import { createAction, withMatcher } from '../../utils/create-action.utils';
import { CART_ACTION_TYPES, CartItems, SetCartItems, SetHideDropdown } from './cart-types';
import { CategoryItem } from '../categories/category-types';


const addCartItem = (cartItems = [] as CartItems[], productToAdd: CategoryItem): CartItems[] => {
    const doesExist = cartItems.find(item => item.id === productToAdd.id);

    if ( doesExist ) return cartItems.map(item => {
        return item.id === productToAdd.id ?
               { ...item, quantity: item.quantity + 1 } :
               item;
    });

    return [ ...cartItems, { ...productToAdd, quantity: 1 } ];
};

const removeCartItem = (cartItems = [] as CartItems[], productToRemove: CartItems): CartItems[] => {
    const doesExist = cartItems.find(item => item.id === productToRemove.id);

    if ( doesExist?.quantity === 1 )
        return cartItems.filter(item => !(item.id === productToRemove.id));

    if ( doesExist ) return cartItems.map(item => {
        return item.id === productToRemove.id ?
               { ...item, quantity: item.quantity - 1 } :
               item;
    });

    return cartItems;
};


const clearCartItem = (cartItems = [] as CartItems[], productToClear: CartItems) => {
    return cartItems.filter(item => !(item.id === productToClear.id));
};


export const setHideDropdown = withMatcher((bool: boolean): SetHideDropdown =>
    createAction(CART_ACTION_TYPES.SET_HIDE_DROPDOWN, bool));

export const addItemToCart = withMatcher((
    cartItems: CartItems[],
    productToAdd: CategoryItem
): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, addCartItem(cartItems, productToAdd)));

export const removeItemFromCart = withMatcher((
    cartItems: CartItems[],
    productToRemove: CartItems
): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, removeCartItem(cartItems, productToRemove)));

export const clearItemFromCart = withMatcher((
    cartItems: CartItems[],
    productToClear: CartItems
): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, clearCartItem(cartItems, productToClear)));