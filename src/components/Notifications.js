
import Axios from 'axios'
import React, { useEffect, useState } from "react";
import useChat from "./chat/useChat";
import Sort from './Sort'
import ImageUpload from './ImageUpload'
import Image from './Image'
import Others from './Others'
import Response from './Response'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Notifications = (props) => {
  console.log(props.user)
  const  { roomId } = props.match.params; 
  const user = props.user.name// Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId, user); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState("");
  const [account, setAccount] = useState([]);
  const [pic, setPic] = useState(false);
  const [info, setInfo] = useState([]);
  const [reload, setReload] = useState('')




    // function updateScroll(){
    //     if(!scrolled){
    //         var element = document.querySelector('#notify');
    //         element.scrollTop = element.scrollHeight;
    //     }
    // }
    




  // get random user
  const getRandomUser = () => {

    let route;

    if (props.user.preference !== 'Both') {
      route = `${REACT_APP_SERVER_URL}/api/users/users/${props.user.gender}/${props.user.preference}/${props.user.email}/${props.user.location}`
    } else {
      route = `${REACT_APP_SERVER_URL}/api/users/users/random/${props.user.gender}/${props.user.email}/${props.user.location}`
    }
  
  
  

      Axios.get(route)

      .then(res => {
        console.log(res.data.profile)
        setAccount(res.data.profile)
      
      }) .catch(err => {
        console.log(err);
    })
  }

  
  function getMyInfo (route){
    if(!props.user.email){
      return
    }
    
    Axios.get(route)
    .then(res =>{
      console.log(props.user.email)
      console.log(res.data)
      setInfo(res.data.user[0])
      console.log(info) 
      
    })
    .catch(err=>{
        console.log(err)
    })
  }
  
  useEffect(() => {
    getRandomUser()
    getMyInfo (`${REACT_APP_SERVER_URL}/api/users/myinfo/${props.user.email}`)
    // setInterval(updateScroll,1000);
    // document.querySelector('.chat-room-container').addEventListener('scroll', function(){
    //   setScrolled(true);
  // });
  }, [props.user.email])

  console.log(info);
  // const information = info && info.length ? info : ''
  return (
    <div id="master">
  <div id="profile">
  <Image email={props.user.email} pic={pic}/>
  <ImageUpload email={props.user.email} pic={setPic}/>
  <Others user={props.user} info={info} email={props.user.email} pic={setPic}  pic={pic}/>
  </div>
    <div id="swipe">
  
  <Sort user={account} me={props.user.name} id={props.user.id} email={props.user.email} status={info.online} pic={info.image_url} toggle={getRandomUser} messages={messages}/>
  </div>
 
        <div className="chat-room-container" id="notify" >
      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message, i) => (
           
            <p
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            > 
              {/* { props.user.id === roomId ? */}
              
              <div >
                
                <div class="chatBox">
                <img className="profilePic" src={message.image}/>
                  <p>{message.senderId}</p>
              <p> {message.body}</p>
              
              
              </div>
              <div class="chatBox">
                <Response room={message.id} name={props.user.name} id ={props.user.id} email={account.email} type={message.type} pic={info.image_url} reload={setReload}/>
                </div>
              </div> 
              {/* :  */}
              <div></div>
              {/* } */}
            </p>
          ))}
        </div>
      </div>
    
    </div>
  

    
  </div>
)};

export default Notifications;