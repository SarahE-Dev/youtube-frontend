import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";
import Axios from "../helpers/Axios";

export const checkAuthUser = () => {
    const dispatch = useDispatch()
    const checkIfCookieExists = () => {
        const token = Cookies.get('youtube-jwt')
        return token ? true : false
    }
    const loginUser = async () => {
        if(checkIfCookieExists()){
            const user = await jwtDecode(Cookies.get('youtube-jwt'))
            const userInfo = await Axios.post('/get-all-user-info', {user: user.id})
            console.log(userInfo.data.user); 
            dispatch(login(userInfo.data.user))
        }
    }
    return {checkIfCookieExists, loginUser}
}