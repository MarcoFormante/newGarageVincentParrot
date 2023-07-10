import { remove } from "../components/Reducers/RoleReducer";


export default function NotAuth(){
    remove()
    localStorage.removeItem("token")
}


