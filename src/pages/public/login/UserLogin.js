import * as React from "react";
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
const UserLogin = ({ handleRoute }) => {
  const initialState = {
    loading: false,
    email: "",
    password: "",
  };
  const [state, setState] = React.useState(initialState);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {};

  return (
    <>
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
