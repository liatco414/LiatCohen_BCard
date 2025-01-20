import { useContext, useEffect, useState } from "react";
import { getUserById } from "../services/usersService";
import { Links, useNavigate, useParams } from "react-router-dom";
import { use } from "react";
import { Link } from "react-router-dom";
import { appThemes, cardTheme } from "../App";
import { errorMsg } from "../services/feedbackService";

function Profile({ setIsLoggedIn }) {
    const theme = useContext(appThemes);
    const themeCard = useContext(cardTheme);
    let [userDetails, setUserDetails] = useState(null);
    let [loading, setLoading] = useState(true);
    let { userId } = useParams();

    let token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserById(userId);
                if (userData && token) {
                    setUserDetails(userData);
                } else {
                    errorMsg("User data not found");
                }
            } catch (error) {
                console.error("Error fetching user:", error.response?.data);
                errorMsg("Something went wrong, please try again later");
            } finally {
                setLoading(false);
            }
        };
        const timer = setTimeout(() => {
            fetchUser();
        }, 100);

        return () => clearTimeout(timer);
    }, [userId, token]);

    if (loading || !userDetails) return <p>Loading...</p>;
    let businessUser;
    if (userDetails.isBusiness === true) {
        businessUser = "Business User";
    } else {
        businessUser = "Guest";
    }

    return (
        <>
            <div
                className="profileContainer"
                style={{
                    backgroundColor: theme.background,
                    color: theme.color,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "100px",
                    paddingBottom: "2%",
                }}
            >
                <h1>Profile</h1>
                <div className="card" style={{ width: "18rem", backgroundColor: themeCard.background, color: themeCard.color }} key={userDetails._id}>
                    <div
                        className="img"
                        style={{
                            backgroundColor: themeCard.background,
                            color: themeCard.color,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "30px",
                        }}
                    >
                        <img
                            src={userDetails.image.url}
                            alt={userDetails.image.alt}
                            style={{ width: "90%", height: "90%", borderRadius: "90px", backgroundColor: theme.background, color: theme.color }}
                        />
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                Name: {`${userDetails.name.first} ${userDetails.name.middle} ${userDetails.name.last}`}
                            </li>
                            <li className="list-group-item" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                Email: {userDetails.email}
                            </li>
                            <li className="list-group-item" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                Phone: <Link to={userDetails.web}>{userDetails.phone}</Link>
                            </li>
                            <li className="list-group-item" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                Auth Level: {businessUser}
                            </li>
                            <li className="list-group-item" style={{ backgroundColor: themeCard.background, color: themeCard.color }}>
                                Address: {userDetails.address?.street} {userDetails.address?.houseNumber}, {userDetails.address?.city}, {userDetails.address?.country}
                            </li>
                        </ul>
                        <div style={{ width: "100%", height: "50px", display: "flex", justifyContent: "center", alignItems: "end", backgroundColor: themeCard.background, color: themeCard.color }}>
                            <Link to={`edit-user/${userDetails._id}`}>
                                <button className="btn btn-primary">Edit</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
