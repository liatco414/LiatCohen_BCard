import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import LogIn from "./components/LogIn";
import { useState, useEffect, createContext } from "react";
import LoggedInNavBar from "./components/LoggedInNavBar";
import LogOutModal from "./components/LogOutModal";
import { ToastContainer } from "react-toastify";
import { successMsg } from "./services/feedbackService";
import SignUpModal from "./components/SignUpModal";
import FavCards from "./components/FavCards";
import MyCards from "./components/MyCards";
import { jwtDecode } from "jwt-decode";
import CreateCardModal from "./components/createCardModal";
import CardDetails from "./components/cardDetails";
import EditCard from "./components/EditCard";
import CreateCard from "./components/CreateCard";
import UpdateUser from "./components/UpdateUser";
import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";

const themes = {
    light: {
        background: "rgb(250, 242, 255)",
        color: "black",
        shadow: "3px 3px 8px black",
        btn: "black",
    },
    dark: {
        background: "rgb(67, 63, 70)",
        color: "white",
        shadow: "3px 3px 8px white",
        btn: "white",
    },
};

const navBarTheme = {
    light: {
        background: "rgba(137, 54, 238, 0.67)",
        color: "black",
        shadow: "3px 3px 8px black",
        btn: "rgba(250, 242, 255, 0)",
        btnTxtColor: "white",
    },
    dark: {
        background: "rgb(25, 23, 28)",
        color: "rgb(231, 218, 245)",
        shadow: "3px 3px 8px white",
        btn: "rgb(250, 242, 255)",
        btnTxtColor: "black",
    },
};
const cardThemes = {
    light: {
        background: "rgb(250, 242, 255)",
        color: "black",
        shadow: "2px 2px 5px black",
    },
    dark: {
        background: "rgb(36, 35, 36)",
        color: "rgb(231, 218, 245)",
        shadow: "2px 2px 5px white",
    },
};

export let cardTheme = createContext(cardThemes.light);
export let appThemes = createContext(themes.light);
export let navBarThemes = createContext(navBarTheme.light);

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogOutModal, setShowLogOutModal] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isBusiness, setIsBusiness] = useState(false);
    const [createCard, setCreateCard] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem("ModeState");
        if (savedMode) {
            setDarkMode(savedMode === "true");
        }
    }, []);

    const handleModeChange = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("ModeState", newMode);
            return newMode;
        });
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const handleEditCardModal = () => {
        setShowEditModal(!showEditModal);
    };

    const handleNewCardModal = () => {
        setCreateCard(!createCard);
    };

    const handleBusinessUser = () => {
        const userToken = localStorage.getItem("token");

        if (userToken) {
            const decoded = jwtDecode(userToken);
            const business = Boolean(decoded.isBusiness);
            setIsBusiness(business);
        }
    };

    let handleRegisterModal = () => {
        setShowRegister(!showRegister);
    };

    const handleAddUser = () => {
        setShowRegister(false);
        successMsg("User is now registered :)");
        handleBusinessUser();
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    let handleLogOutModal = () => {
        setShowLogOutModal(!showLogOutModal);
    };
    let navigateToHome = () => {
        window.location.href = "/";
    };

    let handleUserLogOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        setShowLogOutModal(false);
        successMsg("User logged out successfully");
        navigateToHome();
    };

    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                {isLoggedIn ? (
                    <>
                        <navBarThemes.Provider value={darkMode ? navBarTheme.dark : navBarTheme.light}>
                            <LoggedInNavBar
                                setShowLogOutModal={handleLogOutModal}
                                checkIfIsBusiness={handleBusinessUser}
                                isBusiness={isBusiness}
                                isLoggedIn={isLoggedIn}
                                onSearchChange={handleSearchChange}
                                onModeChange={handleModeChange}
                            />
                        </navBarThemes.Provider>
                        <cardTheme.Provider value={darkMode ? cardThemes.dark : cardThemes.light}>
                            <appThemes.Provider value={darkMode ? themes.dark : themes.light}>
                                <Routes>
                                    <Route path="/profile/:userId" element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
                                    <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} setIsBusiness={setIsBusiness} searchTerm={searchTerm} />} />
                                    <Route path="/logout-modal" element={<LogOutModal />} />
                                    <Route path="/favcards" element={<FavCards />} />
                                    <Route
                                        path="/mycards"
                                        element={<MyCards setIsLoggedIn={setIsLoggedIn} setCreateCard={handleNewCardModal} setShowEditModal={handleEditCardModal} searchTerm={searchTerm} />}
                                    />{" "}
                                    <Route path="/:cardId" element={<CardDetails />} />
                                    <Route path="/cards/:cardId" element={<EditCard />} />
                                    <Route path="profile/:userId/edit-user/:userId" element={<UpdateUser />} />
                                    <Route path="/about" element={<About />} />
                                </Routes>
                                <navBarThemes.Provider value={darkMode ? navBarTheme.dark : navBarTheme.light}>
                                    <Footer />
                                </navBarThemes.Provider>
                            </appThemes.Provider>
                        </cardTheme.Provider>
                    </>
                ) : (
                    <>
                        <navBarThemes.Provider value={darkMode ? navBarTheme.dark : navBarTheme.light}>
                            <NavBar setShowRegister={handleRegisterModal} setIsLoggedIn={setIsLoggedIn} onSearchChange={handleSearchChange} onModeChange={handleModeChange} />
                        </navBarThemes.Provider>
                        <cardTheme.Provider value={darkMode ? cardThemes.dark : cardThemes.light}>
                            <appThemes.Provider value={darkMode ? themes.dark : themes.light}>
                                <Routes>
                                    <Route exact path="/cards/:cardId" element={<CardDetails />} />
                                    <Route path="/" element={<Home searchTerm={searchTerm} />} />
                                    <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} setShowRegister={handleRegisterModal} />} />
                                    <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} onHide={handleLogOutModal} handleAddUser={handleAddUser} />} />
                                    <Route path="/about" element={<About />} />
                                </Routes>
                                <navBarThemes.Provider value={darkMode ? navBarTheme.dark : navBarTheme.light}>
                                    <Footer />
                                </navBarThemes.Provider>
                            </appThemes.Provider>
                        </cardTheme.Provider>
                    </>
                )}
            </BrowserRouter>
            <appThemes.Provider value={darkMode ? themes.dark : themes.light}>
                <LogOutModal show={showLogOutModal} onHide={handleLogOutModal} handleLogOut={handleUserLogOut} />
                <SignUpModal show={showRegister} onHide={handleRegisterModal} setIsLoggedIn={setIsLoggedIn} />
                <CreateCardModal show={createCard} onHide={handleNewCardModal} />
            </appThemes.Provider>
        </>
    );
}

export default App;
