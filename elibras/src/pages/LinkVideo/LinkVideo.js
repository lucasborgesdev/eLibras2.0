import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import Navbar from "../../components/google-drive/Navbar";
import {VideoInput} from "../../components/Video/VideoInput";
import Loader from "../../components/layout/Loader/Loader";
import ReactPlayer from "react-player";

// import { Container } from './styles';
console.log("Aqui não temos arrego!");

function LinkVideo() {
  const [videos, setVideos] = React.useState([]);
  const [newVideo, setNewVideo] = React.useState();
  const [removeLoader, setRemoveLoader] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("videos").get();
      console.log(data.link);
      setVideos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setTimeout(() => {
        setRemoveLoader(true);
      }, 3000);
    };
    fetchData();
  }, []);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("videos").add({ link: newVideo });
  };

  console.log(videos);
  return (
    <>
      <Navbar />

      <div className="row">
        <div className="col-md-8 offset-md-1">
          <input
            value={newVideo}
            onChange={(e) => setNewVideo(e.target.value)}
          />
          <button onClick={onCreate}>Add</button>
          <ul>
            {videos.map((video) => (
              <li key = {video.link}>
                <VideoInput video={video}/>
                <ReactPlayer url={video.link} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {!removeLoader && <Loader />}
    </>
  );
}

export default LinkVideo;
