import React from "react";
import "./Header.css";
import Logo from "../../assets/logo.png";
import { BsFillMoonStarsFill } from "react-icons/bs";
import HeaderButton from "./HeaderButton/HeaderButton";
import LoginButton from "./LoginButton/LoginButton";

export default function Header() {
  return (
    <header>
      <div className="header-left-section">
        <div className="header-logo">
          <img src={Logo} alt="Logo" />
        </div>
        <p className="header-text">Professionify</p>
      </div>
      <div className="header-right-section">
        <LoginButton />
        <HeaderButton child={<BsFillMoonStarsFill />} />
      </div>
    </header>
  );
}
