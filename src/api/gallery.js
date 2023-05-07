import API_INSTANCE from "."

export const getGalleryById = async () => {
    const res = await API_INSTANCE.get("/gallery/64569c686e615869d2c2325b")
    return res
}

export const updateGalleryById = async (data) => {
    const res = await API_INSTANCE.patch("/gallery/64569c686e615869d2c2325b", data)
    return res
}