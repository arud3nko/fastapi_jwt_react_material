import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { metricsAPI, MetricsDayProgressResponseType } from "../../api/metrics.ts"
import { AppDispatch } from "../store.ts"

const initialState = {
    initialized: false,
    dayProgress: null as (MetricsDayProgressResponseType | null),
}

type initialStateType = typeof initialState

const metricsSlice = createSlice({
    name: "metrics",
    initialState: initialState,
    reducers: {
        initMetrics: (state: initialStateType) => {
            state.initialized = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMetricsDayProgress.fulfilled, (state, action) => {
                state.dayProgress = action.payload
            })
    }
})

export const initializeMetrics = () => (dispatch: AppDispatch) => {
    dispatch(getMetricsDayProgress())
        .then(() => dispatch(initMetrics()))

}

export const getMetricsDayProgress = createAsyncThunk(
    'metrics/getMetricsDayProgress',
    async () => {
        return await metricsAPI.getMetricsDayProgress()
    }
)

const { reducer, actions } = metricsSlice

export const { initMetrics } = actions

export default reducer
