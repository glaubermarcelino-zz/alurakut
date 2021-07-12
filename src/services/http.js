import axios from 'axios';
//https://api.github.com/users/joellobo/followers
export const http = axios.create({
    baseURL: 'https://api.github.com/users/',
});