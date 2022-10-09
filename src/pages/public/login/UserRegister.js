import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useAuth } from "../../../service/Auth";
import { useNavigate } from "react-router-dom";
const UserRegister = ({ handleRoute }) => {
  const initialState = {
    userName: "",
    loading: false,
    email: "",
    password: "",
    open: false,
  };
  const [state, setState] = React.useState(initialState);

  const navigate = useNavigate();
  const auth = useAuth();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSubmit = () => {
    setState({ ...state, loading: true });
    axios
      .post("https://localhost:7084/api/Login/VerifyEmail", {
        Email: state.email,
        UserName: "",
        UserPassword: "",
      })
      .then((response) => {
        var result = JSON.parse(response.data.value);
        console.log(result);
        if (result.length == 0) {
          axios
            .post("https://localhost:7084/api/Login/RegisterUser", {
              Email: state.email,
              UserPassword: state.password,
              UserName: state.userName,
            })
            .then((response) => {
              console.log(response);
              var result = JSON.parse(response.data.value);
              console.log(result);
              if (result.Status == 200) {
                var obj = {
                  UserName: state.userName,
                  Email: state.email,
                  Role: "user",
                };
                auth.login(obj);
                navigate("/funolympic/livegames", { replace: true });
              } else {
                setState({
                  ...state,
                  loading: false,
                  open: true,
                  messge: "Failed to register",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              setState({
                ...state,
                loading: false,
                open: true,
                message: "Something went wrong",
              });
            });
        } else {
          setState({
            ...state,
            loading: false,
            message: "Email Already Exists",
            open: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setState({
          ...state,
          loading: false,
          open: true,
          message: "Something went wrong",
        });
      });
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  return (
    <>
      <Snackbar
        open={state.open}
        autoHideDuration={1000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={"error"}
          sx={{ width: "100%" }}
        >
          {state.message}
        </Alert>
      </Snackbar>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
          value={state.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="userName"
          label="User Name"
          name="userName"
          autoComplete="userName"
          value={state.userName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={state.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <LoadingButton
          fullWidth
          loadingPosition="start"
          startIcon={<LockOpenIcon />}
          variant="outlined"
          onClick={handleSubmit}
          loading={state.loading ? true : false}
        >
          Sign Up
        </LoadingButton>
        <Grid container>
          <Grid item xs>
            <Link
              onClick={() => handleRoute("UserForgetPassword")}
              variant="body2"
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link onClick={() => handleRoute("UserLogin")} variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UserRegister;
