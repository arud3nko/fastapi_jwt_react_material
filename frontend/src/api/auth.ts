import {instance} from "./api.ts"

type MeResponseDataType = {
    id: number
    username: string
}

export type loginRequestDataType = {
    username: string
    password: string
}

type LoginResponseDataType = {
    access_token: string
    token_type: string
}

export const authAPI = {
    async me() {
        const res = await instance.get<MeResponseDataType>(`auth/me`)
        return res.data
    },

    async login(userData: loginRequestDataType) {
        const formData = new FormData()
        formData.append("username", userData.username)
        formData.append("password", userData.password)

        const res = await instance.post<LoginResponseDataType>(`auth/login`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        localStorage.setItem("accessToken", res.data.access_token)
    },
}