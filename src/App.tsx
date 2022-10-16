import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthenticationComponent from './routes/authentication/authentication.component';
import CheckoutComponent from './routes/checkout/checkout.component';
import DynamicProductPageComponent from './routes/dynamic-product-page/dynamic-product-page.component';
import Home from './routes/home/home.component';
import NavigationComponent from './routes/navigation/navigation.component';
import ShopComponent from './routes/shop/shop.component';
import { checkUserSession } from './store/user/user-actions';


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch]);

    return (
        <Routes>
            <Route path='/' element={ <NavigationComponent/> }>
                <Route index element={ <Home/> }/>
                <Route path='shop' element={ <ShopComponent/> }/>
                <Route path='auth' element={ <AuthenticationComponent/> }/>
                <Route path='checkout' element={ <CheckoutComponent/> }/>
                <Route path='shop/:category' element={ <DynamicProductPageComponent/> }/>
            </Route>
        </Routes>
    );
};

export default App;
