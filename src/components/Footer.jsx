import { useContext } from "react";
import { navBarThemes } from "../App";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Footer() {
    const theme = useContext(navBarThemes);
    let connected = localStorage.getItem("token");
    let userId;
    if (connected) {
        let decoded = jwtDecode(connected);
        userId = decoded._id;
    }
    return (
        <>
            <div className="footer" style={{ width: "100%", height: "5%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: theme.background, color: theme.color }}>
                <div className="icons" style={{ width: "100%", display: "flex", gap: "80px", alignItems: "center", justifyContent: "center", paddingTop: "20px" }}>
                    <div className="iconAbout" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Link
                            to="/about"
                            style={{
                                textDecoration: "none",
                                color: theme.color,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <i className="fa-solid fa-circle-exclamation" style={{ fontSize: "1.4em" }}></i>
                            <p>About</p>
                        </Link>
                    </div>
                    <div className="iconMail" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Link
                            to="mailto:liat667788@gmail.com"
                            style={{
                                textDecoration: "none",
                                color: theme.color,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <i className="fa-solid fa-envelope" style={{ fontSize: "1.4em" }}></i>
                            <p>Contact Us</p>
                        </Link>
                    </div>
                    {connected ? (
                        <>
                            <div className="iconProfile" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <Link
                                    to={`/profile/${userId}`}
                                    style={{
                                        textDecoration: "none",
                                        color: theme.color,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <i className="fa-solid fa-id-card" style={{ fontSize: "1.4em" }}></i>
                                    <p>Profile</p>
                                </Link>
                            </div>
                            <div className="iconProfile" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <Link
                                    to="/favcards"
                                    style={{
                                        textDecoration: "none",
                                        color: theme.color,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <i className="fa-solid fa-thumbs-up" style={{ fontSize: "1.4em" }}></i> <p>My Favorites</p>
                                </Link>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Footer;
