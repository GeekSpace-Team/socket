import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Button, Stack } from "@mui/material";
import "../../style/loginPage/loginPage.css";
// import { Link } from "react-router-dom";
import { AxiosInstance } from "../../api-interface/api/AxiosInstance.mjs";
import { showError } from "../../view/Alert/Alert";
import { ToastContainer } from "react-toastify";

const LoginPage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = () => {
    // setIsLoading(true);
    const data = {
      username: username,
      password: password,
    };
    AxiosInstance.post("/operator/auth/sign-in", data)
      .then((response) => {
        // setIsLoading(false);
        if (!response.data.error) {
          localStorage.setItem("my_token", response.data.body.token);
          localStorage.setItem("userID", response.data.body.userId);
          localStorage.setItem("user_type", response.data.body.user_type);
          localStorage.setItem("unique_id", response.data.body.unique_id);
          window.location.href = "/";
        } else {
          showError("Username or password is incorrect!");
        }
      })
      .catch((err) => {
        // setIsLoading(false);
        showError(err + "");
      });
  };

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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Stack>
          </div>
          <div className="idForm">
            <Stack pl={2} pr={2} spacing={1}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingTop: "20px" }}
                placeholder="* * * * * * * * * * * * * * * *"
              />
            </Stack>
          </div>
          <Stack pl={3} mt={3} pr={3}>
            {/* <LoadingButton
              loading={isLoading}
              variant="contained"
              fullWidth
              onClick={handleClick}
            >
              Login
            </LoadingButton> */}
            <Button
              style={{
                textTransform: "none",
                backgroundColor: "#5E9CCE",
                borderRadius: "32px",
                height: "45px",
              }}
              // loading={isLoading}
              variant="contained"
              fullWidth
              onClick={handleClick}
            >
              Log in
            </Button>
          </Stack>
        </Stack>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
