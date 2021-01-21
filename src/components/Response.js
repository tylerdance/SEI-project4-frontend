import useChat from "./chat/useChat";
import Chat from "./chat/Chat"
import React, { useState } from "react";

function Response (props){
    const roomId = props.room; 
    const user = props.name // Gets roomId from URL
    const id = props.id
    const { messages, sendMessage } = useChat(roomId, user, id); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState("Let's Chat(message)");
  
    const handleSendMessage = () => {
        document.getElementById(`${props.room}`).style.display="block"
        document.getElementById('initiateChat').style.display="none"
        console.log(roomId);
        sendMessage(newMessage);
        setNewMessage("liked");
    
      };
    return (
       <div>
            <button  id="initiateChat" onClick={handleSendMessage}>Initiate Chat</button>
            <div className="chat" id={props.room}>
            <Chat  />
            </div>
       </div>
    )
}

export default Response;