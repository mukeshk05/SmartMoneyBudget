import CURRENT_COMPONENT from "./types";

const initialState = {
  currentComponent: "",
  sideBarMenuItemKey: "",
  sideBarMenuOptionKey:""
};

export default function(state = initialState, action) {
  if (action.type === CURRENT_COMPONENT) {
    return {
      ...state,
      currentComponent: action.payload.component,
      sideBarMenuItemKey: action.payload.sideBarMenuKey,
      sideBarMenuOptionKey:action.payload.sideBarMenuOptionKey
    };
  } else {
    return state;
  }
}
