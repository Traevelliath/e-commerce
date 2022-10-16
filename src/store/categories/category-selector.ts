import { createSelector } from 'reselect';
import { CategoriesState, CategoryMap } from './category-types';
import { RootState } from '../store';


const selectCategoriesReducer = (state: RootState): CategoriesState => state.categories;

export const selectCategoriesMap = createSelector(
    [ selectCategoriesReducer ],
    (categories): CategoryMap => categories.categories.reduce((acc, docSnapshot) => {
        const { title, items }   = docSnapshot;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
    [ selectCategoriesReducer ],
    categoriesSlice => categoriesSlice.isLoading
);