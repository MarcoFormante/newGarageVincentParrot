import axios from "axios"


export default function CheckUser(email, password) {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    return axios.post("http://localhost:80/api/helpers/check/index.php",formData)
}
    
