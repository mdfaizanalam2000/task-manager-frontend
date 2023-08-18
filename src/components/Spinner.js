import React, { useState } from 'react'

export default function Spinner() {
    let [timer, setTimer] = useState(100);
    setInterval(() => {
        setTimer(--timer);
    }, 1000)
    return (
        <div className="spinner text-center">
            <span className="spinner-border" role="status">
            </span>
            <p className="spinner-message">Hang On, Loading. It may take upto {timer}s!</p>
        </div>
    )
}
