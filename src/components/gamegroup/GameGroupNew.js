import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  FormControlLabel,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import IosSwitch from "../common/IosSwitch";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const GameGroupNew = () => {
  const initialState = {
    groupName: "",
    groupDescription: "",
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
      .post("https://localhost:7084/api/Game/InsertGameGroup", {
        GroupName: values.groupName,
        GroupDescription: values.groupDescription,
        View: values.view,
      })
      .then((response) => {
        if (response.data.value) {
          const data = JSON.parse(response.data.value);
          if (data.Status == 200) {
            setValues({ ...initialState, open: true, success: true });
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
      .catch((result) => {
        setValues({
          ...values,
          loading: false,
          open: true,
          success: false,
        });
      });
  };

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
        <CardHeader subheader="Create new game group" title="Game Group" />
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item md={3} xs={12}>
              <TextField
                sx={{ width: "100% !important" }}
                helperText="Please specify Group Name"
                label="Group Name"
                name="groupName"
                onChange={handleChange}
                required
                value={values.groupName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={9} xs={12}>
              <TextField
                sx={{ width: "100% !important" }}
                helperText="Please specify Group Description"
                label="Group Description"
                name="groupDescription"
                onChange={handleChange}
                required
                value={values.groupDescription}
                variant="outlined"
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
                    defaultChecked
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

export default GameGroupNew;
