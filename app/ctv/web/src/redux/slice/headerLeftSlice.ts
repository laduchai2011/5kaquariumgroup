import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeaderLeftState, HeaderSelections, HeaderSelected } from '@src/component/Header/HeaderLeft/type';


const initialState: HeaderLeftState = {
    isShow: true,
    headerSelected: HeaderSelections.HOME
};

const headerLeftSlice = createSlice({
    name: 'headerLeftSlice',
    initialState,
    reducers: {
        set_isShow: (state, action: PayloadAction<boolean>) => {
            state.isShow = action.payload;
        },
        set_headerSelected: (state, action: PayloadAction<HeaderSelected>) => {
            state.headerSelected = action.payload;
        },
    },
});

export const { set_isShow, set_headerSelected } = headerLeftSlice.actions;
export default headerLeftSlice.reducer;
