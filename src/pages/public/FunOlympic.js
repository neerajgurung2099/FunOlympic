import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const sections = [
  { title: "Live Games", url: "livegames" },
  { title: "Game Schedule", url: "gameschedule" },
  { title: "Game Results", url: "results" },
  { title: "News", url: "news" },
  { title: "Gallery", url: "publicgallery" },
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

      {/* <Footer title="Fun Olympic 2022" description="@CopyRight!" /> */}
    </ThemeProvider>
  );
}
