const initialState = {
  conversations: ["Default"],
  activeConversation: "Default",
};

const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CONVERSATIONS":
      return { ...state, conversations: action.payload };
    case "CHANGE_ACTIVE_CONVERSATION":
      return { ...state, activeConversation: action.payload };
    default:
      return state;
  }
};

export default conversationsReducer;
