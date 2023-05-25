import API_INSTANCE from ".";

export const getAllSeo = async () => {
  const res = await API_INSTANCE.get("/seo/all");
  return res;
};

export const getSeoById = async (id) => {
  const res = await API_INSTANCE.get(`/seo/${id}`);
  return res;
};

export const updateSeoById = async (id, body) => {
  const res = await API_INSTANCE.patch(`/seo/${id}`, body);
  return res;
};

export const createSeo = async (body) => {
  const res = await API_INSTANCE.post(`/seo`, body);
  return res;
};

export const getSeoByPageName = async (pageName) => {
  const res = await API_INSTANCE.get(`/seo/page/${pageName}`);
  return res;
};
export const deleteSeoById = async (id) => {
  const res = await API_INSTANCE.patch(`/seo/${id}`);
  return res;
};
