import { useState } from 'react'

const Timer = ( { expiry } ) => {
    const [time, setTime] = useState()
    console.log('*************')
    console.log(expiry)

    setInterval(() => {
        setTime(Math.round(expiry/1000 - Date.now()/1000))         
    },1000)

    return (
        <div className="timer-box">
           {time}
        </div>
    )
}
export default Timer