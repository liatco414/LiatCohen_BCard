import { Button, Modal } from "react-bootstrap";
import SignUp from "./SignUp";
import { useContext } from "react";
import { appThemes } from "../App";

function SignUpModal({ show, onHide, setIsLoggedIn }) {
    const theme = useContext(appThemes);
    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered style={{ height: "100%" }}>
            <Modal.Header closeButton style={{ backgroundColor: theme.background, color: theme.color }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ backgroundColor: theme.background, color: theme.color }}>
                    Register
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: theme.background, color: theme.color }}>
                <SignUp setIsLoggedIn={setIsLoggedIn} onHide={onHide} />
            </Modal.Body>
        </Modal>
    );
}

export default SignUpModal;
