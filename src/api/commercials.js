import API_INSTANCE from "."

export const getCommercialsById = async () => {
    const res = await API_INSTANCE.get("/commercials/646fbd840ab9c0e58d9a0cf1")
    return res
}

export const updateCommercialsById = async (data) => {
    const res = await API_INSTANCE.patch("/commercials/646fbd840ab9c0e58d9a0cf1", data)
    return res
}