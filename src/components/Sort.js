import Swipe from './Swipe'

function Sort(props) {
    

    console.log(props);
    const printAllUsers = props.user.map((p, index) => {
        return <div>
                {/* <p>{p.name}</p>
                <button onClick={handleSendMessage} className="send-message-button">
                    Like
                </button>  */}
                <Swipe name={p.name} id={p._id} me={props.me} />
            </div>
    })

    return(
        <div>
            {printAllUsers}
         
            {/* <p>{props.name}</p> */}
        </div>
    )
}

export default Sort;