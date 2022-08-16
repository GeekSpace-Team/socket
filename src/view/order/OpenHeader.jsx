import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, Stack } from "@mui/material";

const OpenHeader = (props) => {
  const hoveredstyle = {
    cursor: "initial",
  };
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} spacing={2}>
          <label>12.12.2022</label>
          <label>15:00</label>
        </Stack>
        <Stack>
          <label style={{ fontWeight: "600", fontSize: "18px" }}>Sargyt</label>
        </Stack>
        <Stack>
          <IconButton
            onClick={props.handleClose}
            tooltip="Description here"
            hoveredstyle={hoveredstyle}
          >
            <ClearIcon style={{ color: "#B1B1B1", cursor: "pointer" }} />
          </IconButton>
        </Stack>
      </Stack>
    </div>
  );
};

export default OpenHeader;
