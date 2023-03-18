import express from "express";
import mongoose from "mongoose";

import BoardModel from "../models/boardModel.js";

const router = express.Router();

export const getBoards = async (req, res) => {
  try {
    const boardModel = await BoardModel.find();

    res.status(200).json(boardModel);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBoard = async (req, res) => {
  const { id } = req.params;

  try {
    const board = await BoardModel.findById(id);

    res.status(200).json(board);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createBoard = async (req, res) => {
  const { title, description, status, subTasks } = req.body;

  const newBoardMessage = new BoardModel({ title, description, status, subTasks });

  try {
    await newBoardMessage.save();

    res.status(201).json(newBoardMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateBoard = async (req, res) => {
  const { id } = req.params;
  const { title, description, subTasks } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No board with id: ${id}`);

  const updatedBoard = { title, description, subTasks, _id: id };

  await BoardModel.findByIdAndUpdate(id, updatedBoard, { new: true });

  res.json(updatedBoard);
};

export const deleteBoard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No board with id: ${id}`);

  await BoardModel.findByIdAndRemove(id);

  res.json({ message: "Board deleted successfully." });
};
 

export default router;
