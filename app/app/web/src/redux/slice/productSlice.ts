import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductReduxState } from './productReduxState';

const initialState: ProductReduxState = {
    currentProductId: -1
};

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        set_currentProductId: (state, action: PayloadAction<number>) => {
            state.currentProductId = action.payload;
        },
    },
});

export const { set_currentProductId } = productSlice.actions;
export default productSlice.reducer;
