import axios from "axios";
import settings from './config'

const http = axios.create({
    baseURL: "http://192.168.15.32:3000"
})

export default http
