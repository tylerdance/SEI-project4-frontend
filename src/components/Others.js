import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import DisplayOthers from './DisplayOthers'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Others (props){
    // useEffect(() => {
      
    //     // getMyInfo()
    //   }, [props.user.email, props.account, props.info])
  
    console.log(props.info)
    return(
        <div>
          <h5>{props.user.name}</h5>
          <DisplayOthers info={props.info}/>
       

        </div>
    )
}

export default Others