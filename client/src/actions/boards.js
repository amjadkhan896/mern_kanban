import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getBoards = () => async (dispatch) => {
  try {
    const { data } = await api.fetchBoards();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createBoard = (board) => async (dispatch) => {
  try {
    const { data } = await api.createBoard(board);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateBoard = (id, board) => async (dispatch) => {
  try {
    const { data } = await api.updateBoard(id, board);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likeBoard = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeBoard(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBoard = (id) => async (dispatch) => {
  try {
    await api.deleteBoard(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
