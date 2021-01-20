import User from '../User'

function Swipe(props) {
    

    console.log(props);
    const printAllUsers = props.user.map((p, index) => {
        return <div>
                {/* <p>{p.name}</p>
                <button onClick={handleSendMessage} className="send-message-button">
                    Like
                </button>  */}
                <User name={p.name} id={p._id} me={props.me} />
            </div>
    })

    return(
        <div>
            <h1>I am swipe</h1>
            {printAllUsers}
         
            {/* <p>{props.name}</p> */}
        </div>
    )
}

export default Swipe;