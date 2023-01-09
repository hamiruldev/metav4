import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

// const backEnd = import.meta.env.BACKEND_URL;
const backEnd = "https://360xp.co/rest_api/";
const token = sessionStorage.getItem("token")


const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const getleaderboard = async () => {
    try {
        const response = await axios.get(`${backEnd}api/getleaderboard`,
            config
        );
        return response;
    } catch (err) {
        return err;
    }
}

const getAchievementById = async (user_id) => {
    try {
        const response = await axios.get(`${backEnd}api/getachievement/${user_id}`,
            config
        );
        return response;
    } catch (err) {
        return err;
    }
}

const setObj = async ({ id, item, value, location }) => {

    const { avatar_id, username, user_id } = JSON.parse(sessionStorage.getItem("user"))

    const data = {
        object_id: id,
        object_name: item,
        object_value: value,
        object_location: location,
        user_id: user_id
    }
    try {
        const response = await axios.post(`${backEnd}api/propobject`, data,
            config
        );
        return response;
    } catch (err) {
        return err;
    }
}

const getAllObj = async () => {

    try {
        const response = await axios.get(`${backEnd}api/propobject`,
            config
        );
        return response?.data?.data;
    } catch (err) {
        return err;
    }
}

const getObjFilter = async (location) => {
    const { avatar_id, username, user_id } = JSON.parse(sessionStorage.getItem("user"))

    try {
        const response = await axios.get(`${backEnd}api/propobject`,
            config
        );
        const dataFilter = response?.data?.data.filter((item) => item?.object_location == location && item?.user_id == user_id)
        return dataFilter;
    } catch (err) {
        return err;
    }
}

export { getleaderboard, getAchievementById, setObj, getAllObj, getObjFilter };
