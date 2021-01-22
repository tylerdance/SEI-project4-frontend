import React,{useState} from "react";


const Chat = (props) => {
    const [text, setText] = useState("");
    const handleRoomNameChange = (event) => {
    setText(event.target.value);
  };
console.log(props)
  return (
    <div className="home-container">
  
      <input
        type="text"
        placeholder="enter message"
        value={text}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      {/* <Link to={`/chat/${props.id}`} className="enter-room-button">
        Join room
      </Link> */}
    </div>
  );
};

export default Chat;