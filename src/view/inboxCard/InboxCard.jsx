import React from "react";
import { Stack, IconButton, Button, Pagination } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "../../style/inbox/inbox.css";
import ClearIcon from "@mui/icons-material/Clear";
import Autocomplete from "@mui/material/Autocomplete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  //   border: "1px solid red",
  //   boxShadow: 24,
  borderRadius: "16px",
  borderColor: "#5E9CCE",
  p: 3,
};

const style1 = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 150,
  bgcolor: "background.paper",
  //   border: "1px solid red",
  //   boxShadow: 24,
  borderRadius: "16px",
  borderColor: "#5E9CCE",
  p: 2,
};

const InboxCard = () => {
  const hoveredstyle = {
    cursor: "initial",
  };

  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => setOpenn(true);
  const handleClosee = () => setOpenn(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opem = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloze = () => {
    setAnchorEl(null);
  };

  return (
    <div className="inboxCard">
      <div className="courierHeader">
        <h3>Gelyan mesajlar</h3>
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
          Send message
        </Button>
      </div>

      <div className="inboxCardContainer" onClick={handleOpenn}>
        <Stack direction="column" pt={3} pl={2} pr={3} pb={3}>
          <Stack direction="row" justifyContent="space-between">
            <label style={{ fontWeight: "600" }}>#123 / Message title</label>
            <IconButton
              tooltip="Description here"
              hoveredstyle={hoveredstyle}
              style={{ color: "#5E9CCE" }}
              aria-controls={opem ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={opem ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={10}>
            <label style={{ fontWeight: "600" }}>Amanov Aman / courier</label>
            <Stack direction="row" spacing={3}>
              <label>12.12.2022</label>
              <label>15:00</label>
            </Stack>
          </Stack>
          <Stack mt={3}>
            <label>Some message description here</label>
          </Stack>
        </Stack>
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
                Send message
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
            <Stack width="50%">
              <Autocomplete
                {...defaultProps}
                id="disable-close-on-select"
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="disableCloseOnSelect"
                    variant="standard"
                  />
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
                <label>Message title :</label>
                <input
                  type="text"
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
              <label>Message description :</label>
              <input
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
          <Stack mt={2}>
            <a href="#Link" style={{ color: "#5E9CCE" }}>
              Link here if exist
            </a>
          </Stack>
          <Stack direction="row" spacing={3} justifyContent="flex-end">
            <Button
              variant="outlined"
              style={{
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "16px",
                color: "#5E9CCE",
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
                background: "#5E9CCE",
              }}
            >
              Send
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={openn}
        onClose={handleClosee}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}></Box>
      </Modal>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={opem}
        onClose={handleCloze}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloze}>Delete</MenuItem>
        <MenuItem onClick={handleCloze}>Mark as read</MenuItem>
      </Menu>
      <Stack mt={10} justifyContent="center" direction="row">
        <Pagination color="primary" count={10} />
      </Stack>
    </div>
  );
};

export default InboxCard;

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
