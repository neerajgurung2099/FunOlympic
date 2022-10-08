import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";

const NewsDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const newsId = params.newsId;

  const [state, setState] = useState({});
  useEffect(() => {
    axios
      .post("https://localhost:7084/api/Public/GetNewsDetailById", {
        NewsId: newsId,
        NewsDescription: "",
        NewsTitle: "",
      })
      .then((response) => {
        var result = JSON.parse(response.data.value);
        console.log(result);
        var obj = {
          NewsTitle: result[0]["News_Title"],
          NewsDescription: result[0]["News_Description"],
        };
        setState(obj);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <Box>
        {console.log(state)}
        <Box sx={{ mb: 5, mt: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {state.NewsTitle}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <img
                src="/images/3ee3863f-5e67-48fd-8663-d47ee4a016c9.jpg"
                style={{
                  height: 500,
                  width: "100%",
                }}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mt: 3 }} item xs={12} sm={12} md={12}>
            <Typography>{state.NewsDescription}</Typography>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default NewsDetail;
