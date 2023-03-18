import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { createBoard, updateBoard } from "../../actions/boards";

const Form = ({ currentId, setCurrentId, onClose }) => {
  const [boardData, setBoardData] = useState({
    title: "",
    description: "",
    status: 0,
    subTasks: []
  });
  const board = useSelector((state) => (currentId ? state.boards.find((b) => b._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (board) setBoardData(board);
  }, [board]);

  const clear = () => {
    setCurrentId(0);
    setBoardData({ title: "", description: "", status: 0, subTasks: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (boardData?.title === "") {
      alert("please enter the board title");
      return false;
    }

    if (currentId === 0) {
      dispatch(createBoard(boardData));
      clear();
    } else {
      dispatch(updateBoard(currentId, boardData));
      clear();
    }
    onClose();
  };
  const [inputFields, setInputFields] = useState([]);

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        subTask: ""
      }
    ]);
  };
  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };
  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
    setBoardData({ ...boardData, subTasks: list });
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${board.title}"` : "Creating a Memory"}</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={boardData.title}
          onChange={(e) => setBoardData({ ...boardData, title: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={boardData.description}
          onChange={(e) => setBoardData({ ...boardData, description: e.target.value })}
        />
        <div className="col-12">
          {inputFields.map((data, index) => {
            const { subTask } = data;
            return (
              <div className="row my-3" key={index}>
                <TextField
                  name="subTask"
                  variant="outlined"
                  label="Sub Task"
                  fullWidth
                  value={subTask}
                  onChange={(e) => {
                    handleChange(index, e);
                    // setBoardData({ ...boardData, subtasks: e.target.value });
                  }}
                />

                {inputFields.length !== 1 ? (
                  <Button
                    className={`btn btn-outline-danger`}
                    onClick={removeInputFields}
                    variant="contained"
                    color="Secondary"
                    size="small"
                    type="button"
                    style={{ marginBottom: 10 }}
                  >
                    X
                  </Button>
                ) : (
                  ""
                )}
              </div>
            );
          })}

          <Button className={classes.buttonSubmit} onClick={addInputField} variant="contained" color="Secondary" size="small" type="button" fullWidth>
            Create Task
          </Button>
        </div>

        <TextField
          name="status"
          variant="outlined"
          id="select"
          label="Status"
          value={boardData.status}
          select
          fullWidth
          onChange={(e) => setBoardData({ ...boardData, status: e.target.value })}
        >
          <MenuItem value="0">ToDo</MenuItem>
          <MenuItem value="1">Doing</MenuItem>
          <MenuItem value="2">Done</MenuItem>
        </TextField>

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
