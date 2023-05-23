import API_INSTANCE from "."

export const getCommercialsById = async () => {
    const res = await API_INSTANCE.get("/commercials/64569c686e615869d2c2325b")
    return res
}

export const updateCommercialsById = async (data) => {
    const res = await API_INSTANCE.patch("/commercials/64569c686e615869d2c2325b", data)
    return res
}