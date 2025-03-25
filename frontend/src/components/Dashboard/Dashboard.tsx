import Charts from "./Charts/Charts.tsx"

type DashboardProps = {
    username: string
}

const Dashboard = (props: DashboardProps) => {

    return (
        <>
            <h2>Welcome, { props.username }</h2>
            <Charts />
        </>
    )
}

export default Dashboard
