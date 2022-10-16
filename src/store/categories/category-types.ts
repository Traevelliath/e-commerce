import { Action, ActionWithPayload } from '../../utils/create-action.utils';


export enum CATEGORIES_ACTION_TYPES {
    FETCH_CATEGORIES_START   = 'category/FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED  = 'category/FETCH_CATEGORIES_FAILED'
}


export type CategoryItem = {
    id: number,
    imageUrl: string,
    name: string,
    price: number
}

export type Category = {
    id: number,
    title: string,
    imageUrl: string,
    items: CategoryItem[]
}

export type CategoriesState = {
    readonly categories: Category[],
    readonly isLoading: boolean,
    readonly error: Error | null,
}

export type CategoryMap = {
    [key: string]: CategoryItem[]
}

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

