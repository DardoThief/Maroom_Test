import { PUT_DATA, GET_DATA } from "./action";

const initialState = {
  data: {
    name: '',
    surname: '',
    patronymic: '',
    birthday: '',
    email: '',
  },
};

export const maroomReducer = (state = initialState, action) => {
  if (action.type === PUT_DATA) {
    return { ...state, data: action.payload }
  }
  if (action.type === GET_DATA) {
    return state;
  }
  return state;
}
