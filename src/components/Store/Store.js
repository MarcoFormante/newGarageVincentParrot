import { configureStore } from '@reduxjs/toolkit'
import RoleReducer from '../Reducers/RoleReducer'
import MenuToggleReducer from '../Reducers/MenuToggleReducer'

export const store = configureStore({
    reducer: {
        role: RoleReducer,
        menuToggle: MenuToggleReducer
    },
})