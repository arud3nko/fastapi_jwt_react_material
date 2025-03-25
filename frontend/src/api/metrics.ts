import {instance} from "./api.ts"

export type MetricsDayProgressResponseType = {
    passed: number
    remain: number
    timestamp: number
}


export const metricsAPI = {
    async getMetricsDayProgress() {
        const res = await instance.get<MetricsDayProgressResponseType>(`metrics/day/progress`)
        return res.data
    }
}