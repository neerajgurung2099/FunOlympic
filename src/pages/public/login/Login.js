import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import UserForgetPassword from "./UserForgetPassword";

const theme = createTheme();

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const initialState = {
    UserLogin: true,
    UserRegister: false,
    UserForgetPassword: false,
  };
  const [state, setState] = useState(initialState);

  const handleUserNav = (navTo) => {
    navTo === "UserLogin" &&
      setState({
        UserLogin: true,
        UserRegister: false,
        UserForgetPassword: false,
      });

    navTo === "UserRegister" &&
      setState({
        UserLogin: false,
        UserRegister: true,
        UserForgetPassword: false,
      });
    navTo === "UserForgetPassword" &&
      setState({
        UserLogin: false,
        UserRegister: false,
        UserForgetPassword: true,
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {state.UserLogin && <UserLogin handleRoute={handleUserNav} />}

            {state.UserRegister && <UserRegister handleRoute={handleUserNav} />}
            {state.UserForgetPassword && (
              <UserForgetPassword handleRoute={handleUserNav} />
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
