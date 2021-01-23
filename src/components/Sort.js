import Swipe from './Swipe'


function Sort(props) {



  
    const randomUser = props.user ? props.user : ''
    console.log(props)
    return(
        <div>
            <Swipe toggle={props.toggle} user={randomUser} pic={props.pic} id={props.id} me={props.me} room={props.user._id}/>
         
            {/* <p>{props.name}</p> */}
        </div>
    )
}

export default Sort;