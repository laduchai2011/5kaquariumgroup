import { createSlice } from '@reduxjs/toolkit';
import type { global_state } from '@src/screen/Header/type';
import { select_options } from '@src/screen/Header/type';

const initialState: global_state = {
    selected: select_options.HOME,
};

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setSelected: (state, action) => {
            state.selected = action.payload;
        },
    },
});

export const { setSelected } = headerSlice.actions;
export default headerSlice.reducer;
