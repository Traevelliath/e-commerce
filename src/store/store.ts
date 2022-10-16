import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root-reducer';

import { rootSaga } from './root-saga';
import { PersistConfig } from 'redux-persist/es/types';


export type RootState = ReturnType<typeof rootReducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
    key      : 'root',
    storage,
    whitelist: [ 'cart' ]
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = (process.env.NOVE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
                        || compose;

const middlewares = [ process.env.NODE_ENV !== 'production' && logger, sagaMiddleware ]
    .filter((middleware): middleware is Middleware => Boolean(middleware));

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, composedEnhancers);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
