import axios from "axios";

const axiosURL = axios.create({
    baseURL: "http://localhost:8000/api/v1/cowrywealth"
});

export default axiosURL;