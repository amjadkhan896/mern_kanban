import express from "express";

import { getBoards, getBoard, createBoard, updateBoard, deleteBoard } from "../controllers/boards.js";

const router = express.Router();

router.get("/", getBoards);
router.post("/", createBoard);
router.get("/:id", getBoard);
router.patch("/:id", updateBoard);
router.delete("/:id", deleteBoard);

export default router;
