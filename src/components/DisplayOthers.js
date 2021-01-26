import { useEffect, useState } from 'react'
import ShowNotifs from './ShowNotifs';
import Axios from 'axios'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function DisplayOthers(props){

    const [notifications, setNotifications] = useState([])

    console.log(props.info.notifications);
    

    // const notifications = props.info.notifications ? props.info.notifications : ''

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
                console.log(err)
            })
        }
        // console.log(notifications);
        getMyInfo (`${REACT_APP_SERVER_URL}/api/users/myinfo/${props.info.email}`)
    }, [props])

    return(
        <div>
             <div id="showNotifsDiv">
           
            </div>
            <p>{props.info.age}</p>
            <p>{props.info.bio}</p>
            <p>{props.info.gender}</p>
            <p> {props.info.location}</p>
            <p id="preference">Preference: {props.info.preference}</p>
           
            <div>
                <button class="btn btn-outline-primary" id="edit-prof-btn">Edit info</button>
            </div>
            {/* <ShowNotifs alerts={notifications} me={props.info.name} my_email={props.info.email} pic={props.info.image_url}/> */}
        </div>
    )
}

export default DisplayOthers;