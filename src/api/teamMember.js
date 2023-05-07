import API_INSTANCE from "."

export const getAllTeamMembers = async () => {
    const res = await API_INSTANCE.get('/teammembers/all')
    return res
}

export const getTeamMemberById = async (id) => {
    const res = await API_INSTANCE.get(`/teammembers/${id}`)
    return res
}

export const updateTeamMemberById = async (id, data) => {
    const res = await API_INSTANCE.patch(`/teammembers/${id}`, data)
    return res
}

export const deleteTeamMemberById = async (id) => {
    const res = await API_INSTANCE.delete(`/teammembers/${id}`)
    return res
}

export const createTeamMember = async (data) => {
    const res = await API_INSTANCE.post(`/teammembers`, data)
    return res
}