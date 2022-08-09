import React, { useEffect } from "react";
import { Button, IconButton, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AxiosInstance } from "../../api-interface/api/AxiosInstance.mjs";
import { showError } from "../Alert/Alert.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "59%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "99%",
  overflow: "scroll",
  display: "block",
  borderRadius: "16px",
  bgcolor: "#FAFCFB",
  boxShadow: 24,
  p: 4,
};

const AddOrderModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const hoveredstyle = {
    cursor: "initial",
  };
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const addData = async () => {
    const data = {};
    await AxiosInstance.post("/operator/add-order", data)
      .then((response) => {
        if (!response.data.error) {
        }
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  // useEffect(() => {
  //   addData();
  // }, []);
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
        Sargyt giriz
      </Button>{" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="SGMtitle">
            <Stack direction="row" spacing={3}>
              <label>12.12.2022</label>
              <label>15:00</label>
            </Stack>
            <label style={{ fontWeight: "600" }}>Sargyt girizmek</label>
          </div>
          <div className="MGbutton">
            <IconButton
              onClick={handleClose}
              tooltip="Description here"
              hoveredstyle={hoveredstyle}
            >
              <ClearIcon style={{ color: "#B1B1B1", cursor: "pointer" }} />
            </IconButton>
          </div>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            mt={3}
          >
            <Stack direction="column" spacing={1.5} width="100%">
              <Stack direction="row" spacing={3} width="100%">
                <label style={{ fontWeight: "600" }}>Ady :</label>
                <input
                  type="text"
                  style={{
                    outline: "none",
                    border: "none",
                    background: "transparent",
                  }}
                />
              </Stack>
              <hr />
            </Stack>
            <Stack direction="column" spacing={1.5} width="100%">
              <Stack direction="row" spacing={3} width="100%">
                <label style={{ fontWeight: "600" }}>Telefon belgisi:</label>
                <input
                  type="text"
                  style={{
                    outline: "none",
                    border: "none",
                    background: "transparent",
                  }}
                />
              </Stack>
              <hr />
            </Stack>
          </Stack>
          <Stack direction="column" mt={3} spacing={1.5} width="100%">
            <Stack direction="row" spacing={3} width="100%">
              <label>Gosmaca bellikler:</label>
              <input
                type="text"
                style={{
                  outline: "none",
                  border: "none",
                  background: "transparent",
                  width: "70%",
                }}
              />
            </Stack>
            <hr />
          </Stack>
          <div className="AOharytBarada">
            <Stack direction="row" mt={1} justifyContent={"center"}>
              <label style={{ fontWeight: "600" }}>Haryt barada</label>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              mt={3}
            >
              <Stack width="100%" direction="column" spacing={1}>
                <label>Gornusi:</label>
                <input type="text" />
              </Stack>
              <Stack width="100%" direction="column" spacing={1}>
                <label>Markasy:</label>
                <input type="text" />
              </Stack>
              <Stack width="100%" direction="column" spacing={1}>
                <label>Tolegi:</label>
                <input type="number" placeholder="Nagt ..." />
              </Stack>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              mt={1.5}
            >
              <Stack direction="row" mt={2} width="100%" spacing={5}>
                <Stack width="100%" direction="column" spacing={1}>
                  <label>Artikuly:</label>
                  <input type="text" />
                </Stack>
                <Stack width="100%" direction="column" spacing={1}>
                  <label>Modeli:</label>
                  <input type="text" />
                </Stack>
              </Stack>
              <Stack width="48%" mt={2} direction="column" spacing={1}>
                <input type="number" placeholder="Garasaryna ..." />
                <input type="text" />
              </Stack>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              alignItems="center"
              mt={2}
              justifyContent={"space-between"}
            >
              <Stack width="30%" direction="column" spacing={1}>
                <label>Statusy</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  style={{
                    background: "#f0eefc",
                    border: "1px solid #5e9cce",
                    borderRadius: "16px",
                    height: "35px",
                  }}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <label style={{ color: "#5e9cce" }}>Haryt gos</label>
                <IconButton
                  tooltip="Description here"
                  hoveredstyle={hoveredstyle}
                >
                  <AddCircleOutlineIcon
                    style={{ fontSize: "16px", color: "#5E9CCE" }}
                  />
                </IconButton>
              </Stack>
            </Stack>
          </div>

          {/* Address section starts here */}
          <div className="eltipBermeli">
            <label>Eltip bermeli yeri:</label>
            <Stack direction="column" spacing={1.5} mb={2}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={1}
              >
                <Stack width="100%">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    style={{
                      background: "#f0eefc",
                      border: "1px solid #5e9cce",
                      borderRadius: "16px",
                      height: "35px",
                    }}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </Stack>
                <Stack width="100%">
                  <input type="text" />
                </Stack>
                <Stack width="100%">
                  <Button
                    style={{
                      borderRadius: "16px",
                      textTransform: "none",
                      color: "#282828",
                      fontWeight: "600",
                    }}
                    variant="outlined"
                  >
                    Kartadan gorkez
                  </Button>
                </Stack>
              </Stack>
              <hr />
            </Stack>{" "}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              mt={1}
            >
              <Stack width="100%">
                <label>Eltip bermeli sene we wagty:</label>
              </Stack>
              <Stack width="100%">
                <label style={{ display: "none" }}>Eltip beriji</label>
              </Stack>{" "}
              <Stack width="100%">
                <label>Eltip bermek bahasy :</label>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.5}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={1}
              >
                <Stack width="100%">
                  <input type="date" />
                </Stack>
                <Stack width="100%">
                  <input type="time" style={{ padding: "6px 16px" }} />
                </Stack>
                <Stack width="100%">
                  <input type="number" />
                </Stack>
              </Stack>
              <hr />
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              mt={2}
            >
              <Stack width="100%">
                <label>Eltip beriji</label>
              </Stack>
              <Stack width="100%">
                <label>Statusy :</label>
              </Stack>{" "}
              <Stack width="100%">
                <label>Jemi</label>
              </Stack>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              mt={1}
            >
              {" "}
              <Stack width="100%">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  style={{
                    background: "#f0eefc",
                    border: "1px solid #5e9cce",
                    borderRadius: "16px",
                    height: "35px",
                  }}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Stack>
              <Stack width="100%">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  style={{
                    background: "#f0eefc",
                    border: "1px solid #5e9cce",
                    borderRadius: "16px",
                    height: "35px",
                  }}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Stack>
              <Stack width="100%">
                <input type="number" />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent={"flex-end"}
              mt={3}
              spacing={2}
            >
              <Button
                variant="outlined"
                style={{
                  borderRadius: "16px",
                  textTransform: "none",
                  color: "#282828",
                  fontWeight: "600",
                }}
              >
                Delete all
              </Button>
              <Button
                variant="contained"
                style={{
                  borderRadius: "16px",
                  textTransform: "none",
                  background: "#5E9CCE",
                  fontWeight: "600",
                }}
              >
                Yatda sakla
              </Button>
            </Stack>
          </div>
          {/* Address section ends here */}
        </Box>
      </Modal>
    </div>
  );
};

export default AddOrderModal;
