import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";

import { likeBoard, deleteBoard } from "../../../actions/boards";
import useStyles from "./styles";

const Board = ({ board, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.overlay}>
        <Typography variant="h6">{board.creator}</Typography>
        <Typography variant="body2" color="primary" style={{ marginTop: 8, marginLeft: "-2px" }}>
          {moment(board.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button   size="small" onClick={() => setCurrentId(board._id)}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>

      <Typography className={classes.title} gutterBottom variant="h5" component="h2">
        {board.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {board.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(deleteBoard(board._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Board;
