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
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const TeamNew = () => {
  const initialState = {
    teamName: "",
    teamDescription: "",
    groupId: "",
    countryId: "",
    open: false,
    loading: false,
    success: false,
    groupList: [],
    countryList: [],
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
      .post("https://localhost:7084/api/Game/InsertTeam", {
        CountryId: values.countryId,
        GroupId: values.groupId,
        TeamName: values.teamName,
        TeamDescription: values.teamDescription,
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

  useEffect(() => {
    var groupArr = [];
    var countryArr = [];
    axios
      .get("https://localhost:7084/api/Game/GetAllGameGroup")
      .then((response) => {
        if (response.data.value) {
          var result = JSON.parse(response.data.value);
          var obj = {};
          for (var i = 0; i < result.length; i++) {
            obj = {
              id: result[i]["Group_Id"],
              groupName: result[i]["Group_Name"],
            };
            groupArr.push(obj);
          }

          axios
            .get("https://localhost:7084/api/Game/GetAllCountry")
            .then((response) => {
              if (response.data.value) {
                var result = JSON.parse(response.data.value);
                var obj = {};
                for (var i = 0; i < result.length; i++) {
                  obj = {
                    id: result[i]["Country_Id"],
                    countryName: result[i]["Country_Name"],
                  };
                  countryArr.push(obj);
                }
                setValues({
                  ...values,
                  countryList: countryArr,
                  groupList: groupArr,
                });
              } else {
              }
            })
            .catch((error) => {});
        } else {
        }
      })
      .catch((error) => {});
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
        <CardHeader subheader="Create new Team" title="Team" />
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item md={3} xs={12}>
              <TextField
                sx={{ width: "100% !important" }}
                helperText="Please specify Game Name"
                label="Team Name"
                name="teamName"
                onChange={handleChange}
                required
                value={values.teamName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={9} xs={12}>
              <TextField
                sx={{ width: "100% !important" }}
                helperText="Please specify Team Description"
                label="Team Description"
                name="teamDescription"
                onChange={handleChange}
                required
                value={values.teamDescription}
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <FormControl fullWidth sx={{ ml: 1, mt: 1 }}>
                <InputLabel id="group-label">Game Group</InputLabel>
                <Select
                  labelId="group-label"
                  id="group-select"
                  value={values.groupId}
                  label="Group Name"
                  name="groupId"
                  onChange={handleChange}
                >
                  {values.groupList.map((group) => (
                    <MenuItem value={group.id} key={group.id}>
                      {group.groupName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={3} xs={12}>
              <FormControl fullWidth sx={{ ml: 1, mt: 1 }}>
                <InputLabel id="country-label">Country Name</InputLabel>
                <Select
                  labelId="country-label"
                  id="country-select"
                  value={values.countryId}
                  label="Country Name"
                  name="countryId"
                  onChange={handleChange}
                >
                  {values.countryList.map((country) => (
                    <MenuItem value={country.id} key={country.id}>
                      {country.countryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

export default TeamNew;
