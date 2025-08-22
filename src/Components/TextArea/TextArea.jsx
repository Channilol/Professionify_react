import React, { useState } from "react";
import "./TextArea.css";
import TextBox from "./TextBox/TextBox";
import Stars from "../../assets/logo.png";
import { FiClipboard, FiCheck, FiX } from "react-icons/fi";
import AnimatedSequence from "../AnimatedSequence/AnimatedSequence";
import { useSelector } from "react-redux";
import { TextFormatterService } from "../../services/textFormatterService";
import ConversationsDropdown from "./ConversationsDropdown/ConversationsDropdown";

export default function TextArea() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [textToFormat, setTextToFormat] = useState("");
  const [aiText, setAiText] = useState("");
  const [copyClass, setCopyClass] = useState("copy-to-clipboard");
  const [copyIcon, setCopyIcon] = useState(<FiClipboard />);
  const model = useSelector((state) => state.selectionReducer.model);
  const addressee = useSelector((state) => state.selectionReducer.addressee);
  const textLength = useSelector((state) => state.selectionReducer.textLength);
  const formatter = new TextFormatterService();

  const handleClick = async () => {
    if (!isGenerating) setIsGenerating(true);
    if (textToFormat === "") {
      setAiText(
        "Mi dispiace, ma sembra che non sia stato incluso il messaggio originale da riformattare. Per poter eseguire la riformattazione, avrei bisogno del testo di partenza. Potrebbe cortesemente fornirmi il messaggio che desidera venga riformattato?"
      );
      if (!isGenerating) setIsGenerating(false);
      return;
    }
    try {
      let obj = generateObj();
      const result = await formatter.formatText(obj);
      console.log(result);
      setAiText(result);
    } catch (error) {
      console.error("Errore:", error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClickAnimation = async () => {
    setCopyClass("copy-to-clipboard clicked");
    try {
      await navigator.clipboard.writeText(aiText);
      setCopyIcon(<FiCheck />);
    } catch (error) {
      console.error("Errore durante la copia:", error);
      setCopyIcon(<FiX />);
    }
    setTimeout(() => {
      setCopyClass("copy-to-clipboard");
    }, 400);
    setTimeout(() => {
      setCopyIcon(<FiClipboard />);
    }, 5000);
  };

  const generateObj = () => {
    return {
      model: model,
      addressee: addressee,
      textLength: textLength,
      message: textToFormat,
    };
  };

  function setTextToFormatFun(string) {
    setTextToFormat(string);
  }

  return (
    <div className="main-section">
      <div className="input-output-area">
        <div className="input-text-area">
          <TextBox
            textToFormat={textToFormat}
            setTextToFormat={setTextToFormatFun}
          />
        </div>
        <div className="output-text-area">
          <h3>AI Generated Text</h3>
          <div className="ai-text-box">
            {aiText !== "" ? (
              <div className={copyClass} onClick={handleClickAnimation}>
                {copyIcon}
                <p>Copy</p>
              </div>
            ) : null}
            <p style={{ whiteSpace: "pre-wrap" }}>{aiText}</p>
          </div>
        </div>
      </div>
      <div className="main-section-bottom">
        <div style={{ width: "175px" }}></div>
        <button
          id="generate-btn"
          className={`generate-text-button ${
            isGenerating ? "generating" : "generation-done"
          }`}
          onClick={handleClick}
        >
          {isGenerating ? (
            <AnimatedSequence />
          ) : (
            <>
              <img src={Stars} alt="stars" />
              <p>Generate text</p>
            </>
          )}
        </button>
        <div className="conversation-title-dropdown">
          <p className="conversation-label">Your Conversations</p>
          <ConversationsDropdown />
        </div>
      </div>
    </div>
  );
}
