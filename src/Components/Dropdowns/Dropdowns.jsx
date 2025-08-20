import React from "react";
import "./Dropdowns.css";
import { MdKey, MdOutgoingMail } from "react-icons/md";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { FiFileText, FiLayers, FiZap } from "react-icons/fi";
import { FaHandshake, FaUserFriends, FaUserTie, FaUsers, FaCommentDots } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAddressee,
  changeLength,
  changeModel,
} from "../../redux/actions";
import DropdownBase from "./DropdownBase/DropdownBase";

export default function Dropdowns() {
  const dispatch = useDispatch();
  const model = useSelector((state) => state.selectionReducer.model);
  const addressee = useSelector((state) => state.selectionReducer.addressee);
  const textLength = useSelector((state) => state.selectionReducer.textLength);
  const models = [
    {
      name: "Casual",
      icon: <FaCommentDots />,
      description: "Model for casual and informal text",
    },
    {
      name: "Professional email",
      icon: <MdOutgoingMail />,
      description: "Model for professional emails based on the recipient",
    },
    {
      name: "Key points",
      icon: <MdKey />,
      description: "Model to summarize content into key highlights",
    },
    {
      name: "Technical document",
      icon: <BsFileEarmarkTextFill />,
      description: "Model to transform text into a technical document",
    },
  ];
  const addressees = [
    {
      name: "Friend",
      icon: <FaUserFriends />,
      description: "Informal and friendly conversation like text",
    },
    {
      name: "Client",
      icon: <FaHandshake />,
      description: "Professional and courteous tone for business relationships",
    },
    {
      name: "Colleague",
      icon: <FaUsers />,
      description: "Informal and collaborative tone for peer communication",
    },
    {
      name: "Manager",
      icon: <FaUserTie />,
      description: "Formal and respectful tone for executive communication",
    },
  ];
  const textLengths = [
    {
      name: "Short",
      icon: <FiZap />,
      description: "Concise and brief text output",
    },
    {
      name: "Standard",
      icon: <FiFileText />,
      description: "Balanced text length with adequate detail",
    },
    {
      name: "Long",
      icon: <FiLayers />,
      description: "Extended and comprehensive text output",
    },
  ];

  const setModel = (model, callback) => {
    dispatch(changeModel(model));
    callback();
  };

  const setAddressee = (addressee, callback) => {
    dispatch(changeAddressee(addressee));
    callback();
  };

  const setTextLength = (textLength, callback) => {
    dispatch(changeLength(textLength));
    callback();
  };

  return (
    <>
      <h2 className="dropdown-title">Choose the style of text you want</h2>
      <div className="dropdowns">
        <DropdownBase list={models} setFunction={setModel} stateName={model} />
        <DropdownBase
          list={addressees}
          setFunction={setAddressee}
          stateName={addressee}
        />
        <DropdownBase
          list={textLengths}
          setFunction={setTextLength}
          stateName={textLength}
        />
      </div>
    </>
  );
}
