const { default: axios } = require('axios');

const axiosinstance = axios.create({
    baseURL: 'https://reqres.in/api'
});

export default axiosinstance;
