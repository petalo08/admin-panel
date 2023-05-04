import API_INSTANCE from "."

export const getGalleryById = async () => {
    const res = await API_INSTANCE.get("/gallery/6452a52641b7ebdb3c2cf464")
    return res
}

export const updateGalleryById = async (data) => {
    const res = await API_INSTANCE.patch("/gallery/6452a52641b7ebdb3c2cf464", data)
    return res
}