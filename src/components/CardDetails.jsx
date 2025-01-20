import { useContext, useEffect, useState } from "react";
import { getCardById } from "../services/cardsService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { appThemes, cardTheme } from "../App";
import { errorMsg } from "../services/feedbackService";

function CardDetails() {
    let { cardId } = useParams();

    let [currentCard, setCurrentCard] = useState(null);
    let [loading, setLoading] = useState(true);

    const theme = useContext(appThemes);
    const themeCard = useContext(cardTheme);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const cardData = await getCardById(cardId);
                setCurrentCard(cardData);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchCard();
    }, [cardId]);

    if (loading || !currentCard) return <p>Loading...</p>;

    return (
        <>
            <div
                className="cardData"
                style={{
                    backgroundColor: theme.background,
                    color: theme.color,
                    width: "100%",
                    height: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "8%",
                    gap: "20px",
                    paddingBottom: "10px",
                }}
            >
                <h1>{currentCard.title}</h1>
                <h2>{currentCard.subtitle}</h2>
                <div className="container" style={{ width: "100%", display: "flex", alignItems: "start", justifyContent: "center", gap: "50px" }}>
                    <div className="image">
                        <img
                            src={currentCard.image.url}
                            alt={currentCard.image.alt}
                            style={{
                                width: "350px",
                                height: "250px",
                                objectFit: "cover",
                                borderRadius: "10px",
                            }}
                        />
                    </div>
                    <div className="card" style={{ width: "18rem", backgroundColor: themeCard.background, color: themeCard.color }} key={currentCard._id}>
                        <div className="card-body">
                            <p className="card-text" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                {currentCard.description}
                            </p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                Phone: {currentCard.phone}
                            </li>
                            <li className="list-group-item" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                Email: {currentCard.email}
                            </li>
                            <li className="list-group-item" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                Web: <Link to={currentCard.web}>{currentCard.web}</Link>
                            </li>
                            <li className="list-group-item" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                Address: {currentCard.address?.street}, {currentCard.address?.city}, {currentCard.address?.state}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardDetails;
