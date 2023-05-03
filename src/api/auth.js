import API_INSTANCE from "."

export const signin = async (data) => {
    const res = await API_INSTANCE.post("/auth/signin", data)
    return res
}

export const signup = async (data) => {
    const res = API_INSTANCE.post("/auth/signup", data)
    return res
}

export const signout = async (data) => {
    const res = API_INSTANCE.post("/auth/signout", data)
    return res
}

export const getCurrentUser = async (data) => {
    const res = API_INSTANCE.post("/auth/me", data)
    return res
}