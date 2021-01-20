import useChat from "./chat/useChat";
import React, { useState } from "react";

function Swipe(props) {
    const roomId = props.id; 
    const user = props.me // Gets roomId from URL
    const { messages, sendMessage } = useChat(roomId, user); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState("");
    // const [account, setAccount] = useState([]);
    
    const [currentUser, serCurrentUser] = useState(props.name)
  
    const handleNewMessageChange = (event) => {
      setNewMessage(event.target.value);
      console.log(props.user.name)
      console.log(user + '!!!!!!')
    };
  
    const handleSendMessage = () => {
      console.log(roomId);
      sendMessage(newMessage);
      setNewMessage("liked");
      alert("Your like has been sent!!")
    };
    
    return(
        <div className="like-button">
          <p id="user-name">{props.name} </p>
          {/* <p>{props.id}</p> */}
          {/* <p> Your profile was liked by</p> */}
          {/* <p>{messages.senderId}</p>  */}
          <button onClick={handleSendMessage} className="send-message-button">
            Like
          </button>
        </div>
    )
}

export default Swipe;