import React from "react";
import Button from "@mui/material/Button";
import "../../style/acceptButton/acceptButton.css";

const AcceptButton = ({ text }) => {
  return (
    <>
      <Button
        style={{
          textTransform: "none",
          marginLeft: "50px",
          borderRadius: "16px",
        }}
        className="acceptButton"
        variant="contained"
      >
        {text}
      </Button>
    </>
  );
};

export default AcceptButton;
