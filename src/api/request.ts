import axios from 'axios';

const config = {
    baseURL: process.env.REACT_APP_WEB_PATH
}

export default axios.create({
    baseURL: config.baseURL,
    withCredentials: true,
    timeout: 10000
});
