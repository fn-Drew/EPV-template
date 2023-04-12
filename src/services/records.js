import axios from "axios";

const baseUrl = "/records/";

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAllUserRecords = async (user) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(`${baseUrl}${user}`, config);
    const response = await request.then((records) => records.data);
    return response;
};

const create = async (newRecord, user) => {
    console.log("create newRecord", newRecord)

    const config = {
        headers: { Authorization: token },
    }
    const response = await axios
        .post(`${baseUrl}${user.id}`, newRecord, config)
        .catch((e) => console.error(e));

    return response.data;
};

export default {
    getAllUserRecords,
    setToken,
    create,
};
