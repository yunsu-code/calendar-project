const STATE_MODAL = "modalUi/STATE_MODAL";
const STATE_DRAWER = "modalUi/STATE_DRAWER";

const initialState: Object = { modalOpen: false, drawerOpen: false };

export const stateModal = (open: boolean) => ({
  type: STATE_MODAL,
  payload: {
    modalOpen: open,
  },
});

export const stateDrawer = (open: boolean) => ({
  type: STATE_DRAWER,
  payload: {
    drawerOpen: open,
  },
});

export default function dateReducer(state = initialState, action: any) {
  switch (action.type) {
    case STATE_MODAL:
      return { ...state, modalOpen: action.payload.modalOpen };
    case STATE_DRAWER:
      return { ...state, drawerOpen: action.payload.drawerOpen };
    default:
      return state;
  }
}
