import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  TableContainer,
  Typography,
  IconButton,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { URI } from "../keys";

const Task2 = () => {
  const initialState = { fullName: "", phone: "" };
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState();
  const [formData, setFormData] = useState();
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  useEffect(() => {
    getUsers();
    getCount();
  }, []);

  const addUser = async () => {
    await axios
      .post(`${URI}/user/adduser`, formData)
      .then((res) => {
        setMessage(res.data?.message);
        handleClick();
        setFormData(initialState);
        getUsers();
        getCount();
      })
      .catch(() => {
        setMessage("Fields are empty");
        handleClick();
      });
  };

  const editUser = async () => {
    await axios
      .patch(`${URI}/user/edituser`, formData)
      .then((res) => {
        setMessage(res.data?.message);
        handleClick();
        setFormData(initialState);
        getUsers();
        getCount();
        setEdit(false);
      })
      .catch(() => {
        setMessage("Fields are empty");
        handleClick();
      });
  };

  const getCount = async () => {
    await axios
      .get(`${URI}/user/getcount`)
      .then((res) => {
        setCount(res.data.result[0].count);
        console.log(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  const getUsers = async () => {
    await axios
      .get(`${URI}/user/getusers`)
      .then((res) => {
        setUsers(res.data.result);
        console.log(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth="lg" className="task2">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item md={5}>
            <TextField
              label="Name"
              fullWidth
              value={formData?.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            <TextField
              label="Phone Number"
              fullWidth
              sx={{ mt: 2 }}
              value={formData?.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <Button
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => (edit ? editUser() : addUser())}
              size="large"
            >
              {edit ? "EDIT" : "ADD"}
            </Button>
            <Button
              fullWidth
              sx={{ mt: 2 }}
              variant="outlined"
              onClick={() => {
                setEdit(false);
                setFormData(initialState);
              }}
              size="large"
              color="secondary"
            >
              CLEAR
            </Button>
          </Grid>
          <Grid item md={7}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Phone Number</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((row) => (
                    <TableRow
                      key={row?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.fullName}
                      </TableCell>
                      <TableCell align="right">{row?.phone}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setEdit(true);
                            setFormData(row);
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Typography variant="body1" sx={{ mt: 4 }} align="center">
          Total number of times API is called to add/update : {count}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Task2;
