import axios, { AxiosError } from "axios"

const BASE_URL = 'https://e-commerce-rnofe-node-js.onrender.com';

export const api = axios.create({
    baseURL: BASE_URL


});

type ErrorBody = { error?: string; details?: { message: string }[] };

api.interceptors.response.use(
    res => res,
    (err: AxiosError<ErrorBody>) => {
        const { response } = err;
        if (!response) {
            return Promise.reject(err);
        }
        const body = response.data;
        const details = Array.isArray(body?.details) ? body.details.map(d => d.message).join('\n') : "";

        return Promise.reject(
            new Error(
                details || body?.error || `Request failed (${response.status})`
            )
        )
    }

)