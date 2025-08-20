import React, { useState } from 'react'
import './TextBox.css'

export default function TextBox({ textToFormat, setTextToFormat }) {

    const handleInputChange = (event) => {
        setTextToFormat(event.target.value);
    }

    return (
        <div className='textbox-container'>
            <h3>Your text</h3>
            <textarea className="textbox" value={textToFormat} onChange={handleInputChange} placeholder='Put your text here ...' />
        </div>
    )
}
