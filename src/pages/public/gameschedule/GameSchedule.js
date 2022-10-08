import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UpComingGame from "./UpComingGame";
import CurrentLiveGame from "./CurrentLiveGame";
import { Divider, Typography } from "@mui/material";

const GameSchedule = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: "100%", typography: "body1", mt: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Schedule
        </Typography>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Live" value="1" />
              <Tab label="Upcoming" value="2" />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: "0 !important" }} value="1">
            <CurrentLiveGame />
          </TabPanel>
          <TabPanel sx={{ padding: "0 !important" }} value="2">
            <UpComingGame />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default GameSchedule;
