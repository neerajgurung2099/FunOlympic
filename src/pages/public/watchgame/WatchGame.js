import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import LiveGameList from "../livegame/LiveGameList";
import MatchBoardType1 from "./MatchBoardType1";
import MatchBoardType2 from "./MatchBoardType2";
const WatchGame = () => {
  const params = useParams();
  const matchId = params.matchId;

  const initialState = {
    participant1: "Real Madrid",
    participant2: "Real Madrid",
    point1: "1",
    point2: "1",
    participantList: [{ id: "1", participantname: "Neeraj", points: "2" }],
    participantType: 3,
  };
  const [state, setState] = useState(initialState);
  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <iframe
            width="100%"
            height="600px"
            src="https://www.youtube.com/embed/eFGasBEAdWs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Grid>

        {(state.participantType == 1 || state.participantType == 2) && (
          <>
            <MatchBoardType1
              participant1={state.participant1}
              participant2={state.participant2}
              point1={state.point1}
              point2={state.point2}
            />
          </>
        )}

        {(state.participantType == 3 || state.participantType == 4) && (
          <>
            <MatchBoardType2 participantList={state.participantList} />
          </>
        )}

        <Grid item xs={12} sm={12} md={12}>
          <Box sx={{ mb: 5, mt: 5 }}>
            <Typography sx={{ mb: 1 }}>Other Live Games</Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <LiveGameList />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WatchGame;
