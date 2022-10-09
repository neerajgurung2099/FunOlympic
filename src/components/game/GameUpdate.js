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
import { useNavigate, useParams } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const GameUpdate = () => {
  const navigate = useNavigate();
  const params = useParams();
  const gameId = params.gameId;
  const initialState = {
    gameName: "",
    gameDescription: "",
    view: true,
    totalMatches: 0,
    loading: false,
    alertOpen: false,
    alertType: "",
    alertMessage: "",
  };
  const [values, setValues] = useState(initialState);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setValues({ ...values, alertOpen: false });
  };

  const handleSubmit = () => {
    setValues({ ...values, loading: true });
    axios
      .post("https://localhost:7084/api/Game/UpdateGame", {
        GameName: values.gameName,
        GameDescription: values.gameDescription,
        View: values.view,
        TotalMatches: values.totalMatches,
        matches: [],
        GameId: gameId,
      })
      .then((response) => {
        if (response.data.value) {
          const data = JSON.parse(response.data.value);
          if (data.Status == 200) {
            navigate("/game");
          } else {
            setValues({
              ...values,
              loading: false,

              alertOpen: true,
              alertMessage: "Something went wrong",
              alertType: "error",
            });
          }
        } else {
          setValues({
            ...values,
            loading: false,
            alertOpen: true,
            alertMessage: "Something went wrong",
            alertType: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setValues({
          ...values,
          loading: false,
          alertOpen: true,
          alertMessage: "Something went wrong",
          alertType: "error",
        });
      });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    axios
      .post("https://localhost:7084/api/Game/GetGameDetailsById", {
        GameId: gameId,
        GameDescription: "",
        GameName: "",
        matches: [],
      })
      .then((response) => {
        var result = JSON.parse(response.data.value);
        console.log(result);
        setValues({
          ...values,
          gameName: result[0]["Game_Name"],
          gameDescription: result[0]["Game_Description"],
          view: result[0]["View"],
          totalMatches: result[0]["Total_Matches"],
        });
      })
      .catch((error) => console.log(error));
  }, []);
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
          open={values.alertOpen}
          autoHideDuration={1000}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity={values.alertType}
            sx={{ width: "100%" }}
          >
            {values.alertMessage}
          </Alert>
        </Snackbar>
        <CardHeader subheader="Update game" title="Game" />
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item md={3} xs={12}>
              <TextField
                sx={{ width: "100% !important" }}
                helperText="Please specify Game Name"
                label="Game Name"
                name="gameName"
                onChange={handleChange}
                required
                value={values.gameName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={9} xs={12}>
              <TextField
                sx={{ width: "100% !important" }}
                helperText="Please specify Game Description"
                label="Game Description"
                name="gameDescription"
                onChange={handleChange}
                required
                value={values.gameDescription}
                variant="outlined"
              />
            </Grid>

            <Grid item md={3} xs={12}>
              <TextField
                sx={{ width: "100% !important" }}
                helperText="Please specify Total Matches"
                label="Total Matches"
                name="totalMatches"
                onChange={handleChange}
                required
                value={values.totalMatches}
                variant="outlined"
                type="number"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                sx={{ ml: 2 }}
                control={
                  <IosSwitch
                    onChange={() =>
                      setValues({ ...values, view: !values.view })
                    }
                    sx={{ mr: 2 }}
                  />
                }
                checked={values.view}
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

export default GameUpdate;
