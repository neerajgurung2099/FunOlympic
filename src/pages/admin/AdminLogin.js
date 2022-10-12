import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useAuth } from "../../service/Auth";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

export default function AdminLogin() {
  const auth = useAuth();
  const initialState = {
    email: "",
    password: "",
    loading: false,
    alertType: "",
    alertMessage: "",
    alertOpen: false,
  };
  const [state, setState] = useState(initialState);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const navigate = useNavigate();
  const handleSubmit = () => {
    setState({ ...state, loading: true });
    axios
      .post("https://localhost:7084/api/Login/AdminLogin", {
        Email: state.email,
        UserPassword: state.password,
        UserName: "",
      })
      .then((response) => {
        var result = JSON.parse(response.data.value);
        console.log(result);
        if (result.length > 0) {
          var obj = {
            UserName: result[0]["User_Name"],
            Email: result[0]["Email"],
            Role: "admin",
          };
          auth.login(obj);
          setState({ ...state, loading: false });
          navigate("/user", { replace: true });
        } else {
          setState({
            ...state,
            alertType: "error",
            alertMessage: "Incorrect Username or password",
            alertOpen: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setState({ ...state, loading: false });
      });
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, alertOpen: false });
  };

  const handlePasswordChange = () => {
    axios
      .post("https://localhost:7084/api/Login/AdminResetPassword", {
        Email: "",
        UserName: "",
        UserPassword: "",
      })
      .then((response) => {
        setState({
          ...state,
          alertType: "success",
          alertMessage: "Email sent",
          alertOpen: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Snackbar
          open={state.alertOpen}
          autoHideDuration={1000}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity={state.alertType}
            sx={{ width: "100%" }}
          >
            {state.alertMessage}
          </Alert>
        </Snackbar>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={state.email}
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
              autoComplete="current-password"
              value={state.password}
              onChange={handleChange}
            />
            <LoadingButton
              fullWidth
              loadingPosition="start"
              startIcon={<LockOpenIcon />}
              variant="outlined"
              onClick={handleSubmit}
              loading={state.loading ? true : false}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link onClick={handlePasswordChange} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
