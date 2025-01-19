import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { appThemes } from "../App";

function LogOutModal({ show, onHide, handleLogOut }) {
    const theme = useContext(appThemes);
    return (
        <>
            <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{ backgroundColor: theme.background, color: theme.color }}>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ backgroundColor: theme.background, color: theme.color }}>
                        Log-Out
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: theme.background, color: theme.color }}>
                    <p>Are you sure you want to log-out?</p>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: theme.background, color: theme.color }}>
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            handleLogOut();
                        }}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LogOutModal;
