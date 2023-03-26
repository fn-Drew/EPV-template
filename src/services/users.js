import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const baseUrl = "/users/";

const create = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};

export default { create };
