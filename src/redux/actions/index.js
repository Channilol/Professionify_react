function changeModel(model) {
  return { type: "CHANGE_MODEL", payload: model };
}
function changeAddressee(addressee) {
  return { type: "CHANGE_ADDRESSEE", payload: addressee };
}
function changeLength(textLength) {
  return { type: "CHANGE_LENGTH", payload: textLength };
}
function setConversations(conversations) {
  return { type: "SET_CONVERSATIONS", payload: conversations };
}
function changeActiveConversation(conversation) {
  return { type: "CHANGE_ACTIVE_CONVERSATION", payload: conversation };
}

export {
  changeModel,
  changeAddressee,
  changeLength,
  setConversations,
  changeActiveConversation,
};
