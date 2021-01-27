import { useEffect, useState } from 'react';
import Axios from 'axios';
import Response from './Response'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ShowNotifs(props) {

    const [alertsLength, setAlertsLength] = useState(props.alerts.length)
    const [reload, setReload] = useState('')
    // let alertsLength = 0
   
    const alerts = props.alerts.map((p, index) => {
        const handleShowNotifDetails = () => {
            if (p.read === true) {
                setAlertsLength(alertsLength - 1)
            }
            console.log(p.email+index);
            // if(!p.email[index]){

            // }else{
                document.getElementById(`${p.email+index}`).style.display="block"
            // }
           

            const userData = {
                email: p.email,
                id: p._id,
                user: p.my_id
            }
           
            Axios.post(`${REACT_APP_SERVER_URL}/api/users/notifications/read`, userData)
            .then(res => {
                
            }).catch(err => {
                console.log(err)
            })
        }

    
        return(
            <div>
                { p.read === false ? 
                <div>
                    
                    <img src={p.pic} className="iconPic" />
                    <button className="yourName" onClick={handleShowNotifDetails}>{p.name}</button>
                    <p id={p.email+index} className="single-notif">{p.content}</p>
                    <div class="chatBox">
                        <Response reload={setReload} room={p.from_sender} name={props.me} id ={p.my_id} email={p.email} type={p.type} pic={props.pic}/>
                    </div>
                    <hr />
                </div>
                :
                <div></div>
                }
            </div>
        )
    })

    useEffect(() => {
        setAlertsLength(props.alerts.length)

        setAlertsLength(alertsLength - length)
    }, [props, reload])

    const handleShowNotifications = () => {

        document.getElementById('my-alerts').style.display="block"
        document.getElementById('hide-notifs').style.display="block"
    }
    const handleHideNotifications = () => {
        document.getElementById('my-alerts').style.display="none"
        document.getElementById('hide-notifs').style.display="none"
    }

    const length = props.alerts.filter(function(item){
        return item.read;
    }).length;

    return(
    <div>
        <button id="notifyId" onClick={handleShowNotifications}>Notifications ({props.alerts.length - length})</button>
        <button id="hide-notifs" onClick={handleHideNotifications}>Hide Notifications</button>
        <div id="my-alerts">
            {alerts}
        </div>
    </div>
    )
}

export default ShowNotifs;