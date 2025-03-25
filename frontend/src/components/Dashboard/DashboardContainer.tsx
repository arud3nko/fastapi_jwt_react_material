import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts"
import Dashboard from "./Dashboard.tsx"
import { useEffect } from "react"
import { initializeMetrics } from "../../redux/reducers/metrics-reducer.ts"

const DashboardContainer = () => {
    const username = useAppSelector(state => state.auth.username)
    const initialized = useAppSelector(state => state.metrics.initialized)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeMetrics())
    }, [])

    if (!initialized) {
        return <>Loading...</>
    }

    return <Dashboard
        username={username ?? "Unknown"}
    />
}

export default DashboardContainer
