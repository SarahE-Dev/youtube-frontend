import axios from "axios";

const Axios = axios.create({
    baseURL: "http://localhost:3000/api/users",
    withCredentials: true
});

export default Axios;