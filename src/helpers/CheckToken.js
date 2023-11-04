import axios from "../api/axios";

export default function CheckToken(token) {
    let formData = new FormData();
    formData.append("token", token)
    return axios.post("user/checkToken",formData)
}