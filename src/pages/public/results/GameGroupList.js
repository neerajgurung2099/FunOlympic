import React, { useEffect, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { Divider, Box } from "@mui/material";
const GameGroupList = ({ handleClick }) => {
  const initialState = {
    games: [],
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    axios
      .get("https://localhost:7084/api/Public/GetGameMatchList")
      .then((response) => {
        setState({ games: response.data.value });
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {state.games?.map((group) => (
        <Accordion key={group.groupId}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{group.groupName}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "0 !important" }}>
            {group.games?.map((game) => (
              <Accordion key={game.gameId}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{game.gameName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {game.matches?.map((match) => (
                    <Box
                      key={match.matchId}
                      onClick={() => handleClick(match.matchId)}
                      sx={{ cursor: "pointer" }}
                    >
                      <Typography>{`TITLE - ${match.matchTitle}`}</Typography>

                      <Typography>
                        {`DATE - ${match.startDateTime} `}
                      </Typography>
                      <Divider />
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default GameGroupList;
