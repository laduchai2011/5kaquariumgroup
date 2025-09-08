import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
import { accountRTK } from './query/accountRTK';
import { productRTK } from './query/productRTK';
import { fishCodeRTK } from './query/fishCodeRTK';
import { orderRTK } from './query/orderRTK';
import globalReducer from '@src/redux/slice/globalSlice';
import productReducer from '@src/redux/slice/productSlice';
import headerLeftReducer from '@src/redux/slice/headerLeftSlice';

export const store = configureStore({
    reducer: {
        globalSlice: globalReducer,
        productSlice: productReducer,
        headerLeftSlice: headerLeftReducer,
        [accountRTK.reducerPath]: accountRTK.reducer,
        [productRTK.reducerPath]: productRTK.reducer,
        [fishCodeRTK.reducerPath]: fishCodeRTK.reducer,
        [orderRTK.reducerPath]: orderRTK.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        accountRTK.middleware,
        productRTK.middleware,
        fishCodeRTK.middleware,
        orderRTK.middleware
    ),
});

// setupListeners(store.dispatch);

// Type hỗ trợ
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
