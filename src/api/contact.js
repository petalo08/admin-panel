import API_INSTANCE from "."

export const getAllContacts = async () => {
    const res = await API_INSTANCE.get('/contacts/all')
    return res
}

