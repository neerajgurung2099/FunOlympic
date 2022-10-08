import React, { useEffect, useState } from "react";
import { Grid, Typography, Divider } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import Box from "@mui/material/Box";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const PublicGallery = () => {
  const initialState = {
    imageList: [],
  };
  const [values, setValues] = useState(initialState);

  useEffect(() => {
    axios
      .get("https://localhost:7084/api/Game/GetAllImage")
      .then((response) => {
        if (response.data.value) {
          var result = JSON.parse(response.data.value);
          console.log(result);
          var obj = {};
          var arr = [];
          for (var i = 0; i < result.length; i++) {
            obj = {
              id: result[i]["Gallery_Id"],
              src: result[i]["Image_Link"],
            };
            arr.push(obj);
          }
          setValues({ ...values, imageList: arr });
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Gallery
      </Typography>
      <Box sx={{ width: "100%", height: "100vh", overflowY: "scroll" }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {values.imageList.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`/images/${item.src}?w=248&fit=crop&auto=format`}
                srcSet={`/images/${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
};

export default PublicGallery;
