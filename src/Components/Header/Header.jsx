import React from "react";
import "./Header.css";
import Logo from "../../assets/logo.png";
import { BsFillMoonStarsFill } from "react-icons/bs";
import HeaderButton from "./HeaderButton/HeaderButton";
import LoginButton from "./LoginButton/LoginButton";
import { LuHistory, LuArchive, LuLibrary, LuBookOpen } from "react-icons/lu";

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
        <HeaderButton child={<BsFillMoonStarsFill />} />
        <HeaderButton child={<LuLibrary />} />
        <LoginButton />
      </div>
    </header>
  );
}
