import API_INSTANCE from "."

export const getAllContacts = async () => {
    const res = await API_INSTANCE.get('/contact/all')
    return res
}

