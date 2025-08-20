import React from "react";
import "./Dropdowns.css";
import { MdKey, MdOutgoingMail } from "react-icons/md";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { FiFileText, FiLayers, FiZap } from "react-icons/fi";
import { FaHandshake, FaUserFriends, FaUserTie } from "react-icons/fa";
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
  );
}
