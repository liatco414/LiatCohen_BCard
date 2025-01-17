import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { cardLikes, deleteCard, getAllCards, getCardById } from "../services/cardsService";
import { Link } from "react-router-dom";
import CreateCardModal from "./createCardModal";
import CreateCard from "./CreateCard";

function MyCards({ setCreateCard, setShowEditModal }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isBusiness, setIsBusiness] = useState(null);
    const [deletedCard, setDeletedCard] = useState();

    const userToken = localStorage.getItem("token");

    useEffect(() => {
        if (userToken) {
            try {
                const decoded = jwtDecode(userToken);
                const userId = decoded._id;
                const isBusiness = decoded.isBusiness;

                setUserId(userId);
                setIsBusiness(isBusiness);
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, [userToken]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setLoading(true);
                const response = await getAllCards();
                if (response) {
                    let cardsArray = response.data;
                    const userCards = cardsArray.filter((card) => card.user_id === userId);
                    setCards(userCards);
                }
            } catch (error) {
                console.error("Error details:", {
                    error,
                    message: error?.message,
                    response: error?.response,
                    status: error?.response?.status,
                });
                setError("Failed to load cards");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchCards();
        }
    }, [userId]);

    const handleLike = (cardId) => {
        const updatedCards = cards.map((card) => {
            if (card._id === cardId) {
                let updatedLikes = [...card.likes];
                if (updatedLikes.includes(userId)) {
                    updatedLikes = updatedLikes.filter((id) => id !== userId);
                } else {
                    updatedLikes.push(userId);
                }
                cardLikes(cardId, { likes: updatedLikes })
                    .then(() => {
                        setCards((prevCards) => prevCards.map((prevCard) => (prevCard._id === cardId ? { ...prevCard, likes: updatedLikes } : prevCard)));
                    })
                    .catch((error) => console.log(error.response?.data));
            }
            return card;
        });
        setCards(updatedCards);
    };

    const cardDelete = async (cardId) => {
        try {
            const removeCard = await deleteCard(cardId);
            setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    return (
        <>
            <div
                className="userCards"
                style={{
                    marginTop: "7%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1>Your Cards</h1>
                <button className="btn btn-success" onClick={() => setCreateCard(true)}>
                    Add Card
                </button>

                <div
                    className="business-cards"
                    style={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 28rem)",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "20px",
                        padding: "30px",
                    }}
                >
                    {loading ? (
                        <div
                            style={{
                                display: "grid",
                                gridColumn: "span 3",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <img style={{ width: "90%", height: "80%" }} src="https://i.gifer.com/ZC9Y.gif" alt="loading..." />
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : cards.length === 0 ? (
                        <div>No cards found</div>
                    ) : (
                        cards.map((card) => (
                            <div
                                className="card"
                                style={{
                                    width: "22rem",
                                    height: "540px",
                                    boxShadow: "2px 2px 6px rgb(72, 72, 72)",
                                    borderRadius: "15px",
                                    overflow: "hidden",
                                }}
                                key={card._id}
                            >
                                <div className="img" style={{ height: "58%" }}>
                                    <Link to={`/${card._id}`} key={card._id} style={{ textDecoration: "none" }}>
                                        <img style={{ height: "100%", objectFit: "cover" }} src={card.image.url} className="card-img-top" alt={card.title} />
                                    </Link>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.subtitle}</p>
                                    </div>
                                    <ul
                                        className="list-group list-group-flush"
                                        style={{
                                            height: "80px",
                                            overflowY: "scroll",
                                            boxShadow: "1px 1px 4px rgb(100, 100, 100)",
                                        }}
                                    >
                                        <li className="list-group-item" style={{ padding: "20px" }}>
                                            {card.description}
                                        </li>
                                    </ul>
                                    <div
                                        className="card-body"
                                        style={{
                                            height: "30%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "end",
                                            fontSize: "1.3em",
                                            gap: "10px",
                                            flexDirection: "row-reverse",
                                        }}
                                    >
                                        {userToken && (
                                            <div onClick={() => handleLike(card._id)}>
                                                <i className={`fa-${card.likes.includes(userId) ? "solid" : "regular"} fa-heart`} style={{ cursor: "pointer" }} />
                                            </div>
                                        )}
                                        <Link to={`tel:${card.phone}`} style={{ color: "black" }}>
                                            <i className="fa-solid fa-phone"></i>
                                        </Link>
                                        {userToken && isBusiness && userId === card.user_id ? (
                                            <>
                                                <Link to={`/cards/${card._id}`}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>

                                                <i onClick={() => cardDelete(card._id)} className="fa-solid fa-trash" style={{ color: "red", cursor: "pointer" }}></i>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default MyCards;
