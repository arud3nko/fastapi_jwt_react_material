import './App.css'
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./components/Login/LoginPageContainer.tsx"
import { useAppDispatch, useAppSelector } from "./redux/hooks.ts"
import { useEffect } from "react"
import { initializeApp } from "./redux/reducers/app-reducer.ts"
import { Private } from "./components/Private.tsx"
import Dashboard from "./components/Dashboard/DashboardContainer.tsx"
import { CircularProgress } from "@mui/material"

type AppPropsType = {
    initialized: boolean
}


function App(props: AppPropsType) {
    if (!props.initialized) {
        return <CircularProgress/>
    }

    return (
        <Routes>
            <Route path="login" element={ <LoginPage /> }></Route>
            <Route element={ <Private/> }>
                <Route index element={ <Dashboard/> }></Route>
            </Route>
        </Routes>
    )
}


const AppContainer = () => {
    const dispatch = useAppDispatch()

    const initialized = useAppSelector(state => state.app.initialized)

    useEffect(() => {
        setTimeout(
            () => dispatch(initializeApp()),
            750
        )
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <App initialized={ initialized }/>
    )
}

const UserInterfaceApp = () => {
    return (
        <BrowserRouter>
            <Provider store={ store }>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default UserInterfaceApp
