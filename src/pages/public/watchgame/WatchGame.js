import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import LiveGameList from "../livegame/LiveGameList";
import MatchBoardType1 from "./MatchBoardType1";
import MatchBoardType2 from "./MatchBoardType2";
import axios from "axios";
const WatchGame = () => {
  const params = useParams();
  const matchId = params.matchId;

  const initialState = {
    participant1: "",
    participant2: "",
    point1: "",
    point2: "",
    participantList: [],
    participantType: 3,
    LiveLink: "",
  };

  useEffect(() => {
    axios
      .post("https://localhost:7084/api/Public/GetGroupAndMatchDetail", {
        MatchId: matchId,
        LiveLink: "",
        MatchTitle: "",
        StartDate: "",
        StartTime: "",
        matchParticipants: [],
      })
      .then((response) => {
        var result = JSON.parse(response.data.value);
        var ParticipantType = result[0]["ParticpantType"];
        if (ParticipantType == 1 || ParticipantType == 2) {
          setState({
            participantType: result[0]["ParticpantType"],
            participant1: result[0]["ParticipantName"],
            participant2: result[1]["ParticipantName"],
            point1: result[0]["Points"] == "" ? 0 : result[0]["Points"],
            point2: result[1]["Points"] == "" ? 0 : result[1]["Points"],
            ParticipantList: [],
            LiveLink: result[0]["Live_Link"],
          });
        } else {
          var arr = [];
          var obj = {};
          for (var i = 0; i < result.length; i++) {
            obj = {
              id: i + 1,
              participantname: result[i]["ParticipantName"],
              points: result[i]["Points"] == "" ? 0 : result[i]["Points"],
            };
            arr.push(obj);
          }
          console.log(arr);
          setState({
            ...initialState,
            participantType: result[0]["ParticpantType"],
            participantList: arr,
            LiveLink: result[0]["Live_Link"],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [state, setState] = useState(initialState);
  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {console.log(state)}
        <Grid item xs={12} sm={12} md={12}>
          <iframe
            width="100%"
            height="600px"
            src={state.LiveLink}
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
            <MatchBoardType2
              columnSize={{ point: 150, id: 150, name: 800 }}
              participantList={state.participantList}
            />
          </>
        )}
      </Grid>
    </Box>
  );
};

export default WatchGame;
