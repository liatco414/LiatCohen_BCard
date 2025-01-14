import axios from "axios";
import { jwtDecode } from "jwt-decode";

let apiUsers = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users`;

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
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("Login failed:", error);
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
            url: user.image?.url || "",
            alt: user.image?.alt || "",
        },
        address: {
            state: user.address.state,
            country: user.address.country,
            city: user.address.city,
            street: user.address.street,
            houseNumber: user.address.houseNumber,
            zip: user.address.zip,
        },
        isBusiness: user.isBusiness || false,
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
            console.log("server response: ", response);

            return response.data ? response.data : response;
        })
        .catch((error) => {
            console.error("Error adding user:", error.response ? error.response.data : error.message);
            throw error;
        });
}

export function businessStatus() {
    const userToken = localStorage.getItem("token");

    let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: apiUsers,
        headers: {
            "x-auth-token": userToken,
        },
    };

    return axios
        .request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}
