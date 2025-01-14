import { useEffect, useState } from "react";
import { getCardById } from "../services/cardsService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function CardDetails() {
    let { cardId } = useParams();
    let [currentCard, setCurrentCard] = useState();

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await getCardById(cardId);
                console.log("API Response:", response);
                setCurrentCard(response);
            } catch (error) {
                console.error("Error fetching card:", error);
            }
        };

        fetchCard();
    }, [cardId]);
    if (!currentCard) return <p>Loading...</p>;

    return (
        <>
            <div className="card" style={{ width: "18rem" }} key={currentCard._id}>
                <h5 className="card-title">{currentCard.title}</h5>
                <img src={currentCard.image?.url} className="card-img-top" alt={currentCard.image?.alt} />
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
        </>
    );
}

export default CardDetails;
