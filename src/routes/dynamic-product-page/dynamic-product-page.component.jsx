import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ShopCategoriesComponent from '../../components/shop-categories/shop-categories.component';
import { fetchCategoriesStart } from '../../store/categories/category-action';


const DynamicProductPageComponent = () => {
    const dispatch = useDispatch();
    const { category } = useParams();
    const target = 'category';

    useEffect(() => {
        dispatch(fetchCategoriesStart());
    }, [dispatch]);

    return (
        <div>
            <ShopCategoriesComponent title={ category } target={ target }/>
        </div>
    );
};

export default DynamicProductPageComponent;