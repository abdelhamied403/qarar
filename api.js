import { create } from 'apisauce';

// define the api
const api = create({
  baseURL: process.env.API_URL
});

api.axiosInstance.interceptors.request.use(config => {
  const lang = localStorage.getItem('LANG') || 'ar';
  // eslint-disable-next-line no-param-reassign
  config.url += `&lang=${lang}`;
  return config;
});

export default api;
