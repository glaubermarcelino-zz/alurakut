import axios from 'axios';
export const http = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_GITHUB_API}/users/`,
    headers: {
        "Content-Type": "application/json",
        "Accept":"application/json"
    }
});