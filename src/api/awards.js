import API_INSTANCE from "."

export const getAwardsById = async () => {
    const res = await API_INSTANCE.get("/awards/646fbfb60ab9c0e58d9a0cf5")
    return res
}

export const updateAwardsById = async (data) => {
    const res = await API_INSTANCE.patch("/awards/646fbfb60ab9c0e58d9a0cf5", data)
    return res
}