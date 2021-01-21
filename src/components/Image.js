import Axios from 'axios'
import { useState, useEffect } from 'react'


const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Image (props) {
  
    const[photo, setPhoto]=useState([])

    function getImage(url){
        if(!props.email){
            return
        }
        Axios.get(url)
        .then(res=>{
            // console.log(res.data)
            setPhoto(res.data.user[0].image_url)
            console.log('hi!!!!')
           })
        .catch(err=>{
            // console.log(err)
        })
    }


useEffect (()=>{
    getImage(`${REACT_APP_SERVER_URL}/api/users/myphoto/${props.email}`)

},[props.email])
   
 
        return(
            <div>
                <img id="profilePic" src={photo}/>
            </div>
        )
}

export default Image;