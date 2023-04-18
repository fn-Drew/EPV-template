import React from 'react'
import { useSelector } from "react-redux"
import "../App.css"

export default function Notification() {

    const notification = useSelector(state => state.notification)

    return notification
        ?
        <div className="notification">
            {notification}
        </div>
        :
        null
}
