import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:false
}

export const navReducer = createSlice({
    name: "menuToggle",
    initialState: initialState,
    reducers: {
        toggle: (state,action) => {
            state.value = action.payload
        }
    }
})


export const {toggle} = navReducer.actions

export default navReducer.reducer