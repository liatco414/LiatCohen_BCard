import { useEffect, useState } from "react";
import { editCardById, getAllCards } from "../services/cardsService";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FavCards from "./FavCards";

function Home() {
    const [loading, setLoading] = useState(true);
    const userToken = localStorage.getItem("token");
    const decoded = jwtDecode(userToken);
    const userId = decoded._id;
    const [cardId, setCardId] = useState([]);
    const [homeCards, setHomeCards] = useState([]);
    const [displayCount, setDisplayCount] = useState(3);

    useEffect(() => {
        getAllCards()
            .then((res) => {
                const allCards = res.data;
                setHomeCards(allCards);
                const cardsId = res.data.map((card) => card._id);
                setCardId(cardsId);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleLike = (cardId) => {
        const updatedCards = homeCards.map((card) => {
            if (card._id === cardId) {
                let updatedLikes = [...card.likes];
                if (updatedLikes.includes(userId)) {
                    updatedLikes = updatedLikes.filter((id) => id !== userId);
                } else {
                    updatedLikes.push(userId);
                }

                editCardById(cardId, { likes: updatedLikes })
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
    const displayedCards = homeCards.slice(0, displayCount);

    let isLoggedIn = localStorage.getItem("token");
    let decode = jwtDecode(isLoggedIn);
    let isBusiness = decode.isBusiness;

    return (
        <>
            <div
                className="container-home"
                style={{ paddingTop: "7%", width: "100%", height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}
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
                    style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(2, 28rem)", alignItems: "center", justifyContent: "center", gap: "20px", padding: "30px" }}
                >
                    {loading ? (
                        <div style={{ display: "grid", gridColumn: "span 3", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                            <img style={{ width: "90%", height: "80%" }} src="https://i.gifer.com/ZC9Y.gif" alt="loading..." />
                        </div>
                    ) : (
                        displayedCards.map((card) => (
                            <Link to={`/cards/${card._id}`} key={card._id} style={{ textDecoration: "none" }}>
                                <div
                                    className="card"
                                    style={{ width: "22rem", height: "540px", paddig: "10px", boxShadow: "2px 2px 6px rgb(72, 72, 72)", borderRadius: "15px", overflow: "hidden" }}
                                    key={card._id}
                                >
                                    <div className="img" style={{ height: "58%" }}>
                                        <img style={{ height: "100%" }} src={card.image.url} className="card-img-top" alt={card.title} />
                                    </div>
                                    <div className="card-content">
                                        <div className="card-body">
                                            <h5 className="card-title">{card.title}</h5>
                                            <p className="card-text">{card.subtitle}</p>
                                        </div>
                                        <ul className="list-group list-group-flush" style={{ height: "80px", overflowY: "scroll", boxShadow: "1px 1px 4px rgb(100, 100, 100)" }}>
                                            <li className="list-group-item" style={{ padding: "10px" }}>
                                                {card.description}
                                            </li>
                                        </ul>
                                        <div className="card-body" style={{ height: "30%", display: "flex", alignItems: "center", justifyContent: "end", fontSize: "1.3em", gap: "10px" }}>
                                            <Link style={{ color: "black" }} to={card.phone}>
                                                <i className="fa-solid fa-phone"></i>
                                            </Link>
                                            {isLoggedIn ? (
                                                <div onClick={() => handleLike(card._id)}>
                                                    {card.likes.includes(userId) ? (
                                                        <i className="fa-solid fa-heart" style={{ cursor: "pointer" }}></i>
                                                    ) : (
                                                        <i className="fa-regular fa-heart" style={{ cursor: "pointer" }}></i>
                                                    )}
                                                </div>
                                            ) : null}
                                            {isLoggedIn && isBusiness && isLoggedIn === card.user_id ? (
                                                <>
                                                    <Link style={{ color: "black" }} to={card.phone}>
                                                        <i className="fa-solid fa-phone"></i>
                                                    </Link>
                                                    <Link>
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                    </Link>
                                                </>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </Link>
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
