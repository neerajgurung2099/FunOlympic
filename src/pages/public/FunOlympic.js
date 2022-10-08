import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const sections = [
  { title: "Home", url: "#" },
  { title: "Live Games", url: "livegames" },
  { title: "Game Schedule", url: "gameschedule" },
  { title: "Game Results", url: "#" },
  { title: "News", url: "#" },
  { title: "Gallery", url: "#" },
  { title: "Participants", url: "#" },
];

const theme = createTheme();

export default function FunOlympic() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Fun Olympic 2022" sections={sections} />
        <Outlet />
      </Container>

      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
