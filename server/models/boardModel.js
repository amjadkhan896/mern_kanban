import mongoose from "mongoose";

const boardSchema = mongoose.Schema({
  title: String,
  description: String,
  subTasks: [],

  status: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

var BoardModel = mongoose.model("BoardModel", boardSchema);

export default BoardModel;
