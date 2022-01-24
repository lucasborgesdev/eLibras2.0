import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";
import { useAuth } from "../../contexts/AuthContext";
import Folder from "./Folder";
import File from "./File";
import Navbar from "./Navbar";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { Form, Button, Modal, Card, Alert } from "react-bootstrap";
import firebase from "../../firebase";
import { database } from "../../firebase";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { folderId } = useParams();
  const { state = {} } = useLocation();

  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [idactor, set_idactor] = React.useState("");
  const [institutions, setInstitutions] = React.useState([]);
  const [selectInstitution, setSelectInstitution] = React.useState([]);
  const [selectActor, setSelectActor] = React.useState([]);
  const [actors, setActors] = React.useState([]);
  const [relationship, setRelationship] = React.useState([]);
  const [getUser, setGetUSer] = React.useState({});

  React.useEffect(() => {
    const db = firebase.firestore();
    const dbInstitutions = db
      .collection("Institution")
      .onSnapshot((snapshot) => {
        const institutionData = [];
        snapshot.forEach((doc) =>
          institutionData.push({ ...doc.data(), id: doc.id })
        );
        setInstitutions(institutionData);
      });

    return dbInstitutions;
  }, []);

  React.useEffect(() => {
    const db = firebase.firestore();
    const dbActor = db.collection("actor").onSnapshot((snapshot) => {
      const actorData = [];
      snapshot.forEach((doc) => actorData.push({ ...doc.data(), id: doc.id }));
      setActors(actorData);
    });

    return dbActor;
  }, []);

  React.useEffect(() => {
    const db = firebase.firestore();
    const dbRelationship = db
      .collection("relationship")
      .onSnapshot((snapshot) => {
        const relationshipData = [];
        snapshot.forEach((doc) =>
          relationshipData.push({ ...doc.data(), id: doc.id })
        );
        setRelationship(relationshipData);
      });

    return dbRelationship;
  }, []);

  React.useEffect(() => {
    const db = firebase.firestore();
    const dbGetUSer = db
      .collection("relationship")
      .where("user_Id", "==", currentUser.uid)
      .onSnapshot((snapshot) => {
        const getUserData = [];
        snapshot.forEach((doc) => {
          getUserData.push({ ...doc.data(), id: doc.id });
        });
        setGetUSer(getUserData);
      });

    return dbGetUSer;
  }, []);

  React.useEffect(() => {
    //if (!getUser) return "sem dado";
    
    if (getUser[0] != undefined) {
      console.log("aaa to com depressao:", getUser[0]);

      let { id_actor } = getUser[0];

      set_idactor(id_actor);
    }
  }, [getUser]);

  //console.log("id_actor", idactor);

  const createRelationship = () => {
    const db = firebase.firestore();
    db.collection("relationship").add({
      user_Id: currentUser.uid,
      id_institution: selectInstitution,
      id_actor: selectActor,
      createdAt: database.getCurrentTimestamp(),
    });
    handleClose();
  };

  
console.log('user.uid', currentUser.uid)
  console.log("getUser", getUser);
  console.log(idactor);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Navbar />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) => (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}
      </Container>
      <div className="modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Bem vindo!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Verificamos que esse é o seu primeiro acesso, preencha os dados por
            favor!{" "}
          </Modal.Body>

          <Form onSubmit={createRelationship}>
            <Form.Group id="Institution">
              <Form.Label>Instituição</Form.Label>

              <Form.Control
                as="select"
                value={selectInstitution}
                onChange={(e) => {
                  setSelectInstitution(e.target.value);
                }}
              >
                <option>Selecione uma opção</option>
                {institutions.map((institution) => (
                  <option key={institution.key} value={institution.id}>
                    {institution.Nome}
                  </option>
                ))}
              </Form.Control>
              <Form.Label>Voce é ?</Form.Label>

              <Form.Control
                as="select"
                value={selectActor}
                onChange={(e) => {
                  setSelectActor(e.target.value);
                }}
              >
                <option>Selecione uma opção</option>
                {actors.map((actor) => (
                  <option key={actor.key} value={actor.idActor}>
                    {actor.Nome}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={createRelationship}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
