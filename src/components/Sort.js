import React, { useState, useEffect} from 'react'
import Swipe from './Swipe'
import ShowNotifs from './ShowNotifs'
import axios from 'axios';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Sort(props) {

const [alerts, setAlerts]= useState([]) 

  
console.log(props.email)

useEffect(()=>{
    axios.get(`${REACT_APP_SERVER_URL}/api/users/myinfo/${props.email}`).
    then(res=>{
        setAlerts(res.data.user[0].notifications)
    }).catch(err=>{console.log(err)})


    console.log(props.email)
}, [props.email, props.messages])

const randomUser = props.user ? props.user : ''
console.log(props)
    return(
        <div id="here" >
       
        
         
         
             
           <div id="home">
           <Swipe toggle={props.toggle} user={randomUser} pic={props.pic} id={props.id} me={props.me} room={props.user._id}/>
              </div>
              <div id="red">
         <ShowNotifs alerts={alerts} me={props.me} my_email={props.email} pic={props.pic} messages={props.messages}/>
         </div>
   
</div>
    )
}

export default Sort;