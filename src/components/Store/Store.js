import { configureStore } from '@reduxjs/toolkit'
import RoleReducer from '../Reducers/RoleReducer'

export const store = configureStore({
    reducer: {
        role:RoleReducer
    },
})