
import axios from "../api/axios";
import { remove } from "../components/Reducers/RoleReducer";


export default function NotAuth() {
    
    remove()
    window.sessionStorage.removeItem("token")
    window.sessionStorage.removeItem("role")
    delete axios.defaults.headers.common["Authorization"];
}


