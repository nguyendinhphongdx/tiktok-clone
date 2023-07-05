import axios from 'axios';
export const basseURL = 'https://tiktok-server-j9sr.onrender.com';
// export const basseURL = 'http://localhost:5000';
export const configBaseURL = axios.defaults.baseURL = basseURL;
export const configAuthorization = axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
export const configIdAccount = axios.defaults.headers.common['IdAccount'] = `Bearer ${localStorage.getItem('idAccount')}`;
export const configIdUser = axios.defaults.headers.common['IdUser'] = `Bearer ${localStorage.getItem('idUser')}`;

export const configHeader = {
    configAuthorization,
    configIdAccount,
    configIdUser
};



