import { Button, Modal } from "react-bootstrap";
import SignUp from "./SignUp";

function SignUpModal({ show, onHide, setIsLoggedIn }) {
    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered style={{ height: "100%" }}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SignUp setIsLoggedIn={setIsLoggedIn} onHide={onHide} />
            </Modal.Body>
        </Modal>
    );
}

export default SignUpModal;
