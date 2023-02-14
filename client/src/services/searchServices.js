// import * as httpRequest from '~/utils/httpRequests';
import { configBaseURL } from '~/common/common';
import axios from 'axios';

export const search = async (q, type = 'less') => {
    try {
        const res = await axios.get(`${configBaseURL}/api/users/search`, {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {

    }
};

export const searchVideo = async (q, type = 'less') => {
    try {
        const res = await axios.get(`${configBaseURL}/api/video/search`, {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {

    }
};

export const searchTrendy = async ( q ) => {
    try {
        const res = await axios.get(`${configBaseURL}/api/trendy/get-list-trendy-upload`, {
            params: {
                q,
            },
        });
        return res.data;
    } catch (error) {

    }
};

export const searchMusic = async ( q ) => {
    try {
        const res = await axios.get(`${configBaseURL}/api/music/get-list-music-upload`, {
            params: {
                q,
            },
        });
        return res.data;
    } catch (error) {

    }
};