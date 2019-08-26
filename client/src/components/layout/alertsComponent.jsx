import React, {useContext} from 'react'
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
    const alertContext = useContext(AlertContext);
    const {alerts,setAlert,removeAlert} = alertContext;

    return (
        <div>
            {alerts.length > 0 && 
            alerts.map((alert) => {
                 return <div key={alert.id} className={`alert mt-2 alert-${alert.type}`}>
                    {alert.msg}
                 </div>
            })}
        </div>
    )
}

export default Alerts
