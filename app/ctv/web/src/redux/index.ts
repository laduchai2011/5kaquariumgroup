import { configureStore } from '@reduxjs/toolkit';
import { accountRTK } from './query/accountRTK';
import appReducer from '@src/redux/slice/appSlice';
import headerLeftReducer from '@src/redux/slice/headerLeftSlice';

export const store = configureStore({
    reducer: {
        appSlice: appReducer,
        headerLeftSlice: headerLeftReducer,
        [accountRTK.reducerPath]: accountRTK.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountRTK.middleware),
});

// Type hỗ trợ
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
