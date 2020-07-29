import { create } from 'apisauce';

// define the api
export default create({
  baseURL: process.env.API_URL
});
