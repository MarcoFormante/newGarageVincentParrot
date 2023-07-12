import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:false
}

export const roleReducer = createSlice({
    name: "menuToggle",
    initialState: initialState,
    reducers: {
        toggle: (state,action) => {
            state.value = action.payload
        }
    }
})


export const {toggle} = roleReducer.actions

export default roleReducer.reducer