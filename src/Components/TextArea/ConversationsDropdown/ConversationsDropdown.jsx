import React, { useEffect, useRef, useState } from "react";
import "./ConversationsDropdown.css";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { LuInbox } from "react-icons/lu";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  setConversations,
  changeActiveConversation,
} from "../../../redux/actions";
import { FiCheck } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";

export default function ConversationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const user = useUser();
  const supabase = useSupabaseClient();

  const activeConversation = useSelector(
    (state) => state.conversationsReducer.activeConversation
  );
  const conversations = useSelector(
    (state) => state.conversationsReducer.conversations
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleClick = (event) => {
    const target = event.target;
    if (buttonRef.current.contains(target)) return;
    if (!dropdownRef.current.contains(target)) setIsOpen(false);
  };

  const setConversation = (conversation) => {
    dispatch(changeActiveConversation(conversation.title));
    toggleDropdown();
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
    <div className="conversation-dropdown-container">
      <button
        className="conversation-dropdown-button"
        ref={buttonRef}
        onClick={toggleDropdown}
      >
        <div className="conversation-button-left">
          <LuInbox />
          {activeConversation}
        </div>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
          <BsChevronDown />
        </span>
      </button>
      {isOpen ? (
        <div className="conversation-dropdown-menu" ref={dropdownRef}>
          {conversations.length > 0 ? (
            conversations.map((item) => (
              <div
                key={item.id}
                className="conversation-dropdown-item"
                onClick={() => setConversation(item)}
              >
                <div className="dropdown-item-left">
                  <LuInbox />
                </div>
                <div className="dropdown-item-right">
                  <p>{item.title}</p>
                </div>

                {item.title === activeConversation ? (
                  <div className="item-check">
                    <FiCheck />
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <></>
          )}
          <div className="create-conversation-button">
            <FiPlus />
            <p>New conversation</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
