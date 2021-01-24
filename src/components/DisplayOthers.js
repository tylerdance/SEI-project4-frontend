function DisplayOthers(props){
    console.log(props.info)
    
    return(
        <div>
            <p>{props.info.age}</p>
            <p>{props.info.bio}</p>
            <p>{props.info.gender}</p>
            <p>Preference: {props.info.preference}</p>
            <div>
                <button class="btn btn-outline-primary" id="edit-prof-btn">Edit info</button>
            </div>
        </div>
    )
}

export default DisplayOthers;