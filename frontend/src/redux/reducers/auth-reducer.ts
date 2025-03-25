import axios from "axios"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { authAPI, loginRequestDataType } from "../../api/auth.ts"


const initialState = {
    id: null as number | null,
    username: null as string | null,
    isAuth: null as boolean | null,
    isLoading: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAuthUserData.fulfilled, (_, action) => {
                return { ...action.payload, isLoading: false, isAuth: true }
            })
            .addCase(authenticateUser.fulfilled, (state) => {
                state.isAuth = true
            })
    }
})

export const getAuthUserData = createAsyncThunk(
    'auth/getAuthUserData',
    async () => {
        return await authAPI.me()
    }
)

export const authenticateUser = createAsyncThunk(
    'auth/authenticateUser',
    async (userData: loginRequestDataType, thunkAPI) => {
        try {
            const response = await authAPI.login(userData)
            await thunkAPI.dispatch(getAuthUserData()).unwrap()
            return response
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue("Something went wrong")
            }
            return thunkAPI.rejectWithValue("Cannot connect to the server")
        }

    }
)

const { reducer } = authSlice

export default reducer
