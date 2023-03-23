import axios from "axios";

const baseUrl = "/api/records/";

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAllUserRecords = async (user) => {
    const request = axios.get(`${baseUrl}${user}`);
    const response = await request.then((records) => records.data);
    return response;
};

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios
        .post(baseUrl, newObject, config)
        .catch((e) => console.log(e));

    return response.data;
};

const remove = async (record) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios
        .delete(`${baseUrl}${record.id}`, config)
        .catch((e) => console.log(e));

    return response.data;
};

const put = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios
        .put(`${baseUrl}${newObject.id}`, newObject, config)
        .catch((e) => console.log(e));

    return response.data;
};

export default {
    getAllUserRecords,
    setToken,
    create,
    put,
    remove,
};
