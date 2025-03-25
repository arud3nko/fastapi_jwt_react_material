import { createSlice } from "@reduxjs/toolkit"

import { AppDispatch } from "../store.ts"
import { getAuthUserData } from "./auth-reducer.ts"

const initialState = {
    initialized: false
}

export type initialStateType = typeof initialState

const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        initApp: (state: initialStateType) => {
            state.initialized = true
        }
    }
})

export const initializeApp = () => (dispatch: AppDispatch) => {
    dispatch(getAuthUserData())
        .then(() => dispatch(initApp()))

}

const { actions, reducer } = appSlice

export const { initApp } = actions

export default reducer