import './spinner.styles.scss';
import { SpinnerProps } from '../../types';


const SpinnerComponent = ({ props }: SpinnerProps) =>
    <div className='spinner-overlay'>
        <div className={ props || 'spinner' }></div>
    </div>;

export default SpinnerComponent;