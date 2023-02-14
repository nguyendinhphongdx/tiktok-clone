import { configBaseURL, configHeader } from '~/common/common';
import axios from 'axios';

export const getFollowUser = async () => {
    try {
        //
        const res = await axios.get(`${configBaseURL}/api/users/get-follow-user`, configHeader)
        return res.data
    } catch (error) {
        console.log(error);
    }
};