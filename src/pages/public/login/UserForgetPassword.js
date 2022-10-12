import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const UserForgetPassword = ({ handleRoute }) => {
  const initialState = {
    emailSent: false,
    email: "",
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const handlePasswordChange = () => {
    axios
      .post("https://localhost:7084/api/Login/ResetPassword", {
        Email: state.email,
        UserName: "",
        UserPassword: "",
      })
      .then((response) => {
        setState({ ...state, emailSent: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Forget Password
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

        {state.emailSent == false ? (
          <Button
            onClick={() => handlePasswordChange()}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Forget Password
          </Button>
        ) : (
          <Typography>Please Check your email !!!</Typography>
        )}

        <Grid container>
          <Grid item xs md={12}>
            <Link onClick={() => handleRoute("UserLogin")} variant="body2">
              Alread have an account? Sign In
            </Link>
          </Grid>
          <Grid item md={12}>
            <Link onClick={() => handleRoute("UserRegister")} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UserForgetPassword;
