import './checkout-header.styles.scss';
import { CheckoutHeaderComponentProps } from '../../types';


const CheckoutHeaderComponent = ({ header }: CheckoutHeaderComponentProps) => {
    return (
        <div className='header-block'>
            { header }
        </div>
    );
};

export default CheckoutHeaderComponent;