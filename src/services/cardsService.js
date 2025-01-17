import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { use } from "react";

let apiCards = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";
const userToken = localStorage.getItem("token");

export function getAllCards() {
    return axios.get(apiCards);
}

export function editCardById(cardId, cardData) {
    const data = JSON.stringify({
        title: cardData.title,
        subtitle: cardData.subtitle,
        description: cardData.description,
        phone: cardData.phone,
        email: cardData.email,
        web: cardData.web,
        image: {
            url: cardData.image?.url || "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
            alt: cardData.image?.alt || "business card image",
        },
        address: {
            state: cardData.address?.state || "",
            country: cardData.address?.country,
            city: cardData.address?.city,
            street: cardData.address?.street,
            houseNumber: Number(cardData.address?.houseNumber),
            zip: Number(cardData.address?.zip),
        },
        bizNumber: cardData.bizNumber,
        user_id: cardData.user_id,
    });

    const config = {
        method: "put",
        url: `${apiCards}/${cardId}`,
        headers: {
            "x-auth-token": userToken,
            "Content-Type": "application/json",
        },
        data: data,
    };

    return axios(config)
        .then((response) => {
            if (response.status === 200 && response.data) {
                console.log("Server response:", response);
                return response.data;
            }
            throw new Error("Update failed or returned unexpected data");
        })
        .catch((error) => {
            console.error("Full error details:", error.response?.data || error);
            throw error;
        });
}
export function newCard(user) {
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
            console.log("Success:", response);
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

export function deleteCard(cardId, bizNum) {
    let data = JSON.stringify({
        bizNumber: bizNum,
    });

    let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${apiCards}/${cardId}`,
        headers: {
            "x-auth-token": userToken,
            "Content-Type": "application/json",
        },
        data: data,
    };

    return axios
        .request(config)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.log(error.response?.data);
        });
}
export function cardLikes(cardId, updatedLikes) {
    const data = {
        likes: updatedLikes,
    };

    const config = {
        method: "patch",
        url: `${apiCards}/${cardId}`,
        headers: {
            "x-auth-token": userToken,
            "Content-Type": "application/json",
        },
        data: data,
    };

    return axios
        .request(config)
        .then((response) => {
            console.log("Like update successful:", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("Like update failed:", error);
            throw error;
        });
}
