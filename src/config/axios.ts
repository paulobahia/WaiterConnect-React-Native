import axios from "axios";

const http = axios.create({
    baseURL: "http://192.168.15.200:3000"
})

export default http
