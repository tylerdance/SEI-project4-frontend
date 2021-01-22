import useChat from "./chat/useChat";
import Chat from "./chat/Chat"
import React, { useState, useEffect } from "react";

function Response (props){
    const roomId = props.room; 
    const user = props.name // Gets roomId from URL
    const id = props.id
    const type = "chat"
    const image = props.pic
    const { messages, sendMessage } = useChat(roomId, user, id, type, image ); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState("Let's Chat");
  
    const handleSendMessage = () => {
        document.getElementById(`${props.room}`).style.display="block"
        document.getElementById('initiateChat').style.display="none"
        console.log(roomId);
        sendMessage(newMessage);
        setNewMessage("liked");

    }
    const handleChat =()=>{
        document.getElementById(`${props.room}`).style.display="block"
    }
 

   
    
   




    
  return (
       <div>
            
           {
            props.type==="chat" ?
       
              
                <div className="blue" id={props.room}>
                  
                     <Chat chat={handleChat} />
                     {/* <button onClick={handleChat}>Initiate Chat</button> */}
                </div>
              
                
               :
                <div>
                    <div className="chat" id={props.room}>
                        <Chat chat={handleChat} />
                    </div>
                    <button  id="initiateChat" onClick={handleSendMessage}>Chat</button>
                </div>

           }
           
            
       </div>
       
    )
}

export default Response;