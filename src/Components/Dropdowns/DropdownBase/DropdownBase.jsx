import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

export default function DropdownBase({ list, setFunction, stateName }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function getDropdownItem(obj) {
    return (
      <div
        className="dropdown-item"
        onClick={() => setFunction(obj.name, toggleDropdown)}
      >
        <div className="dropdown-item-left">{obj.icon}</div>
        <div className="dropdown-item-right">
          <p>{obj.name}</p>
          <p className="model-description">{obj.description}</p>
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
        {/* QUI NON FUNZIONA */}
        {/* <span>{list.find((obj) => obj.name === stateName).icon}</span> */}
        <p>{stateName}</p>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
          <BsChevronDown />
        </span>
      </button>

      {isOpen ? (
        <div className="dropdown-menu" ref={dropdownRef}>
          {list.map((obj) => {
            return getDropdownItem(obj);
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
