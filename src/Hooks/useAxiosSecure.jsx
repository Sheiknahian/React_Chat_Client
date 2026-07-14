import axios from 'axios';
import React from 'react';

const useAxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL: 'https://react-chat-server-2j9p.onrender.com'
    })
    return axiosSecure
};

export default useAxiosSecure;