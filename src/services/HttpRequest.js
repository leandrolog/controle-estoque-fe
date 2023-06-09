import axios from "axios";
import jwt_decode from "jwt-decode";


const HttpRequest = axios.create({
    baseURL: "http://localhost:8080"
})

let role = '';
let user_id = '';

const token = sessionStorage.getItem("token");

if (token) {
    const decodedToken = jwt_decode(token);
    role = decodedToken.role;
    user_id = decodedToken.id;
    HttpRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export {HttpRequest, role, user_id};
