import { useEffect, useState } from "react";
import { getCardById } from "../services/cardsService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function CardDetails() {
    let { cardId } = useParams();
    let [currentCard, setCurrentCard] = useState(null);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const cardData = await getCardById(cardId);
                console.log("Card Data:", cardData);
                setCurrentCard(cardData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching card:", error);
                setLoading(false);
            }
        };

        fetchCard();
    }, [cardId]);

    if (loading || !currentCard) return <p>Loading...</p>;

    return (
        <>
            <div className="cardData" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "8%", gap: "20px" }}>
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
                    <div className="card" style={{ width: "18rem" }} key={currentCard._id}>
                        <div className="card-body">
                            <p className="card-text">{currentCard.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Phone: {currentCard.phone}</li>
                            <li className="list-group-item">Email: {currentCard.email}</li>
                            <li className="list-group-item">
                                Web: <Link to={currentCard.web}>{currentCard.web}</Link>
                            </li>
                            <li className="list-group-item">
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
