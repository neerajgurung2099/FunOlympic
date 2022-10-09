import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Divider, Grid, Typography } from "@mui/material";
import GameGroupList from "./GameGroupList";
import GroupDetail from "./GroupDetail";
import { Stack } from "@mui/system";
import MatchBoardType1 from "../watchgame/MatchBoardType1";
import MatchBoardType2 from "../watchgame/MatchBoardType2";
import axios from "axios";
const PublicResults = () => {
  const initialState = {
    GameTitle: "",
    GameDescription: "",
    Participant1: "",
    Participant2: "",
    Point1: "",
    Point2: "",
    ParticipantList: [],
    ParticipantType: 0,
  };
  const [state, setState] = useState(initialState);

  const GetResultInfo = (MatchId) => {
    axios
      .post("https://localhost:7084/api/Public/GetGroupAndMatchDetail", {
        MatchId: MatchId,
        LiveLink: "",
        MatchTitle: "",
        StartDate: "",
        StartTime: "",
        matchParticipants: [],
      })
      .then((response) => {
        var result = JSON.parse(response.data.value);
        console.log(result);
        var ParticipantType = result[0]["ParticpantType"];
        if (ParticipantType == 1 || ParticipantType == 2) {
          setState({
            GameTitle: result[0]["Game_Name"],
            GameDescription: result[0]["Game_Description"],
            ParticipantType: result[0]["ParticpantType"],
            Participant1: result[0]["ParticipantName"],
            Participant2: result[1]["ParticipantName"],
            Point1: result[0]["Points"] == "" ? 0 : result[0]["Points"],
            Point2: result[1]["Points"] == "" ? 0 : result[1]["Points"],
            ParticipantList: [],
          });
        } else {
          var arr = [];
          var obj = {};
          for (var i = 0; i < result.length; i++) {
            obj = {
              id: i + 1,
              GameTitle: result[0]["Game_Name"],
              GameDescription: result[0]["Game_Description"],
              participantname: result[i]["ParticipantName"],
              points: result[i]["Points"] == "" ? 0 : result[i]["Points"],
            };
            arr.push(obj);
          }
          console.log(arr);
          setState({
            ...initialState,
            GameTitle: result[0]["Game_Name"],
            GameDescription: result[0]["Game_Description"],
            ParticipantType: result[0]["ParticpantType"],
            ParticipantList: arr,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1", mt: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
          Results
        </Typography>

        <Typography sx={{ fontSize: "15px" }}>Select Game</Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12} sm={12} md={4}>
            <GameGroupList handleClick={GetResultInfo} />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Grid container>
              {console.log(state)}
              {state.GameTitle != "" ? (
                <>
                  <Grid
                    display={"flex"}
                    justifyContent="center"
                    mb={1}
                    item
                    md={12}
                  >
                    <GroupDetail
                      GameTitle={state.GameTitle}
                      GameDescription={state.GameDescription}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <Divider>
                      <Typography> Final Results </Typography>
                    </Divider>
                  </Grid>
                </>
              ) : (
                <Grid item md={12}>
                  <Divider>
                    <Typography> Select A Game </Typography>
                  </Divider>
                </Grid>
              )}
              {(state.ParticipantType == 1 || state.ParticipantType == 2) && (
                <MatchBoardType1
                  participant1={state.Participant1}
                  participant2={state.Participant2}
                  point1={state.Point1}
                  point2={state.Point2}
                />
              )}
              {(state.ParticipantType == 3 || state.ParticipantType == 4) && (
                <MatchBoardType2
                  columnSize={{ point: 100, name: 500, id: 90 }}
                  participantList={state.ParticipantList}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PublicResults;
