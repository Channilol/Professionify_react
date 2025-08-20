import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { changeLength } from "../../../redux/actions/index";
import { FiZap, FiFileText, FiLayers } from "react-icons/fi";

export default function DropdownLength() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const textLength = useSelector((state) => state.selectionReducer.textLength);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const textLengths = [
    {
      textLength: "Short",
      icon: <FiZap />,
      description: "Concise and brief text output",
    },
    {
      textLength: "Standard",
      icon: <FiFileText />,
      description: "Balanced text length with adequate detail",
    },
    {
      textLength: "Long",
      icon: <FiLayers />,
      description: "Extended and comprehensive text output",
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const setTextLength = (textLength) => {
    dispatch(changeLength(textLength));
    toggleDropdown();
  };

  useEffect(() => {}, [isOpen]);

  function getDropdownItem(obj) {
    return (
      <div
        className="dropdown-item"
        onClick={() => setTextLength(obj.textLength)}
      >
        <div className="dropdown-item-left">{obj.icon}</div>
        <div className="dropdown-item-right">
          <p>{obj.textLength}</p>
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
        <span>
          {textLengths.find((obj) => obj.textLength === textLength).icon}
        </span>
        <p>{textLength}</p>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
          <BsChevronDown />
        </span>
      </button>

      {isOpen ? (
        <div className="dropdown-menu" ref={dropdownRef}>
          {textLengths.map((obj) => {
            return getDropdownItem(obj);
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
