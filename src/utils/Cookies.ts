import { getCookie, removeCookie, setCookie } from "typescript-cookie"


export const setToken = (value: string) => {
    setCookie('token', value, { expires: 7 })
}


export const getToken = () => {
    const token = getCookie('token');
    return token ? token : null;
}


export const deleteToken = () => {
    const token = getCookie('token');
     token ? removeCookie('token') : null;
}