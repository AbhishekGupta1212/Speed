import styled from "@emotion/styled";
import { AppBar, Toolbar, Button, Snackbar } from "@mui/material";
import { forwardRef, useState } from "react";
import MuiAlert from "@mui/material/Alert";


const SaveButton = styled(Button)({
  color: "rgb(86, 95, 134)",
  backgroundColor: "#ffffff",
  textTransform:"initial",
  borderColor: "rgb(86, 95, 134)",
  "&:hover": {
    borderColor: "rgb(86, 95, 134)",
  },
});


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

function Navbar({ nodes, edges }) {
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [successSnackbarMsg, setSuccessSnackbarMsg] = useState();
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarMsg, setErrorSnackbarMsg] = useState();

  const unConnectedNodes = nodes.filter((node) => {
    return !edges.some(
      (edge) => edge.source === node.id || edge.target === node.id
    );
  });

  const emptyTargetNodes = nodes.filter((node) => {
    return !edges.some((edge) => edge.target === node.id);
  });

  const showError = (snackBarMsg) => {
    setErrorSnackbarOpen(true);
    setErrorSnackbarMsg(snackBarMsg);
  };

  const showSuccess = (snackBarMsg) => {
    setSuccessSnackbarOpen(true);
    setSuccessSnackbarMsg(snackBarMsg);
  };

  let snackBarMsg = "";

  const handleOnClick = () => {
    if (unConnectedNodes.length != 0) {
      snackBarMsg = "Save failed: unconnected nodes or edges detected!";
      showError(snackBarMsg);
      return;
    }

    if (emptyTargetNodes.length != 1) {
      snackBarMsg = "Save failed: unconnected nodes or edges detected!";
      showError(snackBarMsg);
      return;
    } else {
      snackBarMsg = "Saved Successfully";
      showSuccess(snackBarMsg);
    }
  };

  return (
    <AppBar position="fixed" elevation={0} sx={{ backgroundColor: "rgb(243, 243, 243)" }}>
      <Toolbar
        variant="dense"
        sx={{ flexDirection: "row-reverse", marginRight: "120px" }}
      >
        <SaveButton variant="outlined" onClick={handleOnClick}>
          <label style={{ color: "rgb(86, 95, 134)",width:"8rem"}}>
            Save Changes
          </label>
        </SaveButton>
      </Toolbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={successSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSuccessSnackbarOpen(false)}
      >
        <Alert severity="success">{successSnackbarMsg}</Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorSnackbarOpen}
        autoHideDuration={2500}
        onClose={() => setErrorSnackbarOpen(false)}
      >
        <Alert severity="error">{errorSnackbarMsg}</Alert>
      </Snackbar>
    </AppBar>
  );
}

export default Navbar;