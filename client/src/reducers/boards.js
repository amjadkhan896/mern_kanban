import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (boards = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return boards.map((board) => (board._id === action.payload._id ? action.payload : board));
    case CREATE:
      return [...boards, action.payload];
    case UPDATE:
      return boards.map((board) => (board._id === action.payload._id ? action.payload : board));
    case DELETE:
      return boards.filter((board) => board._id !== action.payload);
    default:
      return boards;
  }
};

