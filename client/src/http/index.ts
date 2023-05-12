import axios, { AxiosRequestConfig } from "axios";

export const $host = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 1000,
});

const config: AxiosRequestConfig = {
    baseURL: "http://localhost:3001",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
};

export const $authHost = axios.create(config);
