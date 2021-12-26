import firebase from "firebase";
import React from "react";



export const VideoInput = ({ video }) => {
  const [link, setLink] = React.useState(video.link);

  const onUpdate = () => {
    const db = firebase.firestore()
    db.collection('videos').doc(video.id).set({...video, link})
  }
  const onDelete = () => {
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
      <button onClick={onUpdate}>Atualizar</button>
      <button onClick={onDelete}>Deletar</button>
    </div>
  );
};
