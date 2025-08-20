const initialState = {
  model: "Professional email",
  addressee: "Colleague",
  textLength: "Standard",
};

const selectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_MODEL":
      return { ...state, model: action.payload };
    case "CHANGE_ADDRESSEE":
      return { ...state, addressee: action.payload };
    case "CHANGE_LENGTH":
      return { ...state, textLength: action.payload };
    default:
      return state;
  }
};

export default selectionReducer;
