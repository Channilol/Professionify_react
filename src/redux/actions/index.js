function changeModel(model) {
  return { type: "CHANGE_MODEL", payload: model };
}
function changeAddressee(addressee) {
  return { type: "CHANGE_ADDRESSEE", payload: addressee };
}
function changeLength(textLength) {
  return { type: "CHANGE_LENGTH", payload: textLength };
}

export { changeModel, changeAddressee, changeLength };
