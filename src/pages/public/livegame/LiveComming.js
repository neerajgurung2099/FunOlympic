import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
const LiveComming = () => {
  const initialState = {
    LiveGames: [],
  };
  const [state, setState] = useState(initialState);

  const ImageList = [
    "https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/33703/relay-race-competition-stadium-sport.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://img.olympicchannel.com/images/image/private/t_social_share_thumb/f_auto/primary/qjxgsf7pqdmyqzsptxju",
    "https://static01.nyt.com/images/2022/09/12/business/10db-tennis-print/10db-tennis-01-videoSixteenByNineJumbo1600.jpg",
    "https://cdn4.explainthatstuff.com/og-large-swimming.jpg",
  ];

  useEffect(() => {
    axios
      .get("https://localhost:7084/api/Public/GetCurrentLiveGames")
      .then((response) => {
        var result = JSON.parse(response.data.value);
        console.log(result);
        var arr = [];
        var obj = {};
        for (var i = 0; i < result.length; i++) {
          obj = {
            Match_Id: result[i]["Match_Id"],
            MatchTitle: result[i]["Match_Title"],
            Image: ImageList[i],
          };
          arr.push(obj);
        }
        setState({ LiveGames: arr });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box>
      <Typography>Comming Up</Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {console.log(state)}

        {state.LiveGames.map((game) => (
          <Grid item xs={2} sm={4} md={2} key={game.Match_Id}>
            <Card sx={{ maxWidth: 230 }}>
              <CardMedia component="img" height="100" image={game.Image} />
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: 20,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {game.MatchTitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LiveComming;
