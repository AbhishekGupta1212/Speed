import { Button, styled } from "@mui/material";
import { MessageOutlined } from "@mui/icons-material";

function ButtonSend() {
  const TxtButton = styled(Button)({
    color: "rgb(86, 95, 134)",
    borderColor: "rgb(86, 95, 134)",
    padding: "15px 50px",
    flexDirection: "column",
    textTransform:"initial"
  });
  return (
    <TxtButton
      variant="outlined"
      startIcon={<MessageOutlined />}
      size="large"
      sx={{ mt: 3 }}
    >
      Message
    </TxtButton>
  );
}

export default ButtonSend;