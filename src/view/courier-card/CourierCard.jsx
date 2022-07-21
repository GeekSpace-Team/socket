import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React from "react";
import Export from "../common-view/Export";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CreateIcon from "@mui/icons-material/Create";
import "../../style/courier/courier.css";

const style = {
  position: "absolute",
  top: "30%",
  left: "59%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  display: "block",
  borderRadius: "16px",
  bgcolor: "#FAFCFB",
  boxShadow: 24,
  p: 4,
};

const style1 = {
  position: "absolute",
  top: "30%",
  left: "59%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  display: "block",
  borderRadius: "16px",
  bgcolor: "#FAFCFB",
  boxShadow: 24,
  p: 4,
};

const CourierCard = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const hoveredstyle = {
    cursor: "initial",
  };
  return (
    <div className="courierCard">
      <div className="courierHeader">
        <h3>Eltip berijiler</h3>
        <Stack direction="row" justifyContent={"flex-end"} spacing={3}>
          <Export />
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
            Eltip beriji gos
          </Button>
        </Stack>
      </div>

      <div className="courierCardTableContainer">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 6, sm: 6, md: 12 }}
          >
            <Grid
              item
              xs={2}
              sm={6}
              md={6}
              p={3}
              style={{
                background: "#FAFCFB",
                boxShadow: "0px 0px 10px rgba(129,129,129,0.15)",
                borderRadius: "16px",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#282828",
                  }}
                >
                  +99363430338
                </label>
                <IconButton
                  onClick={handleOpen1}
                  style={{ color: "#5E9CCE" }}
                  tooltip="Description here"
                  hoveredstyle={hoveredstyle}
                >
                  <CreateIcon />
                </IconButton>
              </Stack>
              <Stack>
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#282828",
                  }}
                >
                  Amanov Bagtyyar Bagtyyarov
                </label>
              </Stack>
              <Stack
                mt={2}
                style={{
                  background: "#ECF9FC",
                  border: "1px solid #e2e2e2",
                  borderRadius: "16px 16px 0px 0px",
                }}
                p={1}
                direction="row"
                spacing={2}
              >
                <label>Status :</label>
                <label>Active</label>
              </Stack>

              <Stack
                direction="row"
                p={1}
                style={{ border: "1px solid #e2e2e2" }}
                spacing={3}
              >
                <label>Sargytlar :</label>
                <label
                  style={{
                    textDecoration: "underline",
                    color: "#5E9CCE",
                    textUnderlineOffset: "2px",
                  }}
                >
                  10 gezek
                </label>
              </Stack>
              <Stack
                direction="row"
                style={{ background: "#ECF9FC", border: "1px solid #e2e2e2" }}
                spacing={2}
                p={1}
              >
                <label>Car number :</label>
                <label>5677</label>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                p={1}
                style={{
                  border: "1px solid #e2e2e2",
                  borderRadius: "0px 0px 16px 16px",
                }}
              >
                <label>Order status :</label>
                <label>Free / On the way</label>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </div>
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
                Eltip beriji goshmak
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
            <Stack direction="column" spacing={1.5} width="100%">
              <Stack direction={"row"} spacing={1}>
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
              <Stack direction={"row"} spacing={1}>
                <label style={{ fontWeight: "600" }}>Telefon belgisi :</label>
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
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 5 }}
            mt={2}
          >
            <Stack direction="column" spacing={1.5} width="100%">
              <Stack direction={"row"} spacing={1}>
                <label>Car number :</label>
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
              <Stack direction={"row"} spacing={1}>
                <label>Sargytlar :</label>
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
          <Stack direction="row" spacing={1} mt={2}>
            <label>Eltip berijinin statusy</label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{
                borderRadius: "16px",
                height: "40px",
                border: "1px solid #5E9CCE",
                minWidth: "300px",
                color: "#282828",
                background: "#F0EEFC",
              }}
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Stack>
          <Stack direction="row" spacing={2} mt={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              style={{
                borderRadius: "16px",
                textTransform: "none",
                fontWeight: "600",
                color: "#5e9cce",
              }}
            >
              Delete all
            </Button>
            <Button
              variant="contained"
              style={{
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "16px",
                background: "#5e9cce",
              }}
            >
              Yatda sakla
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* update Modal section starts here */}
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          {" "}
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
                Eltip beriji goshmak
              </label>
            </Stack>
            <IconButton
              onClick={handleClose1}
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
            <Stack direction="column" spacing={1.5} width="100%">
              <Stack direction={"row"} spacing={1}>
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
              <Stack direction={"row"} spacing={1}>
                <label style={{ fontWeight: "600" }}>Telefon belgisi :</label>
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
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 5 }}
            mt={2}
          >
            <Stack direction="column" spacing={1.5} width="100%">
              <Stack direction={"row"} spacing={1}>
                <label>Car number :</label>
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
              <Stack direction={"row"} spacing={1}>
                <label>Sargytlar :</label>
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
          <Stack direction="row" spacing={1} mt={2}>
            <label>Eltip berijinin statusy</label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{
                borderRadius: "16px",
                height: "40px",
                border: "1px solid #5E9CCE",
                minWidth: "300px",
                color: "#282828",
                background: "#F0EEFC",
              }}
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Stack>
          <Stack direction="row" spacing={2} mt={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              style={{
                borderRadius: "16px",
                textTransform: "none",
                fontWeight: "600",
                color: "#5e9cce",
              }}
            >
              Delete all
            </Button>
            <Button
              variant="contained"
              style={{
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "16px",
                background: "#5e9cce",
              }}
            >
              Yatda sakla
            </Button>
          </Stack>
        </Box>
      </Modal>
      {/* update Modal section ends here */}
    </div>
  );
};

export default CourierCard;
