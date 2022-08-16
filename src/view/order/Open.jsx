import React from "react";
import {
  Autocomplete,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import OpenHeader from "./OpenHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MapLocation from "./MapLocation";
import EditIcon from "@mui/icons-material/Edit";
import DateAndTime from "./DateAndTime";
import PlaceChange from "./PlaceChange";
import DeliveredPrice from "./DeliveredPrice";
import Courier from "./Courier";
import Status from "./Status";

const style = {
  position: "absolute",
  top: "50%",
  left: "59%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "99%",
  overflow: "scroll",
  display: "block",
  borderRadius: "16px",
  bgcolor: "#FAFCFB",
  boxShadow: 24,
  p: 4,
};
const Open = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const hoveredstyle = {
    cursor: "initial",
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{
          borderRadius: "16px",
          background: "#5e9cce",
          color: "#FAFCFB",
          textTransform: "none",
          fontWeight: "600",
          height: "40px",
        }}
      >
        Open
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <OpenHeader handleClose={handleClose} />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            mt={3}
          >
            <Stack direction="column" spacing={1.5} width="100%">
              {/* <Autocomplete
                // options={customers}
                id="disable-close-on-select"
                disableCloseOnSelect
                value={""}
                width="100%"
                renderInput={(params) => (
                  <TextField {...params} label="Ady" variant="standard" />
                )}
              /> */}
            </Stack>
          </Stack>
          <Stack direction="column" mt={3} spacing={1.5} width="100%">
            <Stack direction="row" spacing={3} width="100%">
              <label>Gosmaca bellikler:</label>
              <input
                type="text"
                // value={additional_information}
                // onChange={(e) => setAdditional_information(e.target.value)}
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
                <input
                  type="text"
                  //   value={item.product_name}
                  //   onChange={(e) => updateProductName(e.target.value, i, item)}
                />
              </Stack>
              <Stack width="100%" direction="column" spacing={1}>
                <label>Markasy:</label>
                <input
                  type="text"
                  //   value={item.product_brand}
                  //   onChange={(e) => updateProductBrand(e.target.value, i, item)}
                />
              </Stack>
              <Stack width="100%" direction="column" spacing={1}>
                <label>Tolegi:</label>
                <input
                  type="number"
                  //   value={item.product_cash_price}
                  //   onChange={(e) =>
                  //     updateProductCashPrice(e.target.value, i, item)
                  //   }
                  placeholder="Nagt ..."
                />
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
                  <input
                    type="text"
                    // value={item.product_artikul_code}
                    // onChange={(e) =>
                    //   updateProductArticulCode(e.target.value, i, item)
                    // }
                  />
                </Stack>
                <Stack width="100%" direction="column" spacing={1}>
                  <label>Modeli:</label>
                  <input
                    type="text"
                    // value={item.product_model}
                    // onChange={(e) =>
                    //   updateProductModel(e.target.value, i, item)
                    // }
                  />
                </Stack>
              </Stack>
              <Stack width="48%" mt={2} direction="column" spacing={1}>
                <input type="number" placeholder="Garasaryna ..." />
                <input
                  type="text"
                  //   value={item.product_debt_price}
                  //   onChange={(e) =>
                  // updateProductDebtPrice(e.target.value, i, item)
                  //   }
                />
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
                <label>Statusy:</label>
                <Select
                  id="demo-simple-select"
                  // value={address}
                  style={{
                    background: "#f0eefc",
                    border: "1px solid #5e9cce",
                    borderRadius: "16px",
                    height: "35px",
                  }}
                  // onChange={(e) => setAddress(e.target.value)}
                >
                  <MenuItem>Bashga yere</MenuItem>
                </Select>
              </Stack>
            </Stack>
          </div>
          <Stack direction="row" alignItems={"center"}>
            <label style={{ color: "#5E9CCE", cursor: "pointer" }}>
              Haryt gos
            </label>
            <IconButton tooltip="Description here" hoveredstyle={hoveredstyle}>
              <AddCircleOutlineIcon
                style={{ color: "#5E9CCE", fontSize: "16px" }}
              />
            </IconButton>
          </Stack>
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
                    id="demo-simple-select"
                    // value={address}
                    style={{
                      background: "#f0eefc",
                      border: "1px solid #5e9cce",
                      borderRadius: "16px",
                      height: "35px",
                    }}
                    // onChange={(e) => setAddress(e.target.value)}
                  >
                    <MenuItem>Bashga yere</MenuItem>
                  </Select>
                </Stack>
                <Stack width="100%">
                  <input type="text" />
                </Stack>
                <Stack width="100%">
                  <MapLocation />
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
                  <input
                    type="date"
                    // onChange={(e) => setOrder_date(e.target.value)}
                    // value={order_date}
                  />
                </Stack>
                <Stack width="100%">
                  <input
                    type="time"
                    // onChange={(e) => setOrder_time(e.target.value)}
                    // value={order_time}
                    style={{ padding: "6px 16px" }}
                  />
                </Stack>
                <Stack width="100%">
                  <input
                    type="number"
                    // onChange={(e) => setDelivery_price(e.target.value)}
                    placeholder="0 TMT"
                    // value={delivery_price}
                  />
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
                  id="demo-simple-select"
                  //   value={courier}
                  style={{
                    background: "#f0eefc",
                    border: "1px solid #5e9cce",
                    borderRadius: "16px",
                    height: "35px",
                  }}
                  //   onChange={(e) => setCourier(e.target.value)}
                >
                  {/* {couriers.map((item, i) => {
                    return ( */}
                  <MenuItem
                  // key={`courierrs_key${i}`}
                  // value={item.unique_id}
                  >
                    {/* {item.fullname} */}
                  </MenuItem>
                  {/* );
                  })} */}
                </Select>
              </Stack>
              <Stack width="100%">
                <Select
                  //   value={status}
                  id="demo-simple-select"
                  style={{
                    background: "#f0eefc",
                    border: "1px solid #5e9cce",
                    borderRadius: "16px",
                    height: "35px",
                  }}
                  //   onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={"none"}>Taze sargyt</MenuItem>
                  <MenuItem value={"pending"}>Garashylyar</MenuItem>
                  <MenuItem value={"courier-pending"}>
                    Kuryere ugradyldy
                  </MenuItem>
                  <MenuItem value={"courier-accepted"}>
                    Kuryer kabul etdi
                  </MenuItem>
                  <MenuItem value={"courier-delivered"}>
                    Kuryer eltip berdi
                  </MenuItem>
                  <MenuItem value={"delivered"}>Sargyt tamamlandy</MenuItem>
                  <MenuItem value={"rejected"}>Sargyt yatyryldy</MenuItem>
                </Select>
              </Stack>
              <Stack width="100%">
                <input type="number" />
              </Stack>
            </Stack>
            <Stack mt={2}>
              <label>Eltip bermeli yeri :</label>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              mt={1}
              className="passiveInput"
              mb={2}
            >
              <Stack width="100%">
                <Select
                  id="demo-simple-select"
                  // value={address}
                  style={{
                    background: "#f0eefc",
                    border: "1px solid #5e9cce",
                    borderRadius: "16px",
                    height: "35px",
                    opacity: "0.3",
                  }}
                  // onChange={(e) => setAddress(e.target.value)}
                >
                  <MenuItem>Bashga yere</MenuItem>
                </Select>
              </Stack>
              <Stack width="100%">
                <input type="text" />
              </Stack>
              <Stack width="100%">
                <MapLocation />
              </Stack>
            </Stack>
            <Stack mb={1}>
              <label
                style={{ color: "#3570A2", fontWeight: "600", opacity: "0.3" }}
              >
                Operator 1 tarapyndan girizildi
              </label>
            </Stack>
            <Stack direction="column" spacing={1.5}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={1}
              >
                <Stack width="100%">
                  <Select
                    id="demo-simple-select"
                    // value={address}
                    style={{
                      background: "#f0eefc",
                      border: "1px solid #5e9cce",
                      borderRadius: "16px",
                      height: "35px",
                    }}
                    // onChange={(e) => setAddress(e.target.value)}
                  >
                    <MenuItem>Bashga yere</MenuItem>
                  </Select>
                </Stack>
                <Stack width="100%">
                  <input type="text" />
                </Stack>
                <Stack width="100%">
                  <MapLocation />
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <label style={{ color: "#3570A2", fontWeight: "600" }}>
                  Operator 1 tarapyndan uytgedildi
                </label>

                <PlaceChange />
              </Stack>
              <hr />
            </Stack>{" "}
            <Stack direction={"column"} mt={3}>
              <label style={{ color: "#3570A2", fontWeight: "600" }}>
                Operator 1 tarapyndan uytgedildi
              </label>
              <label style={{ color: "#3570A2", fontWeight: "600" }}>
                Sebabi : ish yerine dal-de oyune eltip bermeli
              </label>
            </Stack>
            <Stack direction={"column"} spacing={1} mt={2}>
              <Stack
                direction={"row"}
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  mt={2}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <Stack
                    direction={"column"}
                    spacing={2}
                    className="passiveInput"
                    width={"31%"}
                  >
                    <label>Eltip bermek sene we wagty:</label>

                    <input
                      type="date"
                      // onChange={(e) => setOrder_date(e.target.value)}
                      // value={order_date}
                    />
                  </Stack>
                  <Stack
                    className="passiveInput"
                    width={"31%"}
                    pt={5}
                    direction={"column"}
                  >
                    <input
                      type="time"
                      // onChange={(e) => setOrder_time(e.target.value)}
                      // value={order_time}
                      style={{ padding: "6px 16px" }}
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <label
                  style={{
                    color: "#3570A2",
                    fontWeight: "600",
                    opacity: "0.3",
                  }}
                >
                  Operator 1 tarapyndan girizildi
                </label>
              </Stack>

              <Stack
                direction={"row"}
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  mt={2}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <Stack direction={"column"} width={"31%"}>
                    <input
                      type="date"
                      // onChange={(e) => setOrder_date(e.target.value)}
                      // value={order_date}
                    />
                  </Stack>
                  <Stack width={"31%"} direction={"column"}>
                    <input
                      type="time"
                      // onChange={(e) => setOrder_time(e.target.value)}
                      // value={order_time}
                      style={{ padding: "6px 16px" }}
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <label style={{ color: "#3570A2", fontWeight: "600" }}>
                  Operator 1 tarapyndan uytgedildi
                </label>

                <DateAndTime />
              </Stack>
              <hr />
            </Stack>
            <Stack direction={"column"} spacing={1} mt={2}>
              <Stack direction={"column"} width={"33%"}>
                <label>Eltip bermek bahasy :</label>
                <input type="text" />
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <label style={{ color: "#3570A2", fontWeight: "600" }}>
                  Operator 1 tarapyndan girizildi
                </label>

                <DeliveredPrice />
              </Stack>
              <hr />
            </Stack>
            <Stack direction={"column"} spacing={1} mt={2}>
              <Stack direction={"column"} width={"33%"}>
                <label>Eltip beriji :</label>
                <Select
                  id="demo-simple-select"
                  //   value={courier}
                  style={{
                    background: "#f0eefc",
                    border: "1px solid #5e9cce",
                    borderRadius: "16px",
                    height: "35px",
                  }}
                  //   onChange={(e) => setCourier(e.target.value)}
                >
                  {/* {couriers.map((item, i) => {
                    return ( */}
                  <MenuItem
                  // key={`courierrs_key${i}`}
                  // value={item.unique_id}
                  >
                    {/* {item.fullname} */}
                  </MenuItem>
                  {/* );
                  })} */}
                </Select>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <label style={{ color: "#3570A2", fontWeight: "600" }}>
                  Operator 1 tarapyndan girizildi
                </label>
                <Courier />
              </Stack>
              <hr />
            </Stack>
            <Stack direction={"column"} spacing={1} mt={2}>
              <Stack direction={"column"} width={"33%"}>
                <label>Statusy :</label>
                <Select
                  id="demo-simple-select"
                  //   value={courier}
                  style={{
                    background: "#f0eefc",
                    border: "1px solid #5e9cce",
                    borderRadius: "16px",
                    height: "35px",
                  }}
                  //   onChange={(e) => setCourier(e.target.value)}
                >
                  {/* {couriers.map((item, i) => {
                    return ( */}
                  <MenuItem
                  // key={`courierrs_key${i}`}
                  // value={item.unique_id}
                  >
                    {/* {item.fullname} */}
                  </MenuItem>
                  {/* );
                  })} */}
                </Select>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <label style={{ color: "#3570A2", fontWeight: "600" }}>
                  Operator 1 tarapyndan girizildi
                </label>
                <Status />
              </Stack>
              <hr />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              justifyContent={"flex-end"}
              mt={2}
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
                Pozmak
              </Button>
              <Button
                variant="outlined"
                style={{
                  borderRadius: "16px",
                  textTransform: "none",
                  color: "#282828",
                  fontWeight: "600",
                }}
              >
                Uytgetmek
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
        </Box>
      </Modal>
    </div>
  );
};

export default Open;
