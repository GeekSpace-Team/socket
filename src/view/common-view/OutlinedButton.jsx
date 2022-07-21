import { Button } from "@mui/material";
import React from "react";

const OutlinedButton = ({ text }) => {
  return (
    <>
      <Button
        style={{ borderRadius: "16px", textTransform: "none" }}
        className="outlinedButton"
        variant="outlined"
      >
        {text}
      </Button>
    </>
  );
};

export default OutlinedButton;
