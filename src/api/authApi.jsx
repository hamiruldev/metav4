import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

// const backEnd = import.meta.env.BACKEND_URL;
const backEnd = "https://360xp.co/rest_api/";
const token = sessionStorage.getItem("token")


const config = {
  headers: { Authorization: `Bearer ${token}` }
};


const registerAuth = async (formObj) => {
  try {
    const response = await axios.post(`${backEnd}api/register`, formObj);
    return response;
  } catch (err) {
    return err;
  }
};

const loginAuth = async (formObj) => {
  try {
    const response = await axios.post(`${backEnd}api/login`, formObj);
    return response;
  } catch (err) {
    return err;
  }
};


const getProfile = async () => {
  try {
    const response = await axios.get(`${backEnd}api/achievements`,
      config
    );
    return response;
  } catch (err) {
    return err;
  }
}

export { registerAuth, loginAuth, getProfile };
