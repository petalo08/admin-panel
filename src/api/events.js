import API_INSTANCE from "."

export const getEventsById = async () => {
    const res = await API_INSTANCE.get("/events/64569c686e615869d2c2325b")
    return res
}

export const updateEventsById = async (data) => {
    const res = await API_INSTANCE.patch("/events/64569c686e615869d2c2325b", data)
    return res
}