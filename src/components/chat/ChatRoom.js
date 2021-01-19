import React, { useState } from "react";
import useChat from "./useChat";

const ChatRoom = (props) => {
    const { roomId } = props.match.params; 
    const user = props.user.name// Gets roomId from URL
    const { messages, sendMessage } = useChat(roomId, user); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState("");
    
    // const [currentUser, serCurrentUser] = useState(props.user.name)

    const handleNewMessageChange = (event) => {
      setNewMessage(event.target.value);
      console.log(props.user.name)
      console.log(user + '!!!!!!')
    };

 
    

    const handleSendMessage = () => {
      sendMessage(newMessage);
      setNewMessage("");
      alert("Your like has been sent!!")
    };

    return (
      <div className="chat-room-container">
        <h1>{props.user.name}</h1>
        <h1 className="room-name">Room: {roomId}</h1>
        <div className="messages-container">
          <div className="messages-list">
            {messages.map((message, i) => (
              
              <p
                key={i}
                className={`message-item ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              > 
                { props.user.id !== roomId ?
                <div></div> :
                <div>
               <p> Your profile was liked by</p>
               <p>{message.senderId}</p> 
               </div>
              }
              </p>
            ))}
          </div>
        </div>
        { props.user.id !== roomId ?
         <div>
        
        {/* <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          className="new-message-input-field"
        /> */}
       
        <button onClick={handleSendMessage} className="send-message-button">
          Like
        </button> 
        </div> : 
        <div></div>
        }
      </div>
    )};
;

export default ChatRoom;