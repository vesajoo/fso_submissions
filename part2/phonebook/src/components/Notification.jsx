const Notification = ({message, style}) => {
    if (message === null) {
        return null
    }

    let notificationStyle = {}

    if (style === 'error') {
        notificationStyle = {
            color: 'red',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        }
    }else if (style === 'notification') {
        notificationStyle = {
            color: 'green',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        }
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification