import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AxiosInstance } from "../../api-interface/api/AxiosInstance.mjs";
import { showError } from "../Alert/Alert.jsx";
import Map from "./MapLocation.jsx";
import MapLocation from "./MapLocation.jsx";

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
  const [is_express, setIs_express] = useState(false);
  const [additional_information, setAdditional_information] = useState("");
  const [customer_unique_id, setCustomer_unique_id] = useState("");
  const [address, setAddress] = useState("");
  const [courier_unique_id, setCourier_unique_id] = useState("");
  const [order_date, setOrder_date] = useState("");
  const [order_time, setOrder_time] = useState("");
  const [delivery_price, setDelivery_price] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [allCustomer, setAllCustomer] = useState([]);
  const [status, setStatus] = useState("");
  const [courier, setCourier] = useState("");
  const [couriers, setCouriers] = useState([]);
  const [products, setProducts] = useState([
    {
      product_name: "",
      product_brand: "",
      product_model: "",
      product_artikul_code: "",
      product_debt_price: 0,
      product_cash_price: 0,
      product_discount: 0,
      product_size: "",
      product_color: "",
      product_count: "",
    },
  ]);

  const hoveredstyle = {
    cursor: "initial",
  };

  const customers = async () => {
    await AxiosInstance.get("operator/get-all-customer")
      .then((response) => {
        setAllCustomer(response.data.body);
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  useEffect(() => {
    customers();
  }, []);

  const getCouriers = async () => {
    await AxiosInstance.get("/operator/get-couriers")
      .then((response) => {
        setCouriers(response.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCouriers();
  }, []);

  const getStatuses = async () => {
    await AxiosInstance.get("/operator/get-statuses")
      .then((response) => {
        setStatus(response.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStatuses();
  }, []);

  const addData = async () => {
    const data = {
      is_express: is_express,
      additional_information: additional_information,
      customer_unique_id: customer_unique_id,
      address: address,
      courier_unique_id: courier_unique_id,
      order_date: order_date,
      order_time: order_time,
      delivery_price: delivery_price,
      latitude: latitude,
      longitude: longitude,
      status: status,
      products: products,
    };
    await AxiosInstance.post("/operator/add-order", data)
      .then((response) => {
        if (!response.data.error) {
        }
        handleClose();
        props.getData(1);
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  const updateProductName = (value, index, item) => {
    let newItem = item;
    newItem.product_name = value;
    const newArray = [
      ...products.slice(0, index),
      newItem,
      ...products.slice(index + 1),
    ];

    setProducts(newArray);
  };

  const updateProductBrand = (value, index, item) => {
    let newItem = item;
    newItem.product_brand = value;
    const newArray = [
      ...products.slice(0, index),
      newItem,
      ...products.slice(index + 1),
    ];

    setProducts(newArray);
  };

  const updateProductModel = (value, index, item) => {
    let newItem = item;
    newItem.product_model = value;
    const newArray = [
      ...products.slice(0, index),
      newItem,
      ...products.slice(index + 1),
    ];

    setProducts(newArray);
  };

  const updateProductArticulCode = (value, index, item) => {
    let newItem = item;
    newItem.product_artikul_code = value;
    const newArray = [
      ...products.slice(0, index),
      newItem,
      ...products.slice(index + 1),
    ];

    setProducts(newArray);
  };

  const updateProductDebtPrice = (value, index, item) => {
    let newItem = item;
    newItem.product_debt_price = value;
    const newArray = [
      ...products.slice(0, index),
      newItem,
      ...products.slice(index + 1),
    ];

    setProducts(newArray);
  };

  const updateProductCashPrice = (value, index, item) => {
    let newItem = item;
    newItem.product_cash_price = value;
    const newArray = [
      ...products.slice(0, index),
      newItem,
      ...products.slice(index + 1),
    ];

    setProducts(newArray);
  };

  const updateProductDiscount = (value, index, item) => {
    let newItem = item;
    newItem.product_discount = value;
    const newArray = [
      ...products.slice(0, index),
      newItem,
      ...products.slice(index + 1),
    ];

    setProducts(newArray);
  };

  const updateProductSize = (value, index, item) => {
    let newItem = item;
    newItem.product_size = value;
    const newArray = [
      ...products.slice(0, index),
      newItem,
      ...products.slice(index + 1),
    ];

    setProducts(newArray);
  };

  const updateProductColor = (value, index, item) => {
    let newItem = item;
    newItem.product_color = value;
    const newArray = [
      ...products.slice(0, index),
      newItem,
      ...products.slice(index + 1),
    ];

    setProducts(newArray);
  };

  const updateProductCount = (value, index, item) => {
    let newItem = item;
    newItem.product_count = value;
    const newArray = [
      ...products.slice(0, index),
      newItem,
      ...products.slice(index + 1),
    ];

    setProducts(newArray);
  };

  const addProduct = () => {
    const newArray = [
      ...products.slice(0, products.length),
      {
        product_name: "",
        product_brand: "",
        product_model: "",
        product_artikul_code: "",
        product_debt_price: 0,
        product_cash_price: 0,
        product_discount: 0,
        product_size: "",
        product_color: "",
        product_count: "",
      },
    ];
    setProducts(newArray);
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
              <Autocomplete
                options={customers}
                id="disable-close-on-select"
                disableCloseOnSelect
                value={""}
                width="100%"
                renderInput={(params) => (
                  <TextField {...params} label="Ady" variant="standard" />
                )}
              />
            </Stack>
          </Stack>
          <Stack direction="column" mt={3} spacing={1.5} width="100%">
            <Stack direction="row" spacing={3} width="100%">
              <label>Gosmaca bellikler:</label>
              <input
                type="text"
                value={additional_information}
                onChange={(e) => setAdditional_information(e.target.value)}
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
          {products.map((item, i) => {
            return (
              <div className="AOharytBarada" key={`add_order_key${i}`}>
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
                      value={item.product_name}
                      onChange={(e) =>
                        updateProductName(e.target.value, i, item)
                      }
                    />
                  </Stack>
                  <Stack width="100%" direction="column" spacing={1}>
                    <label>Markasy:</label>
                    <input
                      type="text"
                      value={item.product_brand}
                      onChange={(e) =>
                        updateProductBrand(e.target.value, i, item)
                      }
                    />
                  </Stack>
                  <Stack width="100%" direction="column" spacing={1}>
                    <label>Tolegi:</label>
                    <input
                      type="number"
                      value={item.product_cash_price}
                      onChange={(e) =>
                        updateProductCashPrice(e.target.value, i, item)
                      }
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
                        value={item.product_artikul_code}
                        onChange={(e) =>
                          updateProductArticulCode(e.target.value, i, item)
                        }
                      />
                    </Stack>
                    <Stack width="100%" direction="column" spacing={1}>
                      <label>Modeli:</label>
                      <input
                        type="text"
                        value={item.product_model}
                        onChange={(e) =>
                          updateProductModel(e.target.value, i, item)
                        }
                      />
                    </Stack>
                  </Stack>
                  <Stack width="48%" mt={2} direction="column" spacing={1}>
                    <input type="number" placeholder="Garasaryna ..." />
                    <input
                      type="text"
                      value={item.product_debt_price}
                      onChange={(e) =>
                        updateProductDebtPrice(e.target.value, i, item)
                      }
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
                    <label>Olchegi:</label>
                    <input
                      type="number"
                      value={item.product_size}
                      onChange={(e) =>
                        updateProductSize(e.target.value, i, item)
                      }
                    />
                  </Stack>
                  <Stack width="30%" direction="column" spacing={1}>
                    <label>Renki:</label>
                    <input
                      type="text"
                      value={item.product_color}
                      onChange={(e) =>
                        updateProductColor(e.target.value, i, item)
                      }
                    />
                  </Stack>
                </Stack>
              </div>
            );
          })}
          <Stack direction="row" onClick={addProduct} alignItems={"center"}>
            <label style={{ color: "#5E9CCE", cursor: "pointer" }}>
              Haryt gos
            </label>
            <IconButton tooltip="Description here" hoveredstyle={hoveredstyle}>
              <AddCircleOutlineIcon
                style={{ color: "#5E9CCE", fontSize: "16px" }}
              />
            </IconButton>
          </Stack>

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
                    id="demo-simple-select"
                    value={address}
                    style={{
                      background: "#f0eefc",
                      border: "1px solid #5e9cce",
                      borderRadius: "16px",
                      height: "35px",
                    }}
                    onChange={(e) => setAddress(e.target.value)}
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
                    onChange={(e) => setOrder_date(e.target.value)}
                    value={order_date}
                  />
                </Stack>
                <Stack width="100%">
                  <input
                    type="time"
                    onChange={(e) => setOrder_time(e.target.value)}
                    value={order_time}
                    style={{ padding: "6px 16px" }}
                  />
                </Stack>
                <Stack width="100%">
                  <input
                    type="number"
                    onChange={(e) => setDelivery_price(e.target.value)}
                    placeholder="0 TMT"
                    value={delivery_price}
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
                  value={courier}
                  style={{
                    background: "#f0eefc",
                    border: "1px solid #5e9cce",
                    borderRadius: "16px",
                    height: "35px",
                  }}
                  onChange={(e) => setCourier(e.target.value)}
                >
                  {couriers.map((item, i) => {
                    return (
                      <MenuItem
                        key={`courierrs_key${i}`}
                        value={item.unique_id}
                      >
                        {item.fullname}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Stack>
              <Stack width="100%">
                <Select
                  value={status}
                  id="demo-simple-select"
                  style={{
                    background: "#f0eefc",
                    border: "1px solid #5e9cce",
                    borderRadius: "16px",
                    height: "35px",
                  }}
                  onChange={(e) => setStatus(e.target.value)}
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
                onClick={() => addData()}
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
