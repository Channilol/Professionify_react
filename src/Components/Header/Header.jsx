import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.png'
import { MdLogin } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillMoonStarsFill } from "react-icons/bs";
import HeaderButton from './HeaderButton/HeaderButton';


export default function Header() {
    return (
        <header>
            <div className="header-left-section">
                <div className="header-logo">
                    <img src={Logo} alt="Logo" />
                </div>
                <p className="header-text">
                    Textify
                </p>
            </div>
            <div className="header-right-section">
                <button className="login-logout-btn header-btn">
                    <MdLogin />
                    <p>
                        Login
                    </p>
                </button>
                <HeaderButton child={<BsPersonCircle />} />
                <HeaderButton child={<BsFillMoonStarsFill />} />
            </div>
        </header>
    )
}
