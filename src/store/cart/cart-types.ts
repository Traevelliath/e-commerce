import { ActionWithPayload } from '../../utils/create-action.utils';
import { CategoryItem } from '../categories/category-types';


export enum CART_ACTION_TYPES {
    SET_HIDE_DROPDOWN = 'cart/SET_HIDE_DROPDOWN',
    SET_CART_ITEMS    = 'cart/SET_CART_ITEMS',
}

export type CartItems = CategoryItem & {
    quantity: number,
}

export type CartState = {
    readonly cartItems: CartItems[],
    readonly hideDropdown: boolean,
}

export type SetHideDropdown = ActionWithPayload<CART_ACTION_TYPES.SET_HIDE_DROPDOWN, boolean>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItems[]>