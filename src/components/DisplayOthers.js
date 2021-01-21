function DisplayOthers(props){
    console.log(props.info)
    
    return(
        <div>
          
            <p>Age: {props.info.age}</p>
            <p>update</p>
            <p>Bio: {props.info.bio}</p>
            <p>update</p>
            <p>Gender: {props.info.gender}</p>
            <p>update</p>
            <p>Preference: {props.info.preference}</p>
            <p>update</p>
            
        </div>
    )
}

export default DisplayOthers;