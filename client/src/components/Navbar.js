import React, { useEffect, useState } from 'react'
import './Navbar.css'

import { useNavigate } from 'react-router-dom'

export default function Navbar() {





    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setUsername(localStorage.getItem('userName'))
    }, [])


    const handleClick = () => {
        navigate("/history")
    }

    const handleLogOut = () => {
        // Clear the entire localStorage
        localStorage.clear();
        navigate("/login")

    }
    return (
        <div className='navTop'>
            <div className='History btn2 ' onClick={handleClick}>

                History

            </div>


            <div className='navRight'>
                <div className='userpic '>
                    <ion-icon name="person-circle-outline">

                    </ion-icon>
                </div>

                <div className='username btn2'>{username}</div>
            </div>
            <div className='History btn2 ' onClick={handleLogOut}>

                LogOut

            </div>




        </div>
    )
}
