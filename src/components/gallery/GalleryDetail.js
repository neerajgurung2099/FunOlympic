import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import IosSwitch from "../common/IosSwitch";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const GalleryDetail = () => {
  const initialState = {
    view: true,
    open: false,
    loading: false,
    success: false,
    imageList: [],
    image: "",
  };
  const [values, setValues] = useState(initialState);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setValues({ ...values, open: false });
  };

  const handleSubmit = () => {
    setValues({ ...values, loading: true });
    console.log(values);
    var formData = new FormData();
    formData.append("Image", values.image);
    formData.append("View", values.view);
    console.log(formData.get("Image"));
    axios
      .post(
        "https://localhost:7084/api/Game/InsertImageIntoGallery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.data.value) {
          const data = JSON.parse(response.data.value);
          if (data.Status == 200) {
            setValues({ ...initialState, open: true, success: true });
            getAllImage();
          } else {
            setValues({
              ...values,
              loading: false,
              open: true,
              success: false,
            });
          }
        } else {
          setValues({
            ...values,
            loading: false,
            open: true,
            success: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setValues({
          ...values,
          loading: false,
          open: true,
          success: false,
        });
      });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.files[0] });
  };

  const handleDelete = (id) => {
    axios
      .post("https://localhost:7084/api/Game/DeleteGalleryImageById", {
        MatchParticipantId: id,
      })
      .then((response) => {
        const data = JSON.parse(response.data.value);
        if (data.Status == 200) {
          setValues({ ...initialState, open: true, success: true });
          getAllImage();
        } else {
          setValues({
            ...values,
            loading: false,
            open: true,
            success: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setValues({
          ...values,
          loading: false,
          open: true,
          success: false,
        });
      });
  };

  const getAllImage = () => {
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
  };
  useEffect(() => {
    getAllImage();
  }, []);

  return (
    <Box
      component="form"
      encType="multipart/form-data"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
      style={{ boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.50)" }}
    >
      <Card>
        <Snackbar
          open={values.open}
          autoHideDuration={1000}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity={values.success ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {values.success ? "Succesfully Saved" : "Failed to save"}
          </Alert>
        </Snackbar>
        <CardHeader subheader="Add Images" title="Gallery" />
        <Divider />
        <CardContent>
          {console.log(values)}
          <Grid container spacing={1}>
            <Grid item md={3} xs={12}>
              <TextField
                sx={{ width: "100% !important" }}
                name="image"
                onChange={handleChange}
                required
                inputProps={{ accept: "image/*" }}
                type="file"
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={2}
              xs={12}
              sx={{ display: "flex !important", alignItems: "center" }}
            >
              <FormControlLabel
                sx={{ ml: 2 }}
                control={
                  <IosSwitch
                    onChange={() =>
                      setValues({ ...values, view: !values.view })
                    }
                    sx={{ mr: 2 }}
                    defaultChecked
                  />
                }
                label="View"
              />
            </Grid>
            <Grid
              item
              xs={1}
              sx={{ display: "flex !important", alignItems: "center" }}
            >
              <LoadingButton
                sx={{ ml: 2 }}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                onClick={handleSubmit}
                loading={values.loading ? true : false}
              >
                Save
              </LoadingButton>
            </Grid>
            <Grid item xs={12}>
              <ImageList
                sx={{ width: "100%", height: 600 }}
                cols={5}
                rowHeight={164}
              >
                {values.imageList.map((image) => (
                  <ImageListItem key={image.id}>
                    <img
                      src={`/images/${image.src}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`/images/${image.src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      position="top"
                      sx={{ background: "none !important" }}
                      actionIcon={
                        <IconButton
                          onClick={() => handleDelete(image.id)}
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GalleryDetail;
