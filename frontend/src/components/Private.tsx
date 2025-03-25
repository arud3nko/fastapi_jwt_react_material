import { Outlet, Navigate, useNavigate } from 'react-router-dom'

import { useAppSelector } from "../redux/hooks.ts"
import { useEffect } from "react"

export const Private = () => {
    const navigate = useNavigate()

    const isAuthenticated = useAppSelector(state => state.auth.isAuth)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", { replace: true })
        }
    }, [isAuthenticated, navigate])


    return isAuthenticated ?
        <Outlet />
        :
        <Navigate
            to="/login"
            replace
        />
}
