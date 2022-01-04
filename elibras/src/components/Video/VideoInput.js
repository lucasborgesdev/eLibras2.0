import firebase from "firebase";
import { Row,Button } from "react-bootstrap";
import React from "react";



export const VideoInput = ({ video,callLoader }) => {
  const [link, setLink] = React.useState(video.link);

  const onUpdate = () => {
    callLoader()
    const db = firebase.firestore()
    db.collection('videos').doc(video.id).set({...video, link})
  }
  const onDelete = () => {
    callLoader()
    const db = firebase.firestore()
    db.collection('videos').doc(video.id).delete()
  }

  return (
    <div>
      <input
        value={link}
        onChange={(e) => {
          setLink(e.target.value);
        }}
      />
      <Button variant="warning" onClick={onUpdate}>Atualizar</Button>
      <Button variant="danger" onClick={onDelete}>Deletar</Button>
    </div>
  );
};
