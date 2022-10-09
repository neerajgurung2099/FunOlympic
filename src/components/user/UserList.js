import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Box } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import { Snackbar, Button } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UserList = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: true,
    rows: [],
    alertOpen: false,
    alertType: "",
    alertMessage: "",
    updateRow: false,
  });

  const handleUserDelete = (userId) => {
    axios
      .post("https://localhost:7084/api/Game/DeleteUser", {
        UserId: userId,
        UserName: "",
        UserPassword: "",
        Email: "",
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
        setState({
          ...state,
          alertOpen: true,
          alertMessage: "Failed to delete",
          alertType: "error",
        });
      });
  };

  const columns = [
    { field: "id", headerName: "SNO", width: 70 },
    { field: "userId", headerName: "User Id", width: 70 },
    { field: "userName", headerName: "User Name", width: 300 },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    { field: "createdDate", headerName: "Created Date", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Button
              component={Link}
              variant="outlined"
              to={`${params.row.userId}`}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              onClick={() => handleUserDelete(params.row.userId)}
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
    setState({ ...state, errorFetching: false });
  };
  useEffect(() => {
    setState({ ...state, loading: true });
    axios
      .get("https://localhost:7084/api/Game/GetAllUsers")
      .then((response) => {
        if (response.data.value) {
          var result = JSON.parse(response.data.value);
          if (result.length >= 0) {
            var arr = [];
            var obj = {};
            for (var i = 0; i < result.length; i++) {
              obj = {
                id: i + 1,
                userId: result[i]["Login_Id"],
                userName: result[i]["User_Name"],
                userPassword: result[i]["User_Password"],
                email: result[i]["Email"],
                createdDate: result[i]["Created_Date"],
              };
              arr.push(obj);
            }
            setState({
              ...state,
              loading: false,
              rows: state.rows.concat(arr),
            });
          } else {
            setState({
              rows: [],
              loading: false,
              alertOpen: true,
              alertType: "error",
              alertMessage: "Somethign went wrong",
            });
          }
        } else {
          setState({
            alertOpen: true,
            alertType: "error",
            alertMessage: "Somethign went wrong",
            loading: false,
          });
        }
      })
      .catch((error) => {
        setState({
          alertOpen: true,
          alertType: "error",
          alertMessage: "Somethign went wrong",
          loading: false,
        });
      });
  }, [state.updateRow]);

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
          <Box style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={state.rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
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

export default UserList;
