import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { navBarThemes } from "../App";

function NavBar({ setShowRegister, onSearchChange, onModeChange }) {
    const [inputValue, setInputValue] = useState("");

    const theme = useContext(navBarThemes);

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
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        style={{ backgroundColor: theme.color, color: theme.background }}
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
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Button style={{ color: "black", textDecoration: "none", fontWeight: "900", color: theme.color }} variant="link">
                                    <i onClick={onModeChange} className="fa-solid fa-circle-half-stroke"></i>
                                </Button>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleInputChange} />
                            <button style={{ backgroundColor: theme.btn, color: theme.btnTxtColor }} className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink style={{ fontWeight: "900", color: theme.color }} className="nav-link active" aria-current="page" to="/login">
                                    LogIn
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink style={{ fontWeight: "900", color: theme.color }} className="nav-link active" aria-current="page" to="/" onClick={() => setShowRegister(true)}>
                                    Register
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
