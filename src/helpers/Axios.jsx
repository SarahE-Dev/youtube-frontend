import axios from "axios";

const Axios = axios.create({
    baseURL: "https://bluezack.adaptable.app/api/users",
    withCredentials: true
});

export default Axios;