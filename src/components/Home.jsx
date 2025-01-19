import { useContext, useEffect, useState } from "react";
import { cardLikes, editCardById, getAllCards } from "../services/cardsService";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FavCards from "./FavCards";
import { appThemes, cardTheme } from "../App";

function Home({ searchTerm }) {
    const [loading, setLoading] = useState(true);
    const [homeCards, setHomeCards] = useState([]);
    const [displayCount, setDisplayCount] = useState(3);
    const [userToken, setUserToken] = useState(localStorage.getItem("token"));
    const [isBusiness, setIsBusiness] = useState(false);
    const [userId, setUserId] = useState(null);
    const [filteredCards, setFilteredCards] = useState([]);

    useEffect(() => {
        if (userToken) {
            try {
                const decoded = jwtDecode(userToken);
                setUserId(decoded._id);
                setIsBusiness(decoded.isBusiness);
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }

        getAllCards()
            .then((res) => {
                const allCards = res.data;
                setHomeCards(allCards);
                setFilteredCards(allCards);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [userToken]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = homeCards.filter(
                (card) =>
                    card.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    card.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    card.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCards(filtered);
        } else {
            setFilteredCards(homeCards);
        }
    }, [searchTerm, homeCards]);

    const handleLike = (cardId) => {
        const updatedCards = homeCards.map((card) => {
            if (card._id === cardId) {
                let updatedLikes = [...card.likes];
                if (updatedLikes.includes(userId)) {
                    updatedLikes = updatedLikes.filter((id) => id !== userId);
                } else {
                    updatedLikes.push(userId);
                }

                cardLikes(cardId, { likes: updatedLikes })
                    .then(() => {
                        setHomeCards((prevCards) => prevCards.map((prevCard) => (prevCard._id === cardId ? { ...prevCard, likes: updatedLikes } : prevCard)));
                    })
                    .catch((error) => console.log(error.response?.data));
            }
            return card;
        });
        setHomeCards(updatedCards);
    };

    const loadMore = () => {
        setDisplayCount((prev) => prev + 3);
    };

    const displayedCards = searchTerm ? filteredCards.slice(0, displayCount) : homeCards.slice(0, displayCount);
    const theme = useContext(appThemes);
    const themeCard = useContext(cardTheme);
    return (
        <>
            <div
                className="container-home"
                style={{
                    paddingTop: "7%",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingBottom: "20px",
                    backgroundColor: theme.background,
                    color: theme.color,
                }}
            >
                <div className="h1p" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h1>Business cards</h1>
                    <p style={{ width: "65%", textAlign: "center", fontSize: "1.2em" }}>
                        Here you can look at cards which are representing business places from all categories around the world such as food, coffee houses, clothing items, fashion accessories,
                        Jewelry, etc.
                    </p>
                    <div className="line"></div>
                </div>
                <div
                    className="business-cards"
                    style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(2, 400px)", alignItems: "center", justifyContent: "center", gap: "20px", padding: "30px" }}
                >
                    {loading ? (
                        <div style={{ display: "grid", gridColumn: "span 3", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                            <img style={{ width: "90%", height: "80%" }} src="https://i.gifer.com/ZC9Y.gif" alt="loading..." />
                        </div>
                    ) : (
                        displayedCards.map((card) => (
                            <div
                                className="card"
                                style={{
                                    backgroundColor: themeCard.background,
                                    color: themeCard.color,
                                    width: "22rem",
                                    height: "540px",
                                    paddnig: "10px",
                                    boxShadow: themeCard.shadow,
                                    borderRadius: "15px",
                                    overflow: "hidden",
                                }}
                                key={card._id}
                            >
                                <div className="img" style={{ height: "58%" }}>
                                    <Link to={`${card._id}`} key={card._id} style={{ textDecoration: "none" }}>
                                        <img style={{ height: "100%", boxShadow: themeCard.shadow }} src={card.image.url} className="card-img-top" alt={card.title} />
                                    </Link>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ backgroundColor: themeCard.background, color: themeCard.color, fontWeight: "900" }}>
                                            {card.title}
                                        </h5>
                                        <p className="card-text" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                            {card.subtitle}
                                        </p>
                                    </div>
                                    <ul
                                        className="list-group list-group-flush"
                                        style={{ height: "80px", overflowY: "scroll", boxShadow: themeCard.shadow, backgroundColor: themeCard.background, color: themeCard.color }}
                                    >
                                        <li className="list-group-item" style={{ padding: "10px", backgroundColor: themeCard.background, color: themeCard.color }}>
                                            {card.description}
                                        </li>
                                    </ul>
                                    <div className="card-body" style={{ height: "30%", display: "flex", alignItems: "center", justifyContent: "end", fontSize: "1.3em", gap: "10px" }}>
                                        <Link style={{ backgroundColor: themeCard.background, color: themeCard.color }} to={card.phone}>
                                            <i className="fa-solid fa-phone"></i>
                                        </Link>
                                        {userToken && (
                                            <div onClick={() => handleLike(card._id)}>
                                                {card.likes.includes(userId) ? (
                                                    <i className="fa-solid fa-heart" style={{ cursor: "pointer" }}></i>
                                                ) : (
                                                    <i className="fa-regular fa-heart" style={{ cursor: "pointer" }}></i>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {displayCount < homeCards.length && (
                    <button className="btn btn-primary" onClick={loadMore}>
                        Show More Cards
                    </button>
                )}
            </div>
        </>
    );
}

export default Home;
