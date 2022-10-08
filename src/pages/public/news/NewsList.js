import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
const NewsList = () => {
  const initialState = {
    NewsList: [],
  };
  const navigate = useNavigate();
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
      .get("https://localhost:7084/api/Public/GetAllNews")
      .then((response) => {
        if (response.data.value) {
          var result = JSON.parse(response.data.value);
          if (result.length >= 0) {
            console.log(result);
            var arr = [];
            var obj = {};
            for (var i = 0; i < result.length; i++) {
              obj = {
                NewsId: result[i]["News_Id"],
                NewsTitle: result[i]["News_Title"],
                Image: ImageList[i],
              };
              arr.push(obj);
            }
            setState({ NewsList: arr });
          } else {
          }
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {state.NewsList.map((news) => (
        <Grid item xs={6} sm={6} md={4} key={news.id}>
          <Card
            onClick={() => navigate(`${news.NewsId}`)}
            sx={{ maxWidth: 400, cursor: "pointer" }}
          >
            <CardMedia component="img" height="200" image={news.Image} />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                height: 80,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {news.NewsTitle}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default NewsList;
