import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios"
const BASE_URL = 'https://amirazadi.ir/backend/controllers/';

const postItems = async ({ data, endpoint }: { data: unknown, endpoint: string }) => {
    const response = await axios.post(BASE_URL + endpoint, data)
    return response.data;
}

export const usePost = () => {
    return useMutation({
        mutationFn: ({ data, endpoint }: { data: unknown, endpoint: string }) => postItems({ data, endpoint })
    })
}

const getItem = async (endpoint: string) => {
    const response = await axios.get(BASE_URL + endpoint);
    return response.data;
}

export const useGet = ({ key, endpoint }: { key: string, endpoint: string }) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => getItem(endpoint)
    })
}

export const convertTimestamp = (timestamp:number) =>{
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString()
}

