import { PieChart } from '@mui/x-charts/PieChart'

import dayjs from "dayjs"

type DayProgressChartPropsType = {
    passed: number
    remain: number
    timestamp: number
}

const DayProgressChart = (props: DayProgressChartPropsType) => {
    const date = dayjs.unix(props.timestamp).format('DD.MM.YYYY HH:mm:ss')

    return (
        <>
            <PieChart
                series={ [
                    {
                        data: [
                            { id: 0, value: props.passed, label: 'Passed, %' },
                            { id: 1, value: props.remain, label: 'Remain, %' },
                        ],
                    },
                ] }
                width={ 400 }
                height={ 200 }
            />
            Progress of the day {date}
        </>
    )
}

export default DayProgressChart
