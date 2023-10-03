//types
const SELECT = "date/SELECT";

interface SelectDataParams {
  currentDay: number;
  currentMonth: number;
  currentYear: number;
}

interface Select {
  type: typeof SELECT;
  payload: SelectDataParams;
}

export type DateActionType = Select;

//actions

function Select(currentDay: number, currentMonth: number, currentYear: number) {
  return {
    type: SELECT,
    payload: {
      currentDay: currentDay,
      currentMonth: currentMonth,
      currentYear: currentYear,
    },
  };
}

export const actionCreator = {
  Select,
};

//initial state
export interface DateState {
  currentDay: number;
  currentMonth: number;
  currentYear: number;
}

const initialState: any = [];

//reducer
export default function dateReducer(
  state = initialState,
  action: DateActionType
): DateState {
  switch (action.type) {
    case SELECT:
      return {
        currentDay: action.payload.currentDay,
        currentMonth: action.payload.currentMonth,
        currentYear: action.payload.currentYear,
      };
    default:
      return state;
  }
}
