import React, { useState } from "react";
import useChat from "./useChat";

const ChatRoom = (props) => {
    const { roomId } = props.match.params; 
    const user = props.user.name// Gets roomId from URL
    const { messages, sendMessage } = useChat(roomId, user); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState(""); // Message to be sent
    // const [currentUser, serCurrentUser] = useState(props.user.name)

    const handleNewMessageChange = (event) => {
      setNewMessage(event.target.value);
      console.log(props.user.name)
      console.log(user + '!!!!!!')
    };

    const handleSendMessage = () => {
      sendMessage(newMessage);
      setNewMessage("");
    };

    return (
      <div className="chat-room-container">
        <h1 className="room-name">Room: {roomId}</h1>
        <div className="messages-container">
          <ol className="messages-list">
            {messages.map((message, i) => (
              <li
                key={i}
                className={`message-item ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              > 
               <p> {message.body}</p>
               <p>{message.senderId}</p> 
              </li>
            ))}
          </ol>
        </div>
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          className="new-message-input-field"
        />
        <button onClick={handleSendMessage} className="send-message-button">
          Send
        </button>
      </div>
    );
};

export default ChatRoom;