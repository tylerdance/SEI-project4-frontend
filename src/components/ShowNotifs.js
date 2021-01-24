function ShowNotifs(props) {

    console.log(props.alerts);
    const alerts = props.alerts.map((p, index) => {
        const handleShowNotifDetails = () => {
            document.getElementById(`${p.email[index]}`).style.display="block"
        }
        return(
            <div>
                {/* <p>{p.name}</p> */}
                <button onClick={handleShowNotifDetails}>{p.name}</button>
                <p id={p.email[index]} className="single-notif">{p.content}</p>
                {/* {`Read: ${p.read}`} */}
                {/* <button>Message {p.name}</button> */}
                <hr />
            </div>
        )
    })

    const handleShowNotifications = () => {
        document.getElementById('my-alerts').style.display="block"
    }
    const handleHideNotifications = () => {
        document.getElementById('my-alerts').style.display="none"
    }

    return(
    <div>
        <button onClick={handleShowNotifications}>Notifications ({props.alerts.length})</button>
        <button onClick={handleHideNotifications}>Hide Notifications</button>
        <div id="my-alerts">
            {alerts}
        </div>
    </div>
    )
}

export default ShowNotifs;