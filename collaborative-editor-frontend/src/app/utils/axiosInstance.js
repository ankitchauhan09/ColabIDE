"use client"

import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        const accessToken = JSON.parse(token);
        if(accessToken) {
            if(config.headers) config.headers.token = accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

AxiosInstance.interceptors.response.use(
    (response) => {
        console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
        console.log(response.data);
        return response
    },
    (error) => {
        return Promise.reject(error);
    }
)