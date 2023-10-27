const SELECT_DATE = "date/SELECT_DATE";
const SELECT_TODOID = "date/SELECT_TODOID";

export const selectDate = (
  currentDate: string,
  currentYear: number,
  currentMonth: number,
  currentWeek: number,
  currentDay: number
) => ({
  type: SELECT_DATE,
  payload: {
    currentDate: currentDate,
    currentYear: currentYear,
    currentMonth: currentMonth,
    currentWeek: currentWeek,
    currentDay: currentDay,
  },
});

export const selectTodo = (currentTodoId: number, thisTodo: any) => ({
  type: SELECT_TODOID,
  payload: {
    currentTodoId: currentTodoId,
    thisTodo: thisTodo,
  },
});

const initialState = {
  currentDate: "",
  currentYear: 0,
  currentMonth: 0,
  currentWeek: 0,
  currentDay: 0,
  thisTodo: {},
};

export default function dateReducer(state = initialState, action: any) {
  switch (action.type) {
    case SELECT_DATE:
      return {
        ...state,
        currentDate: action.payload.currentDate,
        currentYear: action.payload.currentYear,
        currentMonth: action.payload.currentMonth,
        currentWeek: action.payload.currentWeek,
        currentDay: action.payload.currentDay,
      };
    case SELECT_TODOID:
      return {
        ...state,
        currentTodoId: action.payload.currentTodoId,
        thisTodo: action.payload.thisTodo,
      };
    default:
      return state;
  }
}
