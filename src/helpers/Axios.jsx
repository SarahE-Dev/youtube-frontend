import axios from "axios";

const Axios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "https://bluezack.adaptable.app/api/users",
    withCredentials: true
});

export default Axios;