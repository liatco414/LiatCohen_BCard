import axios from "axios";
import { jwtDecode } from "jwt-decode";

let apiCards = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";

export function getAllCards() {
    return axios.get(apiCards);
}

export function editCardById(cardId, cardData) {
    const userToken = localStorage.getItem("token");

    const config = {
        method: "patch",
        url: `${apiCards}/${cardId}`,
        headers: {
            "x-auth-token": userToken,
        },
        data: cardData,
    };

    return axios
        .request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function newCard(user) {
    const userToken = localStorage.getItem("token");

    const data = {
        title: user.title,
        subtitle: user.subtitle,
        description: user.description,
        phone: user.phone,
        email: user.email,
        web: user.web,
        image: {
            url: user.image.url || "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
            alt: user.image.alt || "Business card image",
        },
        address: {
            state: user.address.state,
            country: user.address.country,
            city: user.address.city,
            street: user.address.street,
            houseNumber: user.address.houseNumber,
            zip: user.address.zip,
        },
    };

    console.log("Sending data:", data);

    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: apiCards,
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": userToken,
        },
        data: data,
    };

    return axios
        .request(config)
        .then((response) => {
            console.log("Success:", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("Error:", error.response?.data);
            throw error;
        });
}

export function getCardById(cardId) {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiCards}/${cardId}`,
        headers: {},
    };

    return axios
        .request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}
