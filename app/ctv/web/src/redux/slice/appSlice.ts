import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@src/App/type';

const initialState: AppState = {
    id: 0,
    isSignin: false,
    isLoading: false
};

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        set_id: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        set_isSignin: (state, action: PayloadAction<boolean>) => {
            state.isSignin = action.payload;
        },
        set_isLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { set_id, set_isSignin, set_isLoading } = appSlice.actions;
export default appSlice.reducer;
