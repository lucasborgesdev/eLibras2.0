import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import Navbar from "../../components/google-drive/Navbar";
import { VideoInput } from "../../components/Video/VideoInput";
import Loader from "../../components/layout/Loader/Loader";
import ReactPlayer from "react-player";
import { Row, Button, Table } from "react-bootstrap";
import "./styles.css";

// import { Container } from './styles';
console.log("Aqui não temos arrego!");

function LinkVideo() {
  const [videos, setVideos] = React.useState([]);
  const [newVideo, setNewVideo] = React.useState();
  const [removeLoader, setRemoveLoader] = React.useState(false);

  React.useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection("videos").onSnapshot((snapshot) => {
      const videosData = [];
      snapshot.forEach((doc) => videosData.push({ ...doc.data(), id: doc.id }));
      setVideos(videosData);
    });

    callLoader();
    return unsubscribe;
  }, []);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("videos").add({ link: newVideo });
    callLoader();
  };

  function callLoader() {
    setRemoveLoader(false);
    setTimeout(() => {
      setRemoveLoader(true);
    }, 1500);
  }

  console.log(videos);
  return (
    <>
      <Navbar />
      <div className="pageVideo d-flex justify-content-center">
        <Row className="">
          <div className="">
            <h3 className="title-video">Repositorio de videos</h3>

            <div className="divImput">
              <input
                className="videoImputs"
                value={newVideo}
                onChange={(e) => setNewVideo(e.target.value)}
              />
              <Button className="videoImputs" variant="primary" onClick={onCreate}>
                Adicionar
              </Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Conteúdo</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video) => (
                    <tr>
                      <td className="videoTD" key={video.link}>
                        <VideoInput video={video} callLoader={callLoader} />
                        <ReactPlayer
                          className=""
                          url={video.link}
                          width="100%"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          {!removeLoader && <Loader />}
        </Row>
      </div>
    </>
  );
}

export default LinkVideo;
