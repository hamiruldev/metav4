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

export { getleaderboard };
