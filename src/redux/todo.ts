const ADD_TODO = "todo/ADD_TODO";
const TOGGLE_TODO = "todo/TOGGLE_TODO";
const DELETE_TODO = "todo/DELETE_TODO";

const initialState: Array<any> = [];

export const addTodo = (id: number, todo: any, date: any) => ({
  type: ADD_TODO,
  todo: {
    id: id,
    date: date,
    content: {
      title: todo.title,
      note: todo.note,
      color: todo.color,
      done: false,
    },
  },
});
export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  id,
});
export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  id,
});

export default function todos(state = initialState, action: any) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case TOGGLE_TODO:
      return state.map(
        (todo) =>
          todo.id === action.id // id 가 일치하면
            ? { ...todo, done: !todo.done } // done 값을 반전시키고
            : todo // 아니라면 그대로 둠
      );
    case DELETE_TODO:
      return state.splice(action.todo);
    default:
      return state;
  }
}
