import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { cardLikes, deleteCard, getAllCards, getCardById } from "../services/cardsService";
import { Link } from "react-router-dom";
import { appThemes, cardTheme, navBarThemes } from "../App";
import "../css/cardComponents.css";
import { errorMsg } from "../services/feedbackService";

function MyCards({ setCreateCard, searchTerm }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isBusiness, setIsBusiness] = useState(null);
    const [deletedCard, setDeletedCard] = useState();
    const [filteredCards, setFilteredCards] = useState([]);

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
                errorMsg("Authentication error, please try to login again");
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
                    setFilteredCards(cardsArray);
                    const userCards = cardsArray.filter((card) => card.user_id === userId);
                    setCards(userCards);
                }
            } catch (error) {
                errorMsg("Failed to load cards");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchCards();
        }
    }, [userId]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = cards.filter(
                (card) =>
                    card.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    card.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    card.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCards(filtered);
        } else {
            setFilteredCards(cards);
        }
    }, [searchTerm, cards]);

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
                    .catch(() => errorMsg("Something went wrong with saving the like"));
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
            errorMsg("Couldn't delete card");
        }
    };

    const displayedCards = searchTerm ? filteredCards : cards;
    const theme = useContext(appThemes);
    const themeCard = useContext(cardTheme);

    return (
        <>
            <div
                className="container-home"
                style={{
                    backgroundColor: theme.background,
                    color: theme.color,
                }}
            >
                <h1 style={{ fontWeight: "900" }}>Your Cards</h1>
                <button className="btn" style={{ background: "rgb(158, 81, 206)", color: "white", fontWeight: "900", boxShadow: themeCard.shadow }} onClick={() => setCreateCard(true)}>
                    Add Card
                </button>

                <div className="business-cards">
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
                            <img style={{ width: "90%", height: "80%" }} src="https://i.gifer.com/YlWC.gif" alt="loading..." />
                        </div>
                    ) : cards.length === 0 ? (
                        <div>No cards found</div>
                    ) : (
                        displayedCards.map((card) => (
                            <div
                                className="card"
                                style={{
                                    backgroundColor: themeCard.background,
                                    color: themeCard.color,
                                    width: "22rem",
                                    height: "540px",
                                    boxShadow: themeCard.shadow,
                                    borderRadius: "15px",
                                    overflow: "hidden",
                                }}
                                key={card._id}
                            >
                                <div className="img" style={{ height: "58%", boxShadow: themeCard.shadow }}>
                                    <Link to={`/${card._id}`} key={card._id} style={{ textDecoration: "none" }}>
                                        <img style={{ height: "100%", objectFit: "cover", boxShadow: "3px 3px 10px black" }} src={card.image.url} className="card-img-top" alt={card.title} />
                                    </Link>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                            {card.title}
                                        </h5>
                                        <p className="card-text" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                            {card.subtitle}
                                        </p>
                                    </div>
                                    <ul
                                        className="list-group list-group-flush"
                                        style={{
                                            height: "80px",
                                            overflowY: "scroll",
                                            boxShadow: "1px 1px 4px rgb(100, 100, 100)",
                                        }}
                                    >
                                        <li className="list-group-item" style={{ padding: "20px", backgroundColor: themeCard.background, color: themeCard.color }}>
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
                                        <Link to={`tel:${card.phone}`} style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
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
