import { useEffect, useState } from 'react'
// import ShowNotifs from './ShowNotifs';
import Axios from 'axios'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function DisplayOthers(props){

    const [notifications, setNotifications] = useState([])

    useEffect(()=> {

        function getMyInfo(route) {
            if(!props.info.email){
              return
            }
            
            Axios.get(route)
            .then(res =>{
            //   console.log(props.user.email)
            //   console.log(res.data)
              setNotifications(res.data.user[0].notifications)
            //   console.log(info) 
            })
            .catch(err=>{
                // console.log(err)
            })
        }
        // console.log(notifications);
        getMyInfo (`${REACT_APP_SERVER_URL}/api/users/myinfo/${props.info.email}`)
    }, [props])

    return(
        <div>
             <div id="showNotifsDiv">
           
            </div>
            <div id="my-prof-info">
                <p>{props.info.age}</p>
                <p>{props.info.bio}</p>
                <p>{props.info.gender}</p>
                <p> {props.info.location}</p>
                <p id="preference">Preference: {props.info.preference}</p>

            </div>
           
        </div>
    )
}

export default DisplayOthers;