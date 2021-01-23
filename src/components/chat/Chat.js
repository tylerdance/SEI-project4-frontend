import React,{useState} from "react";
import useChat from "./useChat"

const Chat = (props) => {
  /////////////////////
  const roomId = props.room
  const user = props.me // Gets roomId from URL
  const id = props.room
  const type ="chat"
  const image =props.pic
  const time = Date.now()
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
    
  {messages.map((message, i) => (
    <div>
    <p
      key={i}
      className={`message-item ${
        message.ownedByCurrentUser ? "my-message" : "received-message"
      }`}
    > 
    
      <div >
       
      { props.id === message.senderId ?
      <div className="youSay">
            <img className="profilePic" src={message.image}/>
            <p>You replied :</p>
            <p> {message.body}</p>
          
      </div>
      :
      <div>
          <img className="profilePic" src={message.image}/>
          <p>{message.senderId} says:</p>
          <p> {message.body}</p>
        
      </div>
} 

 

     
    
     </div>
    
    
    </p>
   

    </div>

  ))}


<div id={messages.time}>
      <input
        type="text"
        placeholder="enter message"
        value={newMessage}
        onChange={handleNewMessageChange}
        className="text-input-field"
      />
      <button className="swipe" onClick={handleSendMessage}>Send</button>
   
      </div>

    </div>
  );
};

export default Chat;