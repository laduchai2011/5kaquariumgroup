import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalState } from './globalState';
import { MessageDataInterface } from "@src/component/MessageDialog/type"


const initialState: GlobalState = {
    isLoading: false,
    message: {
        message: '',
        type: 'normal'
    } 
};

const headerLeftSlice = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: {
        set_isLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        set_message: (state, action: PayloadAction<MessageDataInterface>) => {
            state.message = action.payload;
        },
    },
});

export const { set_isLoading, set_message } = headerLeftSlice.actions;
export default headerLeftSlice.reducer;
