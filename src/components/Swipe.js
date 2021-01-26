import useChat from "./chat/useChat";
import React, { useState } from "react";
import axios from "axios";

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Swipe(props) {
  
  console.log(props.user)
    const roomId = props.user._id; 
    const user = props.me // Gets roomId from URL
    const id = props.id
    const type ="swipe"
    const image =props.pic
    const time = Date.now()
    // console.log(props)
    const { messages, sendMessage } = useChat(roomId, user, id, type, image, time); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState(`I like your profile!`);
    // const [account, setAccount] = useState([]);
    const [notifications, setNotifications] = useState([])
 
  
    const handleNewMessageChange = (event) => {
      setNewMessage(event.target.value);
      // console.log(props.user.name)
      // console.log(user + '!!!!!!')
    };
  
    const handleSendMessage = () => {
      document.getElementById(props.user.image_url).style.display="none";
      // console.log(roomId);
      sendMessage(newMessage);
      setNewMessage(`Your profile was liked by ${props.me}`);
      // alert("Your like has been sent!!")

      const notificationData = {
        id: props.id,
        content: `${props.me} liked your profile!`,
        date: Date.now(),
        my_id: roomId,
        type: 'swipe',
        read: false,
        pic: props.pic,
        email: props.user.email,
        name: props.me
      }
      console.log('i am frontend email', props.email);

      axios.post(`${REACT_APP_SERVER_URL}/api/users/notifications`, notificationData)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    };

    const handleSwipeChange = () =>{
      document.querySelector('.this').style.display="block";
      
      props.toggle()
   
    }
    
    return(
      <div>
        
        {props.user.length===0
            ?
            <p>Sorry We Couldn't Find Anyone in your area!</p> 
            :
          <div className="like-button">
            <div className="like-button">
        <button className="swipe" onClick={handleSwipeChange}>Swipe</button>
        </div>
          <div id="me">
                 <div>
          <img className="profilePic" src={props.user.image_url} />
          
          <p id="user-name">{props.user.name}</p>
          <p>Age: {props.user.age}</p> 
          <p>Bio: {props.user.bio}</p> 
          <p>Location {props.user.location}</p>
          <p>Gender: {props.user.gender}</p> 
          <p>Likes: {props.user.preference}</p> 
          </div>
        
          </div>
          <div className="like-button">
          <button id={props.user.image_url} onClick={handleSendMessage} className="swipe this">
            Like
          </button>
          </div>
          </div>
            
            }
       
        
        </div>
    )
}

export default Swipe;