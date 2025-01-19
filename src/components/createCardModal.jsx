import { Button, Modal } from "react-bootstrap";
import CreateCard from "./CreateCard";
import { useContext } from "react";
import { appThemes } from "../App";

function CreateCardModal({ show, onHide, setCards }) {
    const theme = useContext(appThemes);
    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered style={{ height: "90%", overflowY: "hidden" }}>
            <Modal.Header closeButton style={{ backgroundColor: theme.background, color: theme.color }}>
                <Modal.Title id="contained-modal-title-vcenter">Create Card</Modal.Title>
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
                    backgroundColor: theme.background,
                    color: theme.color,
                }}
            >
                <CreateCard show={show} onHide={onHide} setCards={setCards} />
            </Modal.Body>
        </Modal>
    );
}

export default CreateCardModal;
