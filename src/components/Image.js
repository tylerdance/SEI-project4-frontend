import Axios from 'axios'
import { useState } from 'react'


const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Image (props) {
  
    const[photo, setPhoto]=useState([])


   
        Axios.get(`${REACT_APP_SERVER_URL}/api/users/myphoto/${props.email}`)
        .then(res=>{
            // console.log(res.data)
            setPhoto(res.data.user[0].image_url)
           })
        .catch(err=>{
            // console.log(err)
        })
        return(
            <div>
                <img id="profilePic" src={photo}/>
            </div>
        )
}

export default Image;