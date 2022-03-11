import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://ecom-react-task.herokuapp.com/'
});
export default instance;