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
const GameGroupUpdate = () => {
  const navigate = useNavigate();
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

  const params = useParams();
  const groupId = params.groupId;
  useEffect(() => {
    axios
      .post("https://localhost:7084/api/Game/GetGroupDetailsById", {
        GroupId: groupId,
        GroupDescription: "",
        GroupName: "",
        Games: [],
      })
      .then((response) => {
        var result = JSON.parse(response.data.value);
        setValues({
          ...values,
          groupName: result[0]["Group_Name"],
          groupDescription: result[0]["Group_Description"],
          view: result[0]["View"],
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = () => {
    setValues({ ...values, loading: true });
    axios
      .post("https://localhost:7084/api/Game/UpdateGameGroup", {
        GroupId: groupId,
        GroupName: values.groupName,
        GroupDescription: values.groupDescription,
        View: values.view,
        Games: [],
      })
      .then((response) => {
        if (response.data.value) {
          const data = JSON.parse(response.data.value);
          if (data.Status == 200) {
            navigate("/gamegroup");
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
        <CardHeader subheader="Update game group" title="Update Group" />
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

export default GameGroupUpdate;
