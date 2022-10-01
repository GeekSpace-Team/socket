import "../../style/loginPage/loginPage.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import React, { useContext, useState } from "react";
import SyncPage from "../sync/SyncPage";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppContext } from "../../App";
import { AxiosInstance, LocalAxiosInstance } from "../../api-interface/api/AxiosInstance.mjs";
import { onMessageListener, requestForToken } from "../../fcm/firebase";
import { showError } from "../../view/Alert/Alert";
import { Button, Stack } from "@mui/material";

// import { Link } from "react-router-dom";

const LoginPage = (props) => {
  // const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { online } = useContext(AppContext);
  const [start, setStart] = useState(false);


  const getData = (type) => {
    if (type === 'operator') {
      window.location.href = "/?sync=18112000";
    } else {
      window.location.href = "/";
    }
  }

  const fcm = () => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        // navigator.serviceWorker.register("/flutter_service_worker.js");
        navigator.serviceWorker.register("/firebase-messaging-sw.js");
      });
    }
    requestForToken();

    onMessageListener()
      .then((payload) => {
        props.setMessage(`${payload?.notification?.title} / ${payload?.notification?.body}`);
        props.setOpen(true);
      })
      .catch((err) => console.log('failed: ', err));
  }

  let location = useLocation();

  React.useEffect(() => {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      fcm();
    }

  }, [location]);

  const parallelAxiosChecker = (data, tkn, type) => {
    let parallelAxios = online ? LocalAxiosInstance : AxiosInstance;
    parallelAxios.post("/operator/auth/sign-in", data)
      .then((response) => {
        // setIsLoading(false);
        if (!response.data.error) {
          localStorage.setItem("parallel_token", response.data.body.token);
          getData(type);
        } else {
          localStorage.setItem("parallel_token", tkn);
          getData(type);

        }
      })
      .catch((err) => {
        localStorage.setItem("parallel_token", tkn);
        getData(type);
      });
  }

  const handleClick = () => {
    // setIsLoading(true);
    const data = {
      username: username,
      password: password,
      fcmToken: localStorage.getItem('fcm_token'),
      device: "web"
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks

    let axios = online ? AxiosInstance : LocalAxiosInstance;
    axios.post("/operator/auth/sign-in", data)
      .then((response) => {
        // setIsLoading(false);
        if (!response.data.error) {
          window.sessionStorage.setItem("token", response.data.body.token);
          localStorage.setItem("my_token", response.data.body.token);
          localStorage.setItem("local_token", response.data.body.token);
          localStorage.setItem("userID", response.data.body.userId);
          localStorage.setItem("user_type", response.data.body.role_name);
          localStorage.setItem("unique_id", response.data.body.unique_id);
          localStorage.setItem("fullname", response.data.body.fullname);
          localStorage.setItem("phone_number", response.data.body.phone_number);
          localStorage.setItem("sell_point_id", response.data.body.sell_point_id);
          localStorage.setItem("password", password);
          localStorage.setItem("username", username);
          parallelAxiosChecker(data, response.data.body.token, response.data.body.role_name);

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
            {
              start ?
                <SyncPage getData={getData} open={true} autorun={true} />
                :
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
            }
          </Stack>
        </Stack>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
