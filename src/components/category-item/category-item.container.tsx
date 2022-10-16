import { useNavigate } from 'react-router-dom';

import './category-item.styles.scss';
import { CategoryItemContainerProps } from '../../types';


const CategoryItemContainer = ({ category }: CategoryItemContainerProps) => {
    const navigate = useNavigate();
    const { imageUrl, title } = category;

    return (
        <div className='category-container'
             onClick={ () => navigate(`/shop/${ title }`) }
        >
            <div className='background-image'
                 style={ { backgroundImage: `url(${ imageUrl })` } }/>
            <div className='category-body-container'>
                <h2>{ title }</h2>
                <p>Shop Now</p>
            </div>
        </div>
    );
};

export default CategoryItemContainer;