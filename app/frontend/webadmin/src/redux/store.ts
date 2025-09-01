import { configureStore } from '@reduxjs/toolkit';
import headerReducer from '@src/redux/slice/HeaderSlice';
import { fishCodeRTK } from './query/fishCodeRTK';
import { productRTK } from './query/productRTK';
import { orderRTK } from './query/orderRTK';

export const store = configureStore({
    reducer: {
        header: headerReducer,
        [fishCodeRTK.reducerPath]: fishCodeRTK.reducer,
        [productRTK.reducerPath]: productRTK.reducer,
        [orderRTK.reducerPath]: orderRTK.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        fishCodeRTK.middleware,
        productRTK.middleware,
         orderRTK.middleware,
    ),
});

// Type hỗ trợ
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
