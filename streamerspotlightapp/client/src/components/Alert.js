import { useEffect } from "react";

const Alert = ({type, message, removeAlert}) => {

    useEffect(() => {
        //remove alert after given period of time
        const timeout = setTimeout(() => {
            removeAlert();
        }, 3000);
        return () => clearTimeout(timeout);
    }, [])

    return (
        <div className={`alert ${type}`}>
            <p className="alert-text">{message}</p>
        </div>
    )
}

export default Alert;