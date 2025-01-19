import axios from "axios";
import { jwtDecode } from "jwt-decode";

let apiUsers = import.meta.env.VITE_API_URL_USERS;
const userToken = localStorage.getItem("token");

export function getAllUsers() {
    return axios.get(apiUsers);
}

export function loginUser(user) {
    const data = JSON.stringify({
        email: user.email,
        password: user.password,
    });

    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiUsers}/login`,
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };

    return axios
        .post(`${apiUsers}/login`, data, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function addUser(user) {
    let data = JSON.stringify({
        name: {
            first: user.name.first,
            middle: user.name.middle || "",
            last: user.name.last,
        },
        phone: user.phone,
        email: user.email,
        password: user.password,
        image: {
            url: user.image?.url || "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
            alt: user.image?.alt || "Default profile picture",
        },
        address: {
            state: user.address.state,
            country: user.address.country,
            city: user.address.city,
            street: user.address.street,
            houseNumber: user.address.houseNumber,
            zip: user.address.zip,
        },
        isBusiness: Boolean(user.isBusiness) || false,
    });

    let config = {
        method: "post",
        url: apiUsers,
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };

    return axios(config)
        .then((response) => {
            return response.data ? response.data : response;
        })
        .catch((error) => {
            throw error;
        });
}

export function businessStatus() {
    let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: apiUsers,
        headers: {
            "x-auth-token": userToken,
        },
    };

    return axios.request(config).then((response) => {
        return response.data;
    });
}

export function getUserById(userId) {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiUsers}/${userId}`,
        headers: {
            "x-auth-token": userToken,
        },
    };

    return axios.request(config).then((response) => {
        return response.data;
    });
}

export function updateUser(userId, userData) {
    let data = JSON.stringify({
        name: {
            first: userData.name?.first,
            middle: userData.name?.middle,
            last: userData.name?.last,
        },
        phone: userData.phone,
        image: {
            url: userData.image?.url,
            alt: userData.image?.alt,
        },
        address: {
            state: userData.address?.state,
            country: userData.address?.country,
            city: userData.address?.city,
            street: userData.address?.street,
            houseNumber: userData.address?.houseNumber,
            zip: userData.address?.zip,
        },
    });

    let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${apiUsers}/${userId}`,
        headers: {
            "x-auth-token": userToken,
            "Content-Type": "application/json",
        },
        data: data,
    };

    return axios.request(config).then((response) => {
        return response.data;
    });
}
