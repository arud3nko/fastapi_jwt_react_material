import DayProgressChart from "./DayProgressChart.tsx"
import { useAppSelector } from "../../../../redux/hooks.ts"

const DayProgressChartContainer = () => {
    const metricsDayProgress = useAppSelector(state => state.metrics.dayProgress)

    if (!metricsDayProgress) {
        return <i>No data</i>
    }

    return <DayProgressChart
        passed={ metricsDayProgress.passed }
        remain={ metricsDayProgress.remain }
        timestamp={ metricsDayProgress.timestamp }
    />
}

export default DayProgressChartContainer