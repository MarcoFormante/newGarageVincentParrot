import axios from "axios";

export default axios.create(
{
    baseURL: process.env.REACT_APP_HTTP,
    timeout: 8000,
        headers: {
        "Content-Type": "application/json"  
        }
}
)