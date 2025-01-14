import { Button, Modal } from "react-bootstrap";
import CreateCard from "./CreateCard";

function CreateCardModal({ show, onHide, setIsLoggedIn }) {
    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered style={{ height: "90%", overflowY: "hidden" }}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    paddingBottom: "60px",
                    paddingTop: "140px",
                }}
            >
                <CreateCard />
            </Modal.Body>
        </Modal>
    );
}

export default CreateCardModal;
