import React, { useContext, useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
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
import { AxiosInstance, LocalAxiosInstance } from "../../api-interface/api/AxiosInstance.mjs";
import { showError, showSuccess } from "../Alert/Alert.jsx";
import Map from "./MapLocation.jsx";
import MapLocation from "./MapLocation.jsx";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { ToastContainer } from "react-toastify";
import { convertTimeStampToDate, convertTimeStampToTime } from "../../common/utils.mjs";
import { AppContext } from "../../App.js";

const style = {
  position: "absolute",
  // transform: "translate(-50%, -50%)",
  width: "100%",
  height: "99%",
  overflow: "scroll",
  display: "block",
  bgcolor: "#FAFCFB",
  boxShadow: 24,
  p: 4,
};

const AddOrderModal = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const [is_express, setIs_express] = useState(false);
  const [additional_information, setAdditional_information] = useState("");
  const [customer_unique_id, setCustomer_unique_id] = useState("");
  const [address, setAddress] = useState("");
  const [saddress, setSAddress] = useState("");
  const [courier_unique_id, setCourier_unique_id] = useState("");
  const [order_date, setOrder_date] = useState("");
  const [order_time, setOrder_time] = useState("");
  const [delivery_price, setDelivery_price] = useState("0");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const { allCustomer } = useContext(AppContext);
  const [status, setStatus] = useState("");
  const [courier, setCourier] = useState("");
  const { couriers } = useContext(AppContext);
  const [value, setValue] = useState("");
  const [home, setHome] = useState("");
  const [work, setWork] = useState("");
  const { online } = useContext(AppContext);
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
      product_count: 1,
    },
  ]);


  const checkUserUnqiueId = () => {
    try {
      let temp = allCustomer.filter((item, i) => item.unique_id == props.user_unique_id);
      setValue(temp[0]);
    } catch (err) {
    }
  }

  const handleOpen = () => {
    checkUserUnqiueId();
    setOpen(true);
  }


  useEffect(() => {
    checkUserUnqiueId();
  }, []);

  const hoveredstyle = {
    cursor: "initial",
  };

  useEffect(() => {
    try {
      setHome(value.address_home);
      setWork(value.address_work);
    } catch (err) {
      console.log(err);
    }
  }, [value]);

  useEffect(() => {
    setAddress(saddress);
  }, [saddress]);

  const clearData = () => {
    setIs_express(false);
    setAdditional_information("");
    setCustomer_unique_id("");
    setAddress("");
    setSAddress("");
    setCourier_unique_id("");
    setOrder_date("");
    setOrder_time("");
    setDelivery_price("0");
    setLatitude("");
    setLongitude("");
    setStatus("");
    setCourier("");
    setValue("");
    setHome("");
    setWork("");
    setProducts([
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
        product_count: 1,
      },
    ]);
  }

  const addData = async () => {
    const data = {
      is_express: is_express,
      additional_information: additional_information,
      customer_unique_id: value.unique_id,
      address: address,
      courier_unique_id: courier,
      order_date: order_date,
      order_time: order_time,
      delivery_price: delivery_price,
      latitude: latitude,
      longitude: longitude,
      status: status,
      products: products,
    };
    let axios = online ? AxiosInstance : LocalAxiosInstance;
    axios.post("/operator/add-order", data)
      .then((response) => {
        if (!response.data.error) {
          handleClose();
          props.setPage(1);
          props.getData();
          clearData();
          showSuccess('Sargyt üstünlikli goşuldy!');
        } else {
          showError('Ýalňyşlyk ýüze çykdy!');
        }

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
        product_count: 1,
      },
    ];
    setProducts(newArray);
  };


  const removeByIndex = (index) => {
    let temp = products.filter((item, i) => i != index);
    setProducts(temp);
  }

  useEffect(() => {
    if (courier != null && courier != '') {
      setStatus('courier-pending');
    }
  }, [courier]);

  return (
    <div>
      <ToastContainer />
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
              <label>{convertTimeStampToDate(new Date())}</label>
              <label>{convertTimeStampToTime(new Date())}</label>
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
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                options={allCustomer}
                id="disable-close-on-select"
                disableCloseOnSelect
                getOptionLabel={(option) => `${option.fullname} / ${option.phone_number}`}
                width="100%"
                renderInput={(params) => (
                  <TextField {...params} label="Ady" variant="standard" />
                )}
              />
            </Stack>
          </Stack>
          <Stack direction="column" mt={3} spacing={1.5} width="100%">
            <Stack direction="row" spacing={3} width="100%">
              <label>Goşmaça bellikler:</label>
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
                {i != 0 ? <Button endIcon={<RemoveCircleOutlineIcon />} color={'error'} sx={{ float: 'right' }} onClick={() => removeByIndex(i)}>Aýyr</Button> : null}
                <Stack direction="row" mt={1} justifyContent={"center"} alignItems={'center'}>
                  <label style={{ fontWeight: "600" }}>Haryt barada</label>

                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  mt={3}
                >
                  <Stack width="100%" direction="column" spacing={1}>
                    <label>Görnüşi:</label>
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
                    <label>Artikuly:</label>
                    <input
                      type="text"
                      value={item.product_artikul_code}
                      onChange={(e) =>
                        updateProductArticulCode(e.target.value, i, item)
                      }
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
                      <label>Nagt:</label>
                      <input
                        type="number"
                        value={item.product_cash_price}
                        onChange={(e) =>
                          updateProductCashPrice(e.target.value, i, item)
                        }
                        placeholder="Nagt ..."
                      />
                    </Stack>
                    <Stack width="100%" direction="column" spacing={1}>
                      <label>Garaşaryna:</label>
                      <input type="number" placeholder="Garasaryna ..."
                        value={item.product_debt_price}
                        onChange={(e) =>
                          updateProductDebtPrice(e.target.value, i, item)
                        }
                      />
                    </Stack>
                    <Stack width="100%" mt={2} direction="column" spacing={1}>
                      <label>Arzanladyş:</label>
                      <input
                        type="text"
                        value={item.product_discount}
                        onChange={(e) =>
                          updateProductDiscount(e.target.value, i, item)
                        }
                      />
                    </Stack>

                  </Stack>

                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  alignItems="center"
                  mt={2}
                  justifyContent={"space-between"}
                >
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
                  <Stack width="100%" direction="column" spacing={1}>
                    <label>Ölçegi:</label>
                    <input
                      type="number"
                      value={item.product_size}
                      onChange={(e) =>
                        updateProductSize(e.target.value, i, item)
                      }
                    />
                  </Stack>
                  <Stack width="100%" direction="column" spacing={1}>
                    <label>Reňki:</label>
                    <input
                      type="text"
                      value={item.product_color}
                      onChange={(e) =>
                        updateProductColor(e.target.value, i, item)
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
                  <Stack width="32%" direction="column" spacing={1}>
                    <label>Haryt sany:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.product_count}
                      onChange={(e) =>
                        updateProductCount(e.target.value, i, item)
                      }
                    />
                  </Stack>
                </Stack>
              </div>
            );
          })}
          <Stack direction="row" alignItems={"center"}>
            <Button onClick={addProduct} sx={{ color: "#5E9CCE" }} endIcon={<AddCircleOutlineIcon />}>
              Haryt goş
            </Button>
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
                    value={saddress}
                    style={{
                      background: "#f0eefc",
                      border: "1px solid #5e9cce",
                      borderRadius: "16px",
                      height: "35px",
                    }}
                    onChange={(e) => setSAddress(e.target.value)}
                  >
                    <MenuItem value={home}>Ýaşaýan ýerine</MenuItem>
                    <MenuItem value={work}>Iş ýerine</MenuItem>
                    <MenuItem value={'Elde girizmeli'}>Başga ýere</MenuItem>
                  </Select>
                </Stack>
                <Stack width="100%">
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </Stack>
                <Stack width="100%">
                  <MapLocation latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} />
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
              </Stack>
              <Stack width="100%">
                <label></label>
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
                  <MenuItem value={"none"}>Täze sargyt</MenuItem>
                  <MenuItem value={"pending"}>Garaşylýar</MenuItem>
                  <MenuItem value={"courier-pending"}>
                    Eltip berijä ugradyldy
                  </MenuItem>
                  <MenuItem value={"courier-accepted"}>
                    Eltip beriji kabul etdi
                  </MenuItem>
                  <MenuItem value={"courier-delivered"}>
                    Eltip beriji eltip berdi
                  </MenuItem>
                  <MenuItem value={"delivered"}>Sargyt tamamlandy</MenuItem>
                  <MenuItem value={"rejected"}>Sargyt ýatyryldy</MenuItem>
                </Select>
              </Stack>

              <Stack width="100%">
                <FormControlLabel control={<Checkbox checked={is_express} onChange={e => setIs_express(e.target.checked)} />} label="Çalt eltip bermek hyzmaty barmy" />
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
                onClick={() => clearData()}
                style={{
                  borderRadius: "16px",
                  textTransform: "none",
                  color: "#282828",
                  fontWeight: "600",
                }}
              >
                Arassala
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
                Ýatda saklat
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
