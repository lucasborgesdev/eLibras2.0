import firebase from "firebase";

import React, { useState } from "react";
import {Button, Modal } from "react-bootstrap";

export const GlossaryInput = ({ publication }) => {
  const [content, setContent] = React.useState(publication.content);

  //modal costs

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function AlertDismissible() {
    return <></>;
  }

  const onUpdate = () => {
    const db = firebase.firestore();
    db.collection("publications")
      .doc(publication.id)
      .set({ ...publication, content });
    handleClose();
    AlertDismissible();
  };

  const onDelete = () => {
    const db = firebase.firestore();
    db.collection("publications").doc(publication.id).delete();
    handleClose();
  };

  return (
    <div className="">
      <div className="modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>MODAL FODA</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className=""
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button className="" variant="warning" size="sm" onClick={onUpdate}>
              Atualizar
            </Button>
            <Button className="" variant="danger" size="sm" onClick={onDelete}>
              Deletar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="">
        <Button className="" variant="info" size="sm" onClick={handleShow}>
          Editar
        </Button>
      </div>
    </div>
  );
};
