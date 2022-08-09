import React from "react";
import "../../style/home/home.css";
import { Stack } from "@mui/material";

const HomeCard = () => {
  return (
    <div className="homeCard">
      <Stack pt={5} direction="row" justifyContent="center">
        <label style={{ fontSize: "24px", fontWeight: "600" }}>Welcome!</label>
      </Stack>
      <Stack pt={5} direction="row" justifyContent="center">
        <img src="./svg/homeLogo.svg" alt="" />
      </Stack>
      <Stack
        direction="column"
        mt={3}
        justifyContent="center"
        ml={"35%"}
        width="35%"
      >
        <Stack
          direction="row"
          spacing={3}
          p={1.5}
          pl={2}
          style={{
            background: "#D5E4ED",
            border: "1px solid ##D5E4ED",
            boxShadow:
              "2px 2px 6px rgba(116,150, 204, 0.5), -2px -2px 6px rgba(255,255,255,0.4)",
            borderRadius: "32px",
          }}
        >
          <label>Name :</label>
          <label style={{ fontWeight: "600" }}>Aman Amanov</label>
        </Stack>
        <Stack
          direction="row"
          spacing={3}
          mt={3}
          p={1.5}
          pl={2}
          style={{
            background: "#D5E4ED",
            border: "1px solid ##D5E4ED",
            boxShadow:
              "2px 2px 6px rgba(116,150, 204, 0.5), -2px -2px 6px rgba(255,255,255,0.4)",
            borderRadius: "32px",
          }}
        >
          <label>Phone number :</label>
          <label style={{ fontWeight: "600" }}>+993 63 430338</label>
        </Stack>
      </Stack>
    </div>
  );
};

export default HomeCard;
