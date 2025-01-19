import { useContext } from "react";
import { navBarThemes } from "../App";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../css/footer.css";

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
            <div className="footer" style={{ backgroundColor: theme.background, color: theme.color }}>
                <div className="icons">
                    <div className="icon">
                        <Link className="link" to="/about" style={{ color: theme.color }}>
                            <i className="fa-solid fa-circle-exclamation" style={{ fontSize: "1.4em" }}></i>
                            <p>About</p>
                        </Link>
                    </div>
                    <div className="icon">
                        <Link className="link" to="mailto:liat667788@gmail.com" style={{ color: theme.color }}>
                            <i className="fa-solid fa-envelope" style={{ fontSize: "1.4em" }}></i>
                            <p>Contact Us</p>
                        </Link>
                    </div>
                    {connected ? (
                        <>
                            <div className="icon">
                                <Link className="link" to={`/profile/${userId}`} style={{ color: theme.color }}>
                                    <i className="fa-solid fa-id-card" style={{ fontSize: "1.4em" }}></i>
                                    <p>Profile</p>
                                </Link>
                            </div>
                            <div className="icon">
                                <Link className="link" to="/favcards" style={{ color: theme.color }}>
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
