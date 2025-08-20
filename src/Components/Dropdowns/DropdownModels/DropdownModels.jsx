import React, { useEffect, useRef, useState } from "react";
import { MdOutgoingMail, MdKey } from "react-icons/md";
import { BsChevronDown, BsFileEarmarkTextFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { changeModel } from "../../../redux/actions/index";

export default function DropdownModels() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const model = useSelector((state) => state.selectionReducer.model);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const models = [
    {
      model: "Professional email",
      icon: <MdOutgoingMail />,
      description: "Model for professional emails based on the recipient",
    },
    {
      model: "Key points",
      icon: <MdKey />,
      description: "Model to summarize content into key highlights",
    },
    {
      model: "Technical document",
      icon: <BsFileEarmarkTextFill />,
      description: "Model to transform text into a technical document",
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const setModel = (model) => {
    dispatch(changeModel(model));
    toggleDropdown();
  };

  function getDropdownItem(obj) {
    return (
      <div className="dropdown-item" onClick={() => setModel(obj.model)}>
        <div className="dropdown-item-left">{obj.icon}</div>
        <div className="dropdown-item-right">
          <p>{obj.model}</p>
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
        <span>{models.find((obj) => obj.model === model).icon}</span>
        <p>{model}</p>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
          <BsChevronDown />
        </span>
      </button>

      {isOpen ? (
        <div className="dropdown-menu" ref={dropdownRef}>
          {models.map((obj) => {
            return getDropdownItem(obj);
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
