import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { editCardById, getAllCards } from "../services/cardsService";
import { Link } from "react-router-dom";

function MyCards({ setCreateCard }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userToken = localStorage.getItem("token");
    const decoded = jwtDecode(userToken);
    const userId = decoded._id;
    let isBusiness = decoded.isBusiness;

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
                editCardById(cardId, { likes: updatedLikes })
                    .then(() => {
                        setCards((prevCards) => prevCards.map((prevCard) => (prevCard._id === cardId ? { ...prevCard, likes: updatedLikes } : prevCard)));
                    })
                    .catch((error) => console.log(error.response?.data));
            }
            return card;
        });
        setCards(updatedCards);
    };

    return (
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
                                <img style={{ height: "100%", objectFit: "cover" }} src={card.image.url} className="card-img-top" alt={card.title} />
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
                                    }}
                                >
                                    <Link to={`tel:${card.phone}`} style={{ color: "black" }}>
                                        <i className="fa-solid fa-phone"></i>
                                    </Link>

                                    {userToken && (
                                        <div onClick={() => handleLike(card._id)}>
                                            <i className={`fa-${card.likes.includes(userId) ? "solid" : "regular"} fa-heart`} style={{ cursor: "pointer" }} />
                                        </div>
                                    )}

                                    {userToken && isBusiness && userId === card.user_id ? (
                                        <Link>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyCards;
