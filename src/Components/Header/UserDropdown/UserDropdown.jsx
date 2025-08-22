import React, { useEffect, useRef, useState } from "react";
import "./UserDropdown.css";
import { BsPersonCircle } from "react-icons/bs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { HiSparkles } from "react-icons/hi2";
import { LuCrown } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { MdArrowForward } from "react-icons/md";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const user = useUser();
  const supabase = useSupabaseClient();
  const userName = user?.user_metadata?.name || user?.email;
  const userEmail = user?.email || "no_email_data";
  const userPlan = user?.user_metadata?.plan || "free";
  const userImage = user?.user_metadata?.avatar_url || null;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (event) => {
    const target = event.target;
    if (buttonRef.current.contains(target)) return;
    if (!dropdownRef.current.contains(target)) setIsOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const capitalize = (string) => {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClick);
    }
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  return (
    <div className="user-profile-container">
      <button
        className="user-profile-button"
        ref={buttonRef}
        onClick={toggleDropdown}
      >
        {(
          <img
            className="user-image"
            src={userImage}
            alt={<BsPersonCircle />}
          />
        ) ?? <BsPersonCircle />}
      </button>
      {isOpen ? (
        <div className="user-dropdown-menu" ref={dropdownRef}>
          <div>
            <p className="user-name">
              Hello <span>{userName}</span>!
            </p>
            {userEmail !== userName ? (
              <p className="user-email">{userEmail}</p>
            ) : null}
          </div>
          <div className="user-plan">
            <p className="user-plan-top">
              {capitalize(userPlan)} plan
              {userPlan === "free" ? <HiSparkles /> : <LuCrown />}
            </p>
            {userPlan === "free" ? (
              <p className="user-plan-bottom">
                Upgrade plan <MdArrowForward />
              </p>
            ) : null}
          </div>

          <div className="user-dropdown-divide-line"></div>
          <button className="logout-button" onClick={handleLogout}>
            <MdLogout />
            <p>Logout</p>
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
