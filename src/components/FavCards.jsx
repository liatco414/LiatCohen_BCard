import { jwtDecode } from "jwt-decode";
import { editCardById, getAllCards } from "../services/cardsService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FavCards() {
    const [favCards, setFavCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const userToken = localStorage.getItem("token");
    const decoded = jwtDecode(userToken);
    const userId = decoded._id;

    useEffect(() => {
        getAllCards().then((res) => {
            let allCards = res.data;
            let userLikes = allCards.filter((card) => card.likes && card.likes.includes(userId));
            console.log("User Likes:", userLikes);
            setFavCards(userLikes);
            setLoading(false);
        });
    }, []);

    const handleLike = async (cardId) => {
        try {
            await editCardById(cardId, userToken, {
                likes: favCards.find((card) => card._id === cardId).likes.filter((id) => id !== userId),
            });

            setFavCards((prevFavCards) => prevFavCards.filter((card) => card._id !== cardId));
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };
    let isLoggedIn = localStorage.getItem("token");
    let isBusiness = localStorage.getItem("businessUser");

    return (
        <>
            <div className="container" style={{ paddingTop: "7%", width: "100%", height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <h1>Your Favorite Cards</h1>
                <div
                    className="business-cards"
                    style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(2, 28rem)", alignItems: "center", justifyContent: "center", gap: "20px", padding: "30px" }}
                >
                    {loading ? (
                        <div style={{ display: "grid", gridColumn: "span 3", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                            <img style={{ width: "90%", height: "80%" }} src="https://i.gifer.com/ZC9Y.gif" alt="loading..." />
                        </div>
                    ) : (
                        favCards.map((favCard) => (
                            <div
                                className="card"
                                style={{ width: "22rem", height: "540px", paddig: "10px", boxShadow: "2px 2px 6px rgb(72, 72, 72)", borderRadius: "15px", overflow: "hidden" }}
                                key={favCard._id}
                            >
                                <div className="img" style={{ height: "58%" }}>
                                    <img style={{ height: "100%" }} src={favCard.image.url} className="card-img-top" alt={favCard.title} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{favCard.title}</h5>
                                    <p className="card-text">{favCard.subtitle}</p>
                                </div>
                                <ul className="list-group list-group-flush" style={{ height: "80px", overflowY: "scroll", boxShadow: "1px 1px 4px rgb(100, 100, 100)" }}>
                                    <li className="list-group-item">{favCard.description}</li>
                                </ul>
                                <div className="card-body" style={{ display: "flex", alignItems: "end", justifyContent: "end", fontSize: "1.3em", gap: "10px" }}>
                                    <Link style={{ color: "black" }} to={favCard.phone}>
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
