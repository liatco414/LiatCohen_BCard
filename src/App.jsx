import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import LogIn from "./components/LogIn";
import { useState, useEffect } from "react";
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

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogOutModal, setShowLogOutModal] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isBusiness, setIsBusiness] = useState(false);
    const [createCard, setCreateCard] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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
                        <LoggedInNavBar setShowLogOutModal={handleLogOutModal} checkIfIsBusiness={handleBusinessUser} isBusiness={isBusiness} isLoggedIn={isLoggedIn} />
                        <Routes>
                            <Route path="/profile/:userId" element={<Profile />} />
                            <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} setIsBusiness={setIsBusiness} />} />
                            <Route path="/logout-modal" element={<LogOutModal />} />
                            <Route path="/favcards" element={<FavCards />} />
                            <Route path="/mycards" element={<MyCards setCreateCard={handleNewCardModal} setShowEditModal={handleEditCardModal} />} />
                            <Route path="/:cardId" element={<CardDetails />} />
                            <Route path="/cards/:cardId" element={<EditCard />} />
                            <Route path="profile/:userId/edit-user/:userId" element={<UpdateUser />} />
                        </Routes>
                    </>
                ) : (
                    <>
                        <NavBar setShowRegister={handleRegisterModal} setIsLoggedIn={setIsLoggedIn} />
                        <Routes>
                            <Route exact path="/cards/:cardId" element={<CardDetails />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
                            <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} onHide={handleLogOutModal} handleAddUser={handleAddUser} />} />
                        </Routes>
                    </>
                )}
            </BrowserRouter>
            <LogOutModal show={showLogOutModal} onHide={handleLogOutModal} handleLogOut={handleUserLogOut} />
            <SignUpModal show={showRegister} onHide={handleRegisterModal} setIsLoggedIn={setIsLoggedIn} />
            <CreateCardModal show={createCard} onHide={handleNewCardModal} />
        </>
    );
}

export default App;
