import axios from "axios";

export default function CheckToken(token) {
    let formData = new FormData();
    formData.append("token", token)
    return axios.post(`${process.env.REACT_APP_HTTP}helpers/check/`,formData)
}