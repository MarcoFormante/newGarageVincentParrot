import axios from "axios"


export default function CheckUser(email, password) {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    return axios.post(`${process.env.REACT_APP_HTTP}helpers/check/index.php`,formData)
}
    
