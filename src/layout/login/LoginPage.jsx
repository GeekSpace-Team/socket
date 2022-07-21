import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import "../../style/loginPage/loginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="loginPage">
      <div className="loginForm">
        <Stack>
          <div className="loginIcon">
            <Stack direction="column" alignItems="center" spacing={1} mt={3}>
              <AccountCircleOutlinedIcon style={{ fontSize: "70px" }} />
              <label>Set up your account</label>
            </Stack>
          </div>
          <div className="idForm">
            <Stack pl={2} mt={3} pr={2} spacing={1}>
              <label>Your ID</label>
              <input
                type="text"
                style={{ height: "55px" }}
                placeholder="john.doe@gmail.com"
              />
            </Stack>
          </div>
          <div className="idForm">
            <Stack pl={2} pr={2} spacing={1}>
              <label>Password</label>
              <input
                type="password"
                style={{ paddingTop: "20px" }}
                placeholder="* * * * * * * * * * * * * * * *"
              />
            </Stack>
          </div>
          <Stack pl={3} mt={3} pr={3}>
            <Link to="/accept-call">
              <Button
                style={{
                  textTransform: "none",
                  backgroundColor: "#5E9CCE",
                  borderRadius: "32px",
                  height: "45px",
                }}
                variant="contained"
              >
                Log in
              </Button>
            </Link>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default LoginPage;
