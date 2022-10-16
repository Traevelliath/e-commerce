import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { CartItems } from './store/cart/cart-types';
import { Category, CategoryItem } from './store/categories/category-types';
import { BUTTON_TYPE_CLASSES } from './components/button/button.component';


export type buttonComponentProps = {
    buttonType?: BUTTON_TYPE_CLASSES,
    isLoading?: boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>

export type SpinnerProps = {
    props?: string
}

export type ShopCategoriesComponentProps = {
    title: string,
    target?: string
}

export type ProductCardComponentProps = {
    product: CategoryItem
}

export type CheckoutItemComponentProps = {
    cartItem: CartItems
}

export type CheckoutHeaderComponentProps = {
    header: string
}

export type CategoryItemContainerProps = {
    category: Category
}

export type CategoryDirectoryComponentProps = {
    categories: Category[]
}

export type FormInputComponentPros = {
    label?: string
} & InputHTMLAttributes<HTMLInputElement>