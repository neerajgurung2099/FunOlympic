import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Box } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import Checkbox from "@mui/material/Checkbox";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const NewsList = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: true,
    alertOpen: true,
    alertMessage: "",
    alertType: "",
    rows: [],
  });

  const handleNewsDelete = (newsId) => {
    axios
      .post("https://localhost:7084/api/Game/DeleteNews", {
        NewsId: newsId,
        NewsTitle: "",
        NewsDescription: "",
        View: false,
        GroupId: 0,
      })
      .then((response) => {
        var result = JSON.parse(response.data.value);
        if (result.Status == 200) {
          navigate(0);
        } else {
          setState({
            ...state,
            alertOpen: true,
            alertMessage: "Failed to delete",
            alertType: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setState({
          ...state,
          alertOpen: true,
          alertMessage: "Failed to delete",
          alertType: "error",
        });
      });
  };

  const columns = [
    { field: "sno", headerName: "SNO", width: 70 },
    { field: "id", headerName: "ID", width: 70 },
    { field: "groupName", headerName: "Group name", width: 250 },
    { field: "newsTitle", headerName: "News Title", width: 250 },
    { field: "newsDescription", headerName: "News Description", width: 300 },
    {
      field: "view",
      headerName: "View",
      sortable: false,
      width: 100,
    },
    { field: "createdDate", headerName: "Created Date", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Button
              component={Link}
              variant="outlined"
              to={`${params.row.id}`}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              onClick={() => handleNewsDelete(params.row.id)}
              variant="outlined"
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, alertOpen: false });
  };
  useEffect(() => {
    setState({ ...state, loading: true });
    axios
      .get("https://localhost:7084/api/Game/GetAllNews")
      .then((response) => {
        if (response.data.value) {
          var result = JSON.parse(response.data.value);
          if (result.length >= 0) {
            console.log(result);
            var arr = [];
            var obj = {};
            for (var i = 0; i < result.length; i++) {
              obj = {
                sno: i + 1,
                id: result[i]["News_Id"],
                newsTilte: result[i]["News_Title"],
                newsDescription: result[i]["News_Description"],
                groupName: result[i]["Group_Name"],
                view: result[i]["View"],
                createdDate: result[i]["Created_Date"],
              };
              arr.push(obj);
            }
            console.log(arr);
            setState({
              ...state,
              loading: false,
              rows: state.rows.concat(arr),
            });
          } else {
            setState({
              rows: [],
              alertOpen: true,
              alertMessage: "Something went wrong",
              alertType: "error",
              loading: false,
            });
          }
        } else {
          setState({
            alertOpen: true,
            alertMessage: "Something went wrong",
            alertType: "error",
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setState({
          alertOpen: true,
          alertMessage: "Something went wrong",
          alertType: "error",
          loading: false,
        });
      });
  }, []);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      {state.loading ? (
        <Box style={{ height: 600, width: "100%" }}>
          <Typography component="div" variant="h3">
            <Skeleton />
          </Typography>
          <Typography component="div" variant="h3">
            <Skeleton sx={{ height: 500 }} />
          </Typography>
        </Box>
      ) : (
        <>
          {console.log(state.rows)}
          <Box style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={state.rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
            <Snackbar
              open={state.alertOpen}
              autoHideDuration={1000}
              onClose={handleAlertClose}
            >
              <Alert
                onClose={handleAlertClose}
                severity={state.alertType}
                sx={{ width: "100%" }}
              >
                {state.alertMessage}
              </Alert>
            </Snackbar>
          </Box>
        </>
      )}
    </>
  );
};

export default NewsList;
