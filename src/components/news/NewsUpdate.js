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
import { CheckRounded } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const NewsUpdate = () => {
  const navigate = useNavigate();
  const params = useParams();
  const newsId = params.newsId;
  const initialState = {
    newsTitle: "",
    newsDescription: "",
    view: true,
    open: false,
    loading: false,
    success: false,
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
    axios
      .post("https://localhost:7084/api/Game/UpdateNews", {
        NewsTitle: values.newsTitle,
        NewsDescription: values.newsDescription,
        View: values.view,
        GroupId: 0,
        NewsId: newsId,
      })
      .then((response) => {
        if (response.data.value) {
          const data = JSON.parse(response.data.value);
          if (data.Status == 200) {
            navigate("/news");
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

  useEffect(() => {
    axios
      .post("https://localhost:7084/api/Game/GetNewsDetailsById", {
        NewsId: newsId,
        NewsTitle: "",
        NewsDescription: "",
        View: false,
        GroupId: 0,
      })
      .then((response) => {
        var result = JSON.parse(response.data.value);
        console.log(result);
        setValues({
          ...values,
          newsTitle: result[0]["News_Title"],
          newsDescription: result[0]["News_Description"],
          view: result[0]["View"],
        });
      })
      .catch((error) => console.log(error));
  }, []);
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <Box
      component="form"
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
        <CardHeader subheader="Create new News" title="News" />
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item md={3} xs={12}>
              <TextField
                sx={{ width: "100% !important" }}
                helperText="Please specify Game Name"
                label="News Title"
                name="newsTitle"
                onChange={handleChange}
                required
                value={values.newsTitle}
                variant="outlined"
              />
            </Grid>
            <Grid item md={9} xs={12}>
              <TextField
                sx={{ width: "100% !important" }}
                helperText="Please specify News Description"
                label="News Description"
                name="newsDescription"
                onChange={handleChange}
                required
                value={values.newsDescription}
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                sx={{ ml: 2 }}
                checked={values.view}
                control={
                  <IosSwitch
                    onChange={() =>
                      setValues({ ...values, view: !values.view })
                    }
                    sx={{ mr: 2 }}
                  />
                }
                label="View"
              />
            </Grid>
            <Grid item xs={12}>
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
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewsUpdate;
