import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid, Box, Toolbar, IconButton, Button, Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import Form from "./components/Form/Form";
import { getBoards } from "./actions/boards";
import useStyles from "./styles";

const App = () => {
  const boards = useSelector((state) => state.boards);
  const [currentId, setCurrentId] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getBoards());
  }, [currentId, dispatch]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }} style={{ marginBottom: 20 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "none" } }}>
              KANBAN
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grow in>
        <Container style={{ paddingLeft: 0, paddingRight: 0 }} disableGutters variant="contained">
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={2} sx={{ color: "#fff" }}>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} color="primary">
                All Board
              </Typography>
              {boards.map((board) => {
                return (
                  <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} color="secondary">
                    {board.title}
                  </Typography>
                );
              })}

              <Typography onClick={handleOpen} variant="h6" noWrap color="primary" component="div" sx={{ flexGrow: 1 }}>
                Create Board
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Box sx={{ flexGrow: 1 }} style={{ marginBottom: 10 }}>
                <Container
                  style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    display: "flex"
                  }}
                  disableGutters
                  variant="contained"
                >
                  <Grid item xs={12} sm={4} md={4}>
                    <Typography variant="h6" noWrap component="div" align="center" sx={{ flexGrow: 1 }}>
                      TODO
                    </Typography>
                    <KanbanBoard setCurrentId={setCurrentId} boardType={0} />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <Typography variant="h6" noWrap component="div" align="center" sx={{ flexGrow: 1 }}>
                      DOING
                    </Typography>
                    <KanbanBoard setCurrentId={setCurrentId} boardType={1} />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <Typography variant="h6" noWrap component="div" align="center" sx={{ flexGrow: 1 }}>
                      DONE
                    </Typography>
                    <KanbanBoard setCurrentId={setCurrentId} boardType={2} />
                  </Grid>
                </Container>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Form currentId={currentId} setCurrentId={setCurrentId} onClose={handleClose} />
        </Box>
      </Modal>
    </Container>
  );
};

export default App;
