const DRAWER_STATE = "drawer/DRAWER_STATE";

export const drawerState = () => ({ type: DRAWER_STATE });

const initialState = {
  show: false,
};

export default function counter(state = initialState, action: any) {
  switch (action.type) {
    case DRAWER_STATE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
