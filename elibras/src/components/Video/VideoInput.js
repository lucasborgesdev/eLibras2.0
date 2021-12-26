import React from "react";
import firebase from "../../firebase";
import ReactPlayer from "react-player";


export const VideoInput = ({ video }) => {
  const [link, setLink] = React.useState(video.name);

  return (
    <div>
      <input
        value={link}
        onChange={e => {
          setLink(e.target.value);
        }}
      />
      <button>Update</button>
    </div>
  );
};
