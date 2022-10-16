import CategoryItemContainer from '../category-item/category-item.container';

import './category-directory.styles.scss';
import { CategoryDirectoryComponentProps } from '../../types';


const CategoryDirectoryComponent = ({ categories }: CategoryDirectoryComponentProps) => {
    return <section className='section'>
        <div className='container'>
            <div className='categories-container'>
                { categories.map(category => <CategoryItemContainer key={ category.id } category={ category }/>) }
            </div>
        </div>
    </section>;
};

export default CategoryDirectoryComponent;