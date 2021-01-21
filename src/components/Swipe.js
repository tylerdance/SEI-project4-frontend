import useChat from "./chat/useChat";
import React, { useState } from "react";

function Swipe(props) {
 
  console.log(props)
    const roomId = props.user._id; 
    const user = props.me // Gets roomId from URL
    const { messages, sendMessage } = useChat(roomId, user); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState("");
    // const [account, setAccount] = useState([]);
    
 
  
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
          <img id="profilePic" src={props.user.image_url} />
          <div>
          <p id="user-name">Name: {props.user.name}</p>
          <p>Age: {props.user.age}</p> 
          <p>Bio: {props.user.bio}</p> 
          <p>Gender :{props.user.gender}</p> 
          <p>Likes: {props.user.preference}</p> 
          </div>
        
        
          {/* <p> Your profile was liked by</p> */}
          {/* <p>{messages.senderId}</p>  */}
          <button onClick={handleSendMessage} className="send-message-button">
            Like
          </button>
        </div>
    )
}

export default Swipe;