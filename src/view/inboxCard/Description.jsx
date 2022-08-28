import { IconButton, Modal, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/system";
import React, {useContext, useEffect} from "react";
import {AxiosInstance, LocalAxiosInstance} from "../../api-interface/api/AxiosInstance.mjs";
import { showError } from "../Alert/Alert.jsx";
import {AppContext} from "../../App";

const style1 = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "#FAFCFB",
  //   border: "1px solid red",
  //   boxShadow: 24,
  borderRadius: "16px",
  borderColor: "#5E9CCE",
  p: 3,
};

const Description = (props) => {
  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => {
    setOpenn(true);
    markAsRead(props.item.unique_id);
  };
  const handleClosee = () => setOpenn(false);

  const hoveredstyle = {
    cursor: "initial",
  };
  const {online}=useContext(AppContext);
  const markAsRead = async (inbox_unique_id) => {
    const data = {
      inbox_unique_id: inbox_unique_id,
    };
    let axios=online?AxiosInstance:LocalAxiosInstance;
    axios.put("/operator/mark-as-read", data)
      .then((response) => {
        props.getData();
      })
      .catch((err) => {
        showError(err + "");
      });
  };


  return (
    <div>
      {" "}
      <Stack mt={3} onClick={handleOpenn}>
        <label>{props.item.message}</label>
      </Stack>
      <Modal
        open={openn}
        onClose={handleClosee}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <label style={{ fontWeight: "600" }}>{props.item.title}</label>
            <IconButton
              tooltip="Description here"
              hoveredstyle={hoveredstyle}
              onClick={handleClosee}
            >
              <ClearIcon />
            </IconButton>
          </Stack>
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <label style={{ fontWeight: "600" }}>
              {props.item.sender_name == null
                ? props.item.sender_courier_name
                : props.item.sender_name}
            </label>
            <label>
              {props.item.created_at.split("T")[0]} /{" "}
              {`${props.item.created_at.split("T")[1].split(":")[0]}:${
                props.item.created_at.split("T")[1].split(":")[1]
              }`}
            </label>
          </Stack>
          <Stack mt={2}>
            <label>{props.item.message}</label>
          </Stack>
          <Stack mt={3} pb={5}>
            <a
              style={{ color: "#5E9CCE", textUnderlineOffset: "2px" }}
              href="props.item.link_to_goal"
            >
              Sahypa git
            </a>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default Description;
