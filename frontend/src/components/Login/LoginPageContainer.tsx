import LoginPage from "./LoginPage.tsx"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts"
import { authenticateUser } from "../../redux/reducers/auth-reducer.ts"
import { useState } from "react"
import { Snackbar } from "@mui/material"

const LoginPageContainer = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [alertText, setAlertText] = useState<string | undefined>(undefined)

    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    const onCloseAlert = () => {
        setShowAlert(false)
    }

    const handleLogin = async (username: string, password: string) => {
        const resultAction = await dispatch(authenticateUser(
            {
                username: username,
                password: password
            }
        ))

        if (authenticateUser.rejected.match(resultAction)) {
            setAlertText("Something went wrong")
            setShowAlert(true)
        }
    }

    if (isAuth) {
        navigate("/")
    }

    return (
        <>
            <LoginPage onSubmit={ handleLogin }/>
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={ showAlert }
                autoHideDuration={ 2000 }
                onClose={ onCloseAlert }
                message={ alertText }
            />
        </>
    )
}

export default LoginPageContainer
