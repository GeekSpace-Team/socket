import React from "react";
import SyncIcon from "@mui/icons-material/Sync";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  border: "none",
  borderRadius: "32px",
  boxShadow: 24,
  p: 4,
};
const Sync = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <ExportContainer onClick={handleOpen}>
        <div>
          <input type="text" disabled="disabled" value="Sync" />
        </div>
        <SyncIcoN>
          <SyncIcon style={{ color: "#585858" }} />
        </SyncIcoN>
      </ExportContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack alignItems="center">
            <WifiOffIcon style={{ color: "#F61A1A" }} />
          </Stack>
          <Stack alignItems={"center"} spacing={2} mt={3} direction="column">
            <span style={{ fontWeight: "700" }}>Failed to synchronize</span>
            <span>Please check your internet connection and try again</span>
            <Button
              style={{
                background: "#F61A1A",
                borderRadius: "16px",
                width: "400px",
                textTransform: "none",
              }}
              variant="contained"
            >
              Ok
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

const ExportContainer = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 80px;
    input {
      border: none;
      box-shadow: none;
      background-color: #fff;
      border-radius: 16px;
      color: #585858;
      cursor: pointer;
      width: 51px;
      padding: 0 8px 0 55px;
      line-height: 1.75;
      font-weight: 600;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;
const SyncIcoN = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 5px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.15s;
`;
export default Sync;
