import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SignUp from "./SignUp";

function LoggedInNavBar({ setShowLogOutModal, checkIfIsBusiness, isBusiness, isLoggedIn }) {
    let [userId, setUserId] = useState(null);
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

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div
                    className="container-fluid"
                    style={{
                        backgroundColor: "rgba(157, 225, 157, 0.669)",
                        position: "fixed",
                        top: "0",
                        padding: "30px",
                        boxShadow: "2px 2px 6px rgb(72, 72, 72)",
                        zIndex: "1000",
                        height: "90px",
                    }}
                >
                    <NavLink className="navbar-brand" style={{ fontSize: "2em", fontWeight: "900" }} to="/">
                        BCard
                    </NavLink>
                    <button
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
                                <NavLink style={{ fontWeight: "900" }} className="nav-link active" aria-current="page" to="/about">
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink style={{ fontWeight: "900" }} className="nav-link active" aria-current="page" to="/favcards">
                                    Fav Cards
                                </NavLink>
                            </li>
                            {isBusiness && (
                                <li className="nav-item">
                                    <NavLink style={{ fontWeight: "900" }} className="nav-link active" aria-current="page" to="/mycards">
                                        My Cards
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Button style={{ color: "black", textDecoration: "none", fontWeight: "900" }} variant="link" onClick={() => setShowLogOutModal(true)}>
                                    Log-Out
                                </Button>
                            </li>
                            <li className="nav-item">
                                <NavLink style={{ fontWeight: "900" }} className="nav-link active" aria-current="page" to={`/profile/${userId}`}>
                                    profile
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
