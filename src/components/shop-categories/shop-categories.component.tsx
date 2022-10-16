import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category-selector';

import ProductCardComponent from '../product-card/product-card.component';
import SpinnerComponent from '../spinner/spinner.component';
import { ShopCategoriesComponentProps } from '../../types';

import './shop-categories.styles.scss';


const ShopCategoriesComponent = ({ title, target }: ShopCategoriesComponentProps) => {
    const isLoading     = useSelector(selectCategoriesIsLoading);
    const categoriesMap = useSelector(selectCategoriesMap);
    const navigate      = useNavigate();

    return (
        <section>
            <h2 onClick={ () => navigate(`/shop/${ title }`) }
                className={ `container category-title ${ target }-header` }>{ title }</h2>
            {
                isLoading ?
                <SpinnerComponent/> :
                <div className={ `container products-container ${ target }` }>
                    { categoriesMap[title] &&
                      categoriesMap[title].map(product => (
                          <ProductCardComponent key={ product.id } product={ product }/>)) }
                </div>
            }
        </section>
    );
};

export default ShopCategoriesComponent;