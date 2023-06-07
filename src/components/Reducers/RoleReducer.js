import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:"",
}

export const roleReducer = createSlice({
    name: "role",
    initialState: initialState,
    reducers: {
        add: (state,action) => {
            state.value = action.payload
        },

        remove: (state) => {
            state.value = ""
        }
    }
})


export const { add, remove } = roleReducer.actions

export default roleReducer.reducer