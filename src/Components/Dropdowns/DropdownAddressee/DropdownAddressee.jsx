import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeAddressee } from "../../../redux/actions/index";
import { BsChevronDown } from "react-icons/bs";
import { FaUserTie, FaHandshake, FaUserFriends } from "react-icons/fa";

export default function DropdownAddressee() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const addressee = useSelector((state) => state.selectionReducer.addressee);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const addressees = [
    {
      addressee: "Colleague",
      icon: <FaUserFriends />,
      description: "Informal and collaborative tone for peer communication",
    },
    {
      addressee: "Client",
      icon: <FaHandshake />,
      description: "Professional and courteous tone for business relationships",
    },
    {
      addressee: "Manager",
      icon: <FaUserTie />,
      description: "Formal and respectful tone for executive communication",
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const setAddressee = (addressee) => {
    dispatch(changeAddressee(addressee));
    toggleDropdown();
  };

  function getDropdownItem(obj) {
    return (
      <div
        className="dropdown-item"
        onClick={() => setAddressee(obj.addressee)}
      >
        <div className="dropdown-item-left">{obj.icon}</div>
        <div className="dropdown-item-right">
          <p>{obj.addressee}</p>
          <p className="addressee-description">{obj.description}</p>
        </div>
      </div>
    );
  }

  const handleClick = (event) => {
    const target = event.target;
    if (buttonRef.current.contains(target)) return;
    if (!dropdownRef.current.contains(target)) setIsOpen(false);
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
    <div className="dropdown-container">
      <button
        className="dropdown-button"
        ref={buttonRef}
        onClick={toggleDropdown}
      >
        <span>
          {addressees.find((obj) => obj.addressee === addressee).icon}
        </span>
        <p>{addressee}</p>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
          <BsChevronDown />
        </span>
      </button>

      {isOpen ? (
        <div className="dropdown-menu" ref={dropdownRef}>
          {addressees.map((obj) => {
            return getDropdownItem(obj);
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
