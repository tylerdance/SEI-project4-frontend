import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import DisplayOthers from './DisplayOthers'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Others (props){

const [info, setInfo] = useState([])
const route = `${REACT_APP_SERVER_URL}/api/users/myinfo/${props.user.email}`


async function getMyInfo (){

     
    Axios.get(route)
    .then(async res =>{
        
        setInfo(res.data.user[0])
        console.log(info)
       
       })
    .catch(err=>{
        console.log(err)
    })

}

    
///Voodoo???///
    useEffect(() => {
      
        getMyInfo()
      }, [props.user.email])
 
      
 
    return(
        <div>
          <h5>{props.user.name}</h5>
          <DisplayOthers info={info}/>
       

        </div>
    )
}

export default Others