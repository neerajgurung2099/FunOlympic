import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
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
import jwt_decode from "jwt-decode";
const UserLogin = ({ handleRoute }) => {
  const initialState = {
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
    axios
      .post("https://localhost:7084/api/Login/UserLogin", {
        Email: state.email,
        UserPassword: state.password,
        UserName: "",
      })
      .then((response) => {
        var result = JSON.parse(response.data.value);
        if (result.length > 0) {
          var obj = {
            UserName: result[0]["User_Name"],
            Email: result[0]["Email"],
            Role: "user",
          };
          auth.login(obj);
          setState({ ...state, loading: false });
          navigate("/funolympic/livegames", { replace: true });
        } else {
          setState({ ...state, open: true });
        }
      })
      .catch((error) => console.log(error));
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token" + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);

    axios
      .post("https://localhost:7084/api/Login/VerifyEmail", {
        Email: userObject.email,
        UserName: "",
        UserPassword: "",
      })
      .then((response) => {
        var result = JSON.parse(response.data.value);
        console.log(result);
        if (result.length > 0) {
          axios
            .post("https://localhost:7084/api/Login/RegisterUser", {
              Email: userObject.email,
              UserPassword: "",
              UserName: userObject.name,
            })
            .then((response) => {
              console.log(response);
              var result = JSON.parse(response.data.value);
              console.log(result);
              if (result.Status == 200) {
                var obj = {
                  UserName: userObject.name,
                  Email: userObject.email,
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
          var obj = {
            UserName: userObject.name,
            Email: userObject.email,
            Role: "user",
          };
          auth.login(obj);
          navigate("/funolympic/livegames", { replace: true });
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

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "692660259471-c1shd9qdnhrtssam7ajahjnbi1raaip1.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInGoogle"), {
      theme: "outline",
      size: "large",
    });
  }, []);

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
          {"Incorrect Email or Password"}
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
          value={state.email}
          onChange={handleChange}
          autoFocus
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
          Sign In
        </LoadingButton>

        <div
          style={{ marginTop: "15px", marginBottom: "15px" }}
          id="signInGoogle"
        ></div>
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
            <Link onClick={() => handleRoute("UserRegister")} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UserLogin;
