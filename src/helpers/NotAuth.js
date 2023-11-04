import { remove } from "../components/Reducers/RoleReducer";


export default function NotAuth(){
    remove()
    window.sessionStorage.removeItem("token")
}


