import React from "react"
import { Container } from "react-bootstrap"
import { useFolder } from "../../hooks/useFolder"
import AddFolderButton from "./AddFolderButton"
import AddFileButton from "./AddFileButton"
import Folder from "./Folder"
import File from "./File"
import Navbar from "./Navbar"
import FolderBreadcrumbs from "./FolderBreadcrumbs"
import { useParams, useLocation } from "react-router-dom"
import { useState } from "react"
import { Form, Button, Modal,Card, Alert } from "react-bootstrap";
import firebase from "../../firebase";

export default function Dashboard() {
  
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [institutions, setInstitutions] = React.useState([]);
  const [actors, setActors] = React.useState([]);





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
    const dbActor = db
      .collection("actor")
      .onSnapshot((snapshot) => {
        const actorData = [];
        snapshot.forEach((doc) =>
        actorData.push({ ...doc.data(), id: doc.id })
        );
        setActors(actorData);
      });

    return dbActor;

  }, []);


  
  function validadeUser () {

   
    
    return (
      <>
      
      </>
    )
  }

  //console.log(childFolders)
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
            {childFolders.map(childFolder => (
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
            {childFiles.map(childFile => (
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
        <Modal.Body>Verificamos que esse é o seu primeiro acesso, preencha os dados por favor! </Modal.Body>
        <Form >
        <Form.Group id="Institution">
            <Form.Label>Instituição</Form.Label>
             
             <Form.Control as= "select">
              {institutions.map((institution) => (
                <option key={institution.key}>{institution.Nome}</option>
              ))}
             </Form.Control> 
             <Form.Label>Voce é ?</Form.Label>
             
             <Form.Control as= "select">
              {actors.map((actor) => (
                <option key={actor.key}>{actor.Nome}</option>
              ))}
             </Form.Control> 

              
            </Form.Group>
            </Form >

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  )
}
