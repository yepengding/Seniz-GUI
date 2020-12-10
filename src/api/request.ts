import axios from 'axios';

const config = {
    baseURL: 'http://jsonplaceholder.typicode.com/'
}

export default axios.create({
    baseURL: config.baseURL
});
