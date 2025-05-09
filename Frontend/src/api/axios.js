import axios from "axios";

const instance = axios.create({
  baseURL: "https://webweaverv01.onrender.com/",
  withCredentials: true,
});

export default instance;
