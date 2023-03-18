import axios from "axios";

const url = "http://localhost:5000/boards";

export const fetchBoards = () => axios.get(url);
export const createBoard = (newBoard) => axios.post(url, newBoard);
export const likeBoard = (id) => axios.patch(`${url}/${id}/likeBoard`);
export const updateBoard = (id, updatedBoard) => axios.patch(`${url}/${id}`, updatedBoard);
export const deleteBoard = (id) => axios.delete(`${url}/${id}`);
