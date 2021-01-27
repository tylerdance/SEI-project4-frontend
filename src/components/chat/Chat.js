import React,{useState} from "react";
import useChat from "./useChat"
import axios from 'axios'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

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

props.reload(messages)
const handleSendMessage = (e) => {
  if(newMessage === ''){
    return
  }

  
  sendMessage(newMessage);
  setNewMessage(e.target.value);
  
  const notificationData = {
    id: props.id,
    content: newMessage,
    date: Date.now(),
    my_id: props.saveMessage,
    type: 'chat',
    read: false,
    pic: props.pic,
    email: props.email,
    name: props.me
  }

  axios.post(`${REACT_APP_SERVER_URL}/api/users/notifications`, notificationData)
  .then(res => {
    // console.log(`message to ${props.saveMessage}`)
  }).catch(err => {
    // console.log(err);
  })
  

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
      <div>
       
       
      </div>
    
      <div >
       
      { props.me === message.senderId?
      <div className="youSay">
            <img className="iconPic" src={message.image}/>
            <p> {message.body}</p>
          
      </div>
      :
      <div>
          <img className="iconPic" src={message.image}/>
          <p>{message.senderId} says:</p>
          <p> {message.body}</p>
        
      </div>
} 

 

     
    
     </div>
    
    
    </p>
   

    </div>

  )
  
  )
  
  
  }


<div id={messages.time}>
      <input
        className="imputtowa"
        type="text"
        placeholder="enter message"
        value={newMessage}
        onChange={handleNewMessageChange}
        // className="text-input-field"
      />
      <button className="send" id={props.room+props.me}onClick={handleSendMessage}>Send</button>
   
      </div>

    </div>
    
  );
  
};

export default Chat;