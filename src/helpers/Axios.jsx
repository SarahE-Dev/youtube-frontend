import axios from "axios";

const Axios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "https://me-plus-you-backend.onrender.com/api/users",
    withCredentials: true
});

export default Axios;