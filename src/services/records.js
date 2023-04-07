import axios from "axios";

const baseUrl = "/records/";

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

// TODO: make records return id from server to remove unique key error
const getAllUserRecords = async (user) => {
    const request = axios.get(`${baseUrl}${user}`);
    const response = await request.then((records) => records.data);
    return response;
};

const create = async (newRecord, user, controller) => {
    // const config = {
    //     headers: { Authorization: token },
    // };

    const response = await axios
        .post(`${baseUrl}${user.id}`, newRecord, { signal: controller.signal })
        .catch((e) => console.error(e));

    console.log(response);

    return response.data;
};

const remove = async (record) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios
        .delete(`${baseUrl}${record.id}`, config)
        .catch((e) => console.error(e));

    return response.data;
};

const put = async (newRecord) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios
        .put(`${baseUrl}${newRecord.id}`, newRecord, config)
        .catch((e) => console.error(e));

    return response.data;
};

export default {
    getAllUserRecords,
    setToken,
    create,
    put,
    remove,
};
