import API_INSTANCE from "."

export const getEventsById = async () => {
    const res = await API_INSTANCE.get("/events/646fbf970ab9c0e58d9a0cf3")
    return res
}

export const updateEventsById = async (data) => {
    const res = await API_INSTANCE.patch("/events/646fbf970ab9c0e58d9a0cf3", data)
    return res
}