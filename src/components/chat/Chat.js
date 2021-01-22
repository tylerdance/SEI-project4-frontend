import React,{useState} from "react";
import useChat from "./useChat"

const Chat = (props) => {
  /////////////////////
  const roomId = props.room
  const user = props.me // Gets roomId from URL
  const id = props.id
  const type ="chat"
  const image =props.pic
  // console.log(props)
  const { messages, sendMessage } = useChat(roomId, user, id, type, image); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(``);

  /////////////////////
    const [text, setText] = useState("");
    const handleRoomNameChange = (event) => {
    setText(event.target.value);
  };
console.log(props)

const handleSendMessage = (e) => {

  console.log(roomId);
  sendMessage(newMessage);
  setNewMessage(e.target.value);

};

const handleNewMessageChange = (event) => {
  setNewMessage(event.target.value);

};
  return (
    <div className="home-container">
  
      <input
        type="text"
        placeholder="enter message"
        value={newMessage}
        onChange={handleNewMessageChange}
        className="text-input-field"
      />
      <button className="swipe" onClick={handleSendMessage}>Send</button>
      {/* <Link to={`/chat/${props.id}`} className="enter-room-button">
        Join room
      </Link> */}
    </div>
  );
};

export default Chat;