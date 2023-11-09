import axios from "../api/axios";


export default function CheckUser(email, password) {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    return axios.post(`user/login`,formData)
}


    
