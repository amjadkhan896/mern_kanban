import React from "react";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import Item from "./Board/Board";
import useStyles from "./styles";

const Board = ({ setCurrentId, boardType }) => {
  const boards = useSelector((state) => state.boards);
  const classes = useStyles();
  const filterBoards = boards?.filter((i) => i?.status == boardType);

  return !filterBoards.length ? (
    <Grid className={classes.container} container style={{ color: "#fff" }}>
      <Typography variant="h6">No data Available</Typography>
    </Grid>
  ) : (
    // <CircularProgress />
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {filterBoards.map((board) => (
        <Grid key={board._id} item xs={12} sm={11} md={11}>
          <Item board={board} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;
