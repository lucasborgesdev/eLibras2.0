import React from "react";
import firebase from "../../firebase";
import Navbar from "../../components/google-drive/Navbar";
import { database } from "../../firebase"
import "./glossary.css";
import { Button, Row } from "react-bootstrap";
import { GlossaryInput } from "../../components/Glossary/glossaryImput";

function Glossary() {
  const [publications, setPublications] = React.useState([]);
  const [newPublish, setNewPublish] = React.useState();
  const [removeLoader, setRemoveLoader] = React.useState(false);

  React.useEffect(() => {
    const db = firebase.firestore();
    const dbUnSubscribe = db
      .collection("publications")
      .onSnapshot((snapshot) => {
        const publishData = [];
        snapshot.forEach((doc) =>
          publishData.push({ ...doc.data(), id: doc.id }));
        setPublications(publishData);
      });

    return dbUnSubscribe;
  }, []);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("publications").add({ content: newPublish, createdAt: database.getCurrentTimestamp(), });
    setNewPublish('')
  };

  return (
    <div>
      <Navbar />
      <div className="pageGlosssary d-flex justify-content-center">
        <Row>
          <div className="pageGlosssary">
            <h3>Glossário</h3>
            <div className="container">
             <div className="imputLabel">
             <input
                type="text"
                className="divInput"
                value={newPublish}
                onChange={(e) => setNewPublish(e.target.value)}
              />
              <Button
                className="inputPublish"
                variant="primary"
                onClick={onCreate}
              >
                Adicionar
              </Button>
             </div>
              <table class="table ">
                <thead>
                  <tr>
                    <th>Publicações</th>
                  </tr>
                </thead>
                <tbody>
                  {publications.map((publication) => (
                    <tr>
                      <td key={publication.key}>
                        <GlossaryInput publication={publication} />
                        <p>{publication.content}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Row>
      </div>
     
    </div>
  );
}

export default Glossary;
