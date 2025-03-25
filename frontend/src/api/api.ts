import axios from "axios"

export const instance = axios.create({
    withCredentials: true,
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_VERSION}/`,
})


instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
        config.headers["Authorization"] = "Bearer " + accessToken
    }
    return config
}, (error) => {
    return Promise.reject(error)
});


export type APIResponseType<D = object> = {
    data: D
    messages: Array<string>
}