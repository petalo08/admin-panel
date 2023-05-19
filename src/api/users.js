import API_INSTANCE from "."

export const getAllNormalUsers = async () => {
    const res = await API_INSTANCE.get("/dashboard/all/normal")
    return res
}

export const getAllAdminUsers = async () => {
    const res = await API_INSTANCE.get("/dashboard/all/admins")
    return res
}
