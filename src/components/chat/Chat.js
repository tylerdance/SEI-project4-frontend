import React from "react";
import { Link } from "react-router-dom";

const Chat = (props) => {
    const [roomName, setRoomName] = React.useState("");
    const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div className="home-container">
      {/* <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      /> */}
      <Link to={`/chat/${props.id}`} className="enter-room-button">
        Join room
      </Link>
    </div>
  );
};

export default Chat;