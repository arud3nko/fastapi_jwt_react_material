import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./reducers/auth-reducer.ts"
import appReducer from "./reducers/app-reducer.ts"
import metricsReducer from "./reducers/metrics-reducer.ts"


export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        metrics: metricsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
