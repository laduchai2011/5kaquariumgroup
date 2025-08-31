import { configureStore } from '@reduxjs/toolkit';
import headerReducer from '@src/redux/slice/HeaderSlice';
import { fishCodeRTK } from './query/fishCodeRTK';
import { productRTK } from './query/productRTK';

export const store = configureStore({
    reducer: {
        header: headerReducer,
        [fishCodeRTK.reducerPath]: fishCodeRTK.reducer,
        [productRTK.reducerPath]: productRTK.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        fishCodeRTK.middleware,
        productRTK.middleware
    ),
});

// Type hỗ trợ
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
