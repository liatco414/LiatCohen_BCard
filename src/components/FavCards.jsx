import { jwtDecode } from "jwt-decode";
import { cardLikes, deleteCard, getAllCards } from "../services/cardsService";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appThemes, cardTheme } from "../App";
import "../css/cardComponents.css";
import { errorMsg } from "../services/feedbackService";

function FavCards() {
    const [favCards, setFavCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const userToken = localStorage.getItem("token");
    const decoded = jwtDecode(userToken);
    const userId = decoded._id;
    const isBusiness = decoded.isBusiness;
    const theme = useContext(appThemes);
    const themeCard = useContext(cardTheme);

    useEffect(() => {
        getAllCards().then((res) => {
            let allCards = res.data;
            let userLikes = allCards.filter((card) => card.likes && card.likes.includes(userId));
            setFavCards(userLikes);
            setLoading(false);
        });
    }, []);

    const handleLike = async (cardId) => {
        try {
            await cardLikes(cardId, userToken, {
                likes: favCards.find((card) => card._id === cardId).likes.filter((id) => id !== userId),
            });

            setFavCards((prevFavCards) => prevFavCards.filter((card) => card._id !== cardId));
        } catch (error) {
            errorMsg("Something went wrong with saving the like");
        }
    };
    const cardDelete = async (cardId) => {
        try {
            const removeCard = await deleteCard(cardId);
            setFavCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
        } catch (error) {
            errorMsg("Couldn't delete card");
        }
    };
    let isLoggedIn = localStorage.getItem("token");
    return (
        <>
            <div className="container-home" style={{ backgroundColor: theme.background, color: theme.color }}>
                <h1>Your Favorite Cards</h1>
                <div className="business-cards">
                    {loading ? (
                        <div style={{ display: "grid", gridColumn: "span 3", justifyContent: "center", alignItems: "center" }}>
                            <img style={{ width: "90%", height: "80%" }} src="https://i.gifer.com/ZC9Y.gif" alt="loading..." />
                        </div>
                    ) : (
                        favCards.map((favCard) => (
                            <div
                                className="card"
                                style={{
                                    backgroundColor: themeCard.background,
                                    color: themeCard.color,
                                    width: "22rem",
                                    height: "540px",
                                    paddig: "10px",
                                    boxShadow: "2px 2px 6px rgb(72, 72, 72)",
                                    borderRadius: "15px",
                                    overflow: "hidden",
                                }}
                                key={favCard._id}
                            >
                                <div className="img" style={{ height: "58%" }}>
                                    <Link to={`/${favCard._id}`} key={favCard._id} style={{ textDecoration: "none" }}>
                                        <img
                                            style={{ height: "100%", backgroundColor: themeCard.background, color: themeCard.color, boxShadow: themeCard.shadow }}
                                            src={favCard.image.url}
                                            className="card-img-top"
                                            alt={favCard.title}
                                        />
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                        {favCard.title}
                                    </h5>
                                    <p className="card-text" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                        {favCard.subtitle}
                                    </p>
                                </div>
                                <ul
                                    className="list-group list-group-flush"
                                    style={{ backgroundColor: themeCard.background, color: themeCard.color, height: "80px", overflowY: "scroll", boxShadow: "1px 1px 4px rgb(100, 100, 100)" }}
                                >
                                    <li className="list-group-item" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                        {favCard.description}
                                    </li>
                                </ul>
                                <div
                                    className="card-body"
                                    style={{ backgroundColor: themeCard.background, color: themeCard.color, display: "flex", alignItems: "end", justifyContent: "end", fontSize: "1.3em", gap: "10px" }}
                                >
                                    <Link style={{ backgroundColor: themeCard.background, color: themeCard.color }} to={favCard.phone}>
                                        <i className="fa-solid fa-phone"></i>
                                    </Link>
                                    {isLoggedIn ? (
                                        <div onClick={() => handleLike(favCard._id)}>
                                            {favCard.likes.includes(userId) ? (
                                                <i className="fa-solid fa-heart" style={{ cursor: "pointer" }}></i>
                                            ) : (
                                                <i className="fa-regular fa-heart" style={{ cursor: "pointer" }}></i>
                                            )}
                                        </div>
                                    ) : null}
                                    {isLoggedIn && isBusiness && isLoggedIn === favCard.user_id ? (
                                        <>
                                            <Link style={{ color: "black" }} to={favCard.phone}>
                                                <i className="fa-solid fa-phone"></i>
                                            </Link>
                                            <Link>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                        </>
                                    ) : null}
                                    {userToken && isBusiness && userId === favCard.user_id ? (
                                        <>
                                            <Link to={`/cards/${favCard._id}`}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>

                                            <i onClick={() => cardDelete(favCard._id)} className="fa-solid fa-trash" style={{ color: "red", cursor: "pointer" }}></i>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default FavCards;
