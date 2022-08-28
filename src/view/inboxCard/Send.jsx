import { Button, IconButton, Modal, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, {useContext, useEffect, useState} from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { showError, showSuccess } from "../Alert/Alert";
import {AxiosInstance, LocalAxiosInstance} from "../../api-interface/api/AxiosInstance.mjs";
import { ToastContainer } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import {AppContext} from "../../App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "#FAFCFB",
  //   border: "1px solid red",
  //   boxShadow: 24,
  borderRadius: "16px",
  borderColor: "#5E9CCE",
  p: 3,
};

const Send = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [link_to_goal, setLink_to_goal] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [to_unique_id, setUniqe_id] = useState("");
  const [list, setList] = useState([]);
  const [lisst, setLisst] = useState([]);
  const [value,setValue]=useState();

  const hoveredstyle = {
    cursor: "initial",
  };

  const {online}=useContext(AppContext);

  const getCourier = async () => {
    setLoading(true);
      let axios=online?AxiosInstance:LocalAxiosInstance;
      axios.get("/operator/get-couriers")
      .then((response) => {
        if (!response.data.error) {
          setLisst(response.data.body);
          setLoading(false);
        }
      })
      .catch((err) => {
        showError(err + "");
        setLoading(false);
      });
  };

  const handleClick = () => {
    addData();
  };

  useEffect(() => {
    getCourier();
  }, []);

  const clear = () => {
    setTitle("");
    setMessage("");
  };

  const addData = async () => {
    const data = {
      title: title,
      message: message,
      link_to_goal: link_to_goal,
      to_unique_id: value.unique_id,
    };
      let axios=online?AxiosInstance:LocalAxiosInstance;
      axios.post("/operator/add-inbox", data)
      .then((response) => {
        if (!response.data.error) {
          setList(response.data.body);
          setTitle("");
          setMessage("");
          handleClose();
          showSuccess("Hatyňyz ugradyldy !!!");
          props.getData(1);
        }
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{
          borderRadius: "16px",
          textTransform: "none",
          color: "#fefefe",
          fontWeight: "600",
          background: "#5E9CCE",
        }}
        variant="contained"
      >
        Hat ugratmak
      </Button>{" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="row"
            justifyContent={"flex-end"}
            alignItems="center"
          >
            <Stack direction="row" justifyContent="center" width="100%">
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#282828",
                }}
              >
                  Hat ugratmak
              </label>
            </Stack>
            <IconButton
              onClick={handleClose}
              tooltip="Description here"
              hoveredstyle={hoveredstyle}
            >
              <ClearIcon style={{ color: "#B1B1B1", cursor: "pointer" }} />
            </IconButton>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 5 }}
            mt={2}
          >
            <Stack width="50%" key={`inbox_autocomplete`}>
                  <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    options={lisst}
                    getOptionLabel={(option)=>option.fullname}
                    id="disable-close-on-select"
                    disableCloseOnSelect
                    renderInput={(params) => (
                      <TextField {...params} label="Ady" variant="standard" />
                    )}
                  />
                </Stack>

            <Stack direction="column" spacing={2} pt={1} width="50%">
              <Stack
                direction="row"
                alignItems={"center"}
                spacing={2}
                width="100"
              >
                <label>Hat sözbaşy:</label>
                <input
                  type="text"
                  value={title}
                  onInput={(e) => setTitle(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                  }}
                />
              </Stack>
              <hr />
            </Stack>
          </Stack>
          <Stack direction="column" mt={2} spacing={1}>
            <Stack direction="row" spacing={2}>
              <label>Hat mazmuny:</label>
              <input
                value={message}
                onInput={(e) => setMessage(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  width: "70%",
                }}
                type="text"
              />
            </Stack>
            <hr />
          </Stack>

          <Stack direction="row" mt={3} spacing={3} justifyContent="flex-end">
            <Button
              onClick={() => clear()}
              variant="outlined"
              style={{
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "16px",
                color: "#5E9CCE",
              }}
            >
              Arassalamak
            </Button>

            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              variant="contained"
              style={{
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "16px",
                background: "#5E9CCE",
              }}
              onClick={handleClick}
            >
              {isLoading ? (
                <Typography variant="action">Ugradylýar</Typography>
              ) : (
                <Typography variant="action">Ugratmak</Typography>
              )}
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Send;
