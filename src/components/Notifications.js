import axios from "axios";
import Axios from 'axios'
import React, { useEffect, useState } from "react";
import useChat from "./chat/useChat";
import Sort from './Sort'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Notifications = (props) => {
  const { roomId } = props.match.params; 
  const user = props.user.name// Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId, user); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState("");
  const [account, setAccount] = useState([]);
  
  // const [currentUser, serCurrentUser] = useState(props.user.name)

  // const handleNewMessageChange = (event) => {
  //   setNewMessage(event.target.value);
  //   console.log(props.user.name)
  //   console.log(user + '!!!!!!')
  // };

  // const handleSendMessage = () => {
  //   sendMessage(newMessage);
  //   setNewMessage("");
  //   alert("Your like has been sent!!")
  // };

  const getAllUsers = () => {
    Axios.get(`${REACT_APP_SERVER_URL}/api/users/users`)
    .then(async res => {
      console.log(res.data);
      await setAccount(res.data.user)
      console.log(account);
    }).catch(err => {
      console.log(err);
    })
  }
  
  useEffect(() => {
    getAllUsers()
  }, [])

  useEffect(() => {   
  }, [])
  console.log(account);

  return (
    <div>
      <div className="chat-room-container">
        <h1>{props.user.name}</h1>
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
        { props.user.id !== roomId 
        ?
         <div>
        {/* <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          className="new-message-input-field"
        /> */}
        {/* <button onClick={handleSendMessage} className="send-message-button">
          Like
        </button>  */}
        </div> 
        : 
        <div></div>
        }
      </div>
      <Sort user={account} me={props.user.name} />
    </div>
)};

export default Notifications;