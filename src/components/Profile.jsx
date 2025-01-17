import { useEffect, useState } from "react";
import { getUserById } from "../services/usersService";
import { Links, useParams } from "react-router-dom";
import { use } from "react";
import { Link } from "react-router-dom";

function Profile() {
    let [userDetails, setUserDetails] = useState(null);
    let [loading, setLoading] = useState(true);
    let { userId } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let userData = await getUserById(userId);
                console.log(userData);
                setUserDetails(userData);
                setLoading(false);
            } catch (error) {
                console.log(error.response?.data);
            }
        };
        fetchUser();
    }, [userId]);
    if (loading || !userDetails) return <p>Loading...</p>;
    let businessUser;
    if (userDetails.isBusiness === true) {
        businessUser = "Business User";
    } else {
        businessUser = "Guest";
    }

    return (
        <>
            <div className="container" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "100px" }}>
                <h1>Profile</h1>
                <div className="card" style={{ width: "18rem" }} key={userDetails._id}>
                    <div className="img" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "30px" }}>
                        <img src={userDetails.image.url} alt={userDetails.image.alt} style={{ width: "90%", height: "90%", borderRadius: "90px" }} />
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Name: {`${userDetails.name.first} ${userDetails.name.middle} ${userDetails.name.last}`}</li>
                            <li className="list-group-item">Email: {userDetails.email}</li>
                            <li className="list-group-item">
                                Phone: <Link to={userDetails.web}>{userDetails.phone}</Link>
                            </li>
                            <li className="list-group-item">Auth Level: {businessUser}</li>
                            <li className="list-group-item">
                                Address: {userDetails.address?.street} {userDetails.address?.houseNumber}, {userDetails.address?.city}, {userDetails.address?.country}
                            </li>
                        </ul>
                        <div style={{ width: "100%", height: "50px", display: "flex", justifyContent: "center", alignItems: "end" }}>
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
