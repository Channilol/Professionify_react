import React, { useState } from 'react'
import './HeaderButton.css'

export default function HeaderButton({ child }) {
    const [clickedClass, setClickedClass] = useState("header-btn")

    const handleClickAnimation = () => {
        setClickedClass("header-btn clicked")
        setTimeout(() => {
            setClickedClass("header-btn")
        }, 400)
    }

    return (
        <div className={clickedClass} onClick={handleClickAnimation}>{child}</div>
    )
}
