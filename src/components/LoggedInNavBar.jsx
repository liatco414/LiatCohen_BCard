import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { navBarThemes } from "../App";

function LoggedInNavBar({ setShowLogOutModal, checkIfIsBusiness, isBusiness, isLoggedIn, onSearchChange, onModeChange }) {
    let [userId, setUserId] = useState(null);
    const [inputValue, setInputValue] = useState("");

    const theme = useContext(navBarThemes);

    let userToken = localStorage.getItem("token");
    useEffect(() => {
        if (userToken) {
            try {
                const decode = jwtDecode(userToken);
                setUserId(decode._id);
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, [userToken]);

    useEffect(() => {
        if (isLoggedIn) {
            checkIfIsBusiness();
        }
    }, [isLoggedIn, checkIfIsBusiness]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        onSearchChange(event.target.value);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div
                    className="container-fluid"
                    style={{
                        backgroundColor: theme.background,
                        color: theme.color,
                        position: "fixed",
                        top: "0",
                        padding: "30px",
                        boxShadow: theme.shadow,
                        zIndex: "1000",
                        height: "90px",
                    }}
                >
                    <NavLink className="navbar-brand" style={{ fontSize: "2em", fontWeight: "900", color: theme.color }} to="/">
                        BCard
                    </NavLink>
                    <button
                        style={{ color: theme.background, backgroundColor: theme.color }}
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto ">
                            <li className="nav-item">
                                <NavLink style={{ fontWeight: "900", color: theme.color }} className="nav-link active" aria-current="page" to="/about">
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink style={{ fontWeight: "900", color: theme.color }} className="nav-link active" aria-current="page" to="/favcards">
                                    Fav Cards
                                </NavLink>
                            </li>
                            {isBusiness && (
                                <li className="nav-item">
                                    <NavLink style={{ fontWeight: "900", color: theme.color }} className="nav-link active" aria-current="page" to="/mycards">
                                        My Cards
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Button style={{ color: "black", textDecoration: "none", fontWeight: "900", color: theme.color }} variant="link">
                                    <i onClick={onModeChange} className="fa-solid fa-circle-half-stroke"></i>
                                </Button>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={inputValue} onChange={handleInputChange} />
                            <button style={{ backgroundColor: theme.btn, color: theme.btnTxtColor }} className="btn btn-outline-dark" type="submit">
                                Search
                            </button>
                        </form>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Button style={{ color: "black", textDecoration: "none", fontWeight: "900", color: theme.color }} variant="link" onClick={() => setShowLogOutModal(true)}>
                                    Log-Out
                                </Button>
                            </li>
                            <li className="nav-item">
                                <NavLink style={{ fontWeight: "900", color: theme.color }} className="nav-link active" aria-current="page" to={`/profile/${userId}`}>
                                    <i className="fa-solid fa-user"></i>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default LoggedInNavBar;
