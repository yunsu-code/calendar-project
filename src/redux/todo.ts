// action
const ADD_TODO = "todo/ADD_TODO";
const TOGGLE_TODO = "todo/TOGGLE_TODO";
const DELETE_TODO = "todo/DELETE_TODO";
const EDIT_TODO = "todo/EDIT_TODO";

const initialState: Array<any> = [];

// action creater
export const addTodo = (id: number, todo: any, date: any) => ({
  type: ADD_TODO,
  todo: {
    id: id,
    date: date,
    done: false,
    content: {
      title: todo.title,
      note: todo.note,
      color: todo.color,
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
export const editTodo = (id: number, todo: any) => ({
  type: EDIT_TODO,
  id,
  todo,
});

// reducer
export default function todos(state = initialState, action: any) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case TOGGLE_TODO:
      return state.map(
        (todo) =>
          todo.id === action.id // id 가 일치하면
            ? { ...todo, done: !todo.done } // done 값을 반전
            : todo // 아니면 그냥 둠
      );
    case DELETE_TODO:
      return state.slice().filter((todo) => todo.id !== action.id); // id일치하면 삭제
    case EDIT_TODO:
      const editTodo = state.filter((todo) => todo.id === action.id);
      const editTodoIndex = state.indexOf(editTodo[0]);
      return state.map((todo) =>
        todo.id === action.id
          ? {
              id: state[editTodoIndex].id,
              date: state[editTodoIndex].date,
              done: state[editTodoIndex].done,
              content: action.todo,
            }
          : todo
      );
    default:
      return state;
  }
}
