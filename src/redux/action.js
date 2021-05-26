export const PUT_DATA = 'PUT_DATA';
export const GET_DATA = 'GET_DATA';

export const putData = (data) => ({
  type: PUT_DATA,
  payload: data,
});

export const getData = () => ({
  type: GET_DATA,
});
