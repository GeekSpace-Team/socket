import React, {useContext, useEffect, useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid, IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {AxiosInstance, LocalAxiosInstance} from "../../api-interface/api/AxiosInstance.mjs";
import { showError, showSuccess } from "../Alert/Alert.jsx";
import { ToastContainer } from "react-toastify";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {AppContext} from "../../App";

const style = {
  position: "absolute",
  width: "100%",
  height: "100vh",
  overflow: "scroll",
  display: "block",
  bgcolor: "#FAFCFB",
  boxShadow: 24,
  p: 4,
};

const CustomerUpdate = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);


  const getSelectIndex = (l, v) => {
    try {
      if (typeof l !== 'undefined' && l != null && l.length > 0) {
        return v;
      } else {
        return 0;
      }
    } catch (err) {
      return 0;
    }
  }

  const [fullname, setFullname] = useState(props.item.fullname);
  const [phone_number, setPhone_number] = useState(props.item.phone_number);
  const [question_mode, setQuestion_mode] = useState(props.item.question_mode);
  const [address_home, setAddress_home] = useState(props.item.address_home);
  const [address_work, setAddress_work] = useState(props.item.address_work);
  const [information, setInformation] = useState(props.item.information);
  const [status, setStatus] = useState(getSelectIndex(props.fields.customer_status, props.item.status));
  const [speak_accent, setSpeak_accent] = useState(getSelectIndex(props.fields.speak_accent, props.item.speak_accent));
  const [speak_mode, setSpeak_mode] = useState(getSelectIndex(props.fields.speak_mode, props.item.speak_mode));
  const [focus_word, setFocus_word] = useState(getSelectIndex(props.fields.focus_word, props.item.focus_word));
  const [speak_tone, setSpeak_tone] = useState(getSelectIndex(props.fields.speak_tone, props.item.speak_tone));
  const [find_us, setFindUs] = useState(getSelectIndex(props.fields.find_us, props.item.find_us));
  const [unique_id, setUnique_id] = useState();
  const [fields, setFileds] = useState(props.fields);
  const [interested_products, setInterested_products] = useState(
    props.item.interested_products
  );
  const {online}=useContext(AppContext);

  const hoveredstyle = {
    cursor: "initial",
  };

  useEffect(() => {
    console.log(speak_accent);
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setFullname(props.item.fullname)
    setPhone_number(props.item.phone_number)
    setQuestion_mode(props.item.question_mode)
    setAddress_home(props.item.address_home)
    setAddress_work(props.item.address_work)
    setInformation(props.item.information)
    setStatus(getSelectIndex(props.fields.customer_status, props.item.status))
    setSpeak_accent(getSelectIndex(props.fields.speak_accent, props.item.speak_accent))
    setSpeak_mode(getSelectIndex(props.fields.speak_mode, props.item.speak_mode))
    setFocus_word(getSelectIndex(props.fields.focus_word, props.item.focus_word))
    setSpeak_tone(getSelectIndex(props.fields.speak_tone, props.item.speak_tone))
    setFindUs(getSelectIndex(props.fields.find_us, props.item.find_us));
    setInterested_products(props.item.interested_products);
  };



  const editData = async (unique_id) => {
    const data = {
      fullname: fullname,
      phone_number: phone_number,
      question_mode: question_mode,
      find_us: find_us,
      address_home: address_home,
      address_work: address_work,
      information: information,
      speak_mode: speak_mode,
      status: status,
      speak_tone: speak_tone,
      speak_accent: speak_accent,
      focus_word: focus_word,
      unique_id: unique_id,
    };

    let axios=online?AxiosInstance:LocalAxiosInstance;
    axios.put("/operator/edit-customer", data)
      .then((response) => {
        if (!response.data.error) {
        }
        handleClose();
        props.getData(1);
        showSuccess("Ustunlikli uytgedildi !");
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  const clearCustomer = () => {
    setFullname("");
    setPhone_number("");
    setQuestion_mode("");
    setAddress_home("");
    setAddress_work("");
    setInformation("");
    setStatus(0);
    setSpeak_accent(0);
    setSpeak_mode(0);
    setFocus_word(0);
    setSpeak_tone(0);
    setFindUs(0);
    setInterested_products([
      {
        interested_product_name: "",
        interested_product_size: "",
        interested_product_color: "",
      },
    ]);
  };

  const updateInterestProductName = (value, index, item) => {
    let newItem = item;
    newItem.interested_product_name = value;
    const newArray = [
      ...interested_products.slice(0, index),
      newItem,
      ...interested_products.slice(index + 1),
    ];

    console.log(newArray);

    setInterested_products(newArray);
  };

  const updateInterestProductSize = (value, index, item) => {
    let newItem = item;
    newItem.interested_product_size = value;
    const newArray = [
      ...interested_products.slice(0, index),
      newItem,
      ...interested_products.slice(index + 1),
    ];

    console.log(newArray);

    setInterested_products(newArray);
  };

  const updateInterestProductColor = (value, index, item) => {
    let newItem = item;
    newItem.interested_product_color = value;
    const newArray = [
      ...interested_products.slice(0, index),
      newItem,
      ...interested_products.slice(index + 1),
    ];

    console.log(newArray);

    setInterested_products(newArray);
  };

  const addInterestProduct = () => {
    const newArray = [
      ...interested_products.slice(0, interested_products.length),
      {
        interested_product_name: "",
        interested_product_size: "",
        interested_product_color: "",
      },
    ];
    setInterested_products(newArray);
  };

  const removeByIndex = (index) => {
    let temp = interested_products.filter((item, i) => i != index);
    setInterested_products(temp);
  }

  return (
    <div>
      {props.which === "accept-call" ? (
        <Button
          onClick={handleOpen}
          style={{
            borderRadius: "16px",
            textTransform: "none",
            fontWeight: "600",
          }}
          variant="outlined"
        >
          Üýtget
        </Button>
      ) : (
        <IconButton
          onClick={handleOpen}
          tooltip="Description here"
          hoveredstyle={hoveredstyle}
        >
          <EditIcon style={{ color: "#5E9CCE", cursor: "pointer" }} />
        </IconButton>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="CCMtitle">
            <label>Müşderini üýtgetmek</label>
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
          <Grid container mt={3}>
            <Grid item lg={6} md={6} xs={12} sm={12}>
              <div className="CAname">
                {/* <Stack direction="row" spacing={3}> */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <label style={{ fontWeight: "600" }}>Doly ady :</label>
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </Stack>
                <hr />
              </div>
            </Grid>
            <Grid item lg={6} md={6} xs={12} sm={12} pl={3}>
              <div className="CAname">
                <Stack direction="row" spacing={2} alignItems="center">
                  <label style={{ fontWeight: "600" }}>Telefon belgisi :</label>
                  <input
                    value={phone_number}
                    onChange={(e) => setPhone_number(e.target.value)}
                    type="text"
                  />
                </Stack>
                <hr />
              </div>
            </Grid>
          </Grid>
          <Grid container mt={1}>
            <Grid item md={12} lg={12} sm={12} xs={12}>
              <div className="CAname">
                <Stack direction="row" spacing={2} alignItems="center">
                  <label style={{ fontWeight: "400" }}>Ýaşaýan ýeri :</label>
                  <input
                    value={address_home}
                    onChange={(e) => setAddress_home(e.target.value)}
                    type="text"
                  />
                </Stack>
                <hr />
              </div>
            </Grid>
          </Grid>
          <Grid container mt={1}>
            <Grid item md={12} lg={12} sm={12} xs={12}>
              <div className="CAname">
                <Stack direction="row" spacing={2} alignItems="center">
                  <label style={{ fontWeight: "400" }}>Iş ýeri :</label>
                  <input
                    value={address_work}
                    onChange={(e) => setAddress_work(e.target.value)}
                    type="text"
                  />
                </Stack>
                <hr />{" "}
              </div>
            </Grid>
          </Grid>
          <Grid container mt={1}>
            <Grid item md={12} lg={12} sm={12} xs={12}>
              <div className="CAname">
                <Stack direction="row" spacing={2} alignItems="center">
                  <label style={{ fontWeight: "400" }}>
                    Sorag we söwda gatnaşygy :
                  </label>
                  <input
                    value={question_mode}
                    onChange={(e) => setQuestion_mode(e.target.value)}
                    type="text"
                  />
                </Stack>
                <hr />{" "}
              </div>
            </Grid>
          </Grid>{" "}
          <Grid container mt={1} pb={2}>
            <Grid item md={12} lg={12} sm={12} xs={12}>
              <div className="CAname">
                <Stack direction="row" spacing={2} alignItems="center">
                  <label style={{ fontWeight: "400" }}>
                    Goşmaça maglumatlar :
                  </label>
                  <input
                    value={information}
                    onChange={(e) => setInformation(e.target.value)}
                    type="text"
                  />
                </Stack>
              </div>
            </Grid>
          </Grid>
          {/* Haryt barada section starts here !!!  */}
          {typeof interested_products === 'undefined' || interested_products == null || interested_products.length <= 0 ?
            null :
            interested_products.map((item, i) => {
              return (
                <div className="aboutGoods">

                  <Stack
                    direction="row"
                    justifyContent={"flex-end"}
                    alignItems="center"
                  >
                    <Stack direction="row" justifyContent={"center"} width="100%">

                      <label style={{ color: "#282828", fontWeight: "600" }}>
                        Haryt barada
                      </label>

                    </Stack>
                    {i != 0 ? <Button endIcon={<RemoveCircleOutlineIcon />} color={'error'} sx={{ float: 'right' }} onClick={() => removeByIndex(i)}>Aýyr</Button> : null}
                  </Stack>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2, md: 5 }}
                    key={`update_customer_key${i}`}
                  >
                    <Stack direction="column" spacing={1} width="100%">
                      <label>Harydyň ady</label>
                      <input
                        type="text"
                        value={item.interested_product_name}
                        onChange={(e) =>
                          updateInterestProductName(e.target.value, i, item)
                        }
                      />
                    </Stack>
                    <Stack direction="column" spacing={1} width="100%">
                      <label>Ölçegi</label>
                      <input
                        type="number"
                        value={item.interested_product_size}
                        onChange={(e) =>
                          updateInterestProductSize(e.target.value, i, item)
                        }
                      />
                    </Stack>
                    <Stack direction="column" spacing={1} width="100%">
                      <label>Reňki</label>
                      <input
                        type="text"
                        value={item.interested_product_color}
                        onChange={(e) =>
                          updateInterestProductColor(e.target.value, i, item)
                        }
                      />
                    </Stack>
                  </Stack>
                </div>
              );
            })}
          <Stack
            direction="row"
            onClick={addInterestProduct}
            alignItems={"center"}
          >
            <label style={{ color: "#5E9CCE", cursor: "pointer" }}>
              Haryt gos
            </label>
            <IconButton tooltip="Description here" hoveredstyle={hoveredstyle}>
              <AddCircleOutlineIcon
                style={{ color: "#5E9CCE", fontSize: "16px" }}
              />
            </IconButton>
          </Stack>
          {/* Haryt barada section ends here !!! */}
          {/* Status of Customer section starts here !!! */}
          <div className="AGinfo">
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 5 }}
              p={1}
            >
              <Stack direction="column" width="100%" spacing={1}>
                <label>Müşderiniň statusy :</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  style={{
                    borderRadius: "16px",
                    border: "1px solid #5e9cce",
                    boxShadow: "0px 0px 10px rgba(129,129,129,0.15)",
                    padding: "8px 16px",
                    height: "35px",
                    background: "#f1f1f1",
                  }}
                  label="Age"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={0}>Hiçisi</MenuItem>
                  {props.fields.customer_status == null
                    ? ""
                    : props.fields.customer_status.map((item, i) => {
                      return (
                        <MenuItem
                          key={`status_update_key${i}`}
                          value={item.id}
                        >
                          {item.value}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Stack>
              <Stack direction="column" width="100%" spacing={1}>
                {" "}
                <label>Gepleýiş şekili :</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={speak_mode}
                  style={{
                    borderRadius: "16px",
                    border: "1px solid #5e9cce",
                    boxShadow: "0px 0px 10px rgba(129,129,129,0.15)",
                    padding: "8px 16px",
                    height: "35px",
                    background: "#f1f1f1",
                  }}
                  onChange={(e) => setSpeak_mode(e.target.value)}
                >
                  <MenuItem value={0}>Hiçisi</MenuItem>
                  {props.fields.speak_mode == null
                    ? ""
                    : props.fields.speak_mode.map((item, i) => {
                      return (
                        <MenuItem key={`mode_update_key${i}`} value={item.id}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Stack>
              <Stack direction="column" width="100%" spacing={1}>
                {" "}
                <label>Nähilli äheňde gürleşýär :</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={speak_accent}
                  style={{
                    borderRadius: "16px",
                    border: "1px solid #5e9cce",
                    boxShadow: "0px 0px 10px rgba(129,129,129,0.15)",
                    padding: "8px 16px",
                    height: "35px",
                    background: "#f1f1f1",
                  }}
                  onChange={(e) => setSpeak_accent(e.target.value)}
                >
                  <MenuItem value={0}>Hiçisi</MenuItem>
                  {props.fields.speak_accent == null
                    ? ""
                    : props.fields.speak_accent.map((item, i) => {
                      return (
                        <MenuItem
                          key={`accent_update_key${i}`}
                          value={item.id}
                        >
                          {item.value}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Stack>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 5 }}
              p={1}
            >
              <Stack direction="column" width="100%" spacing={1}>
                {" "}
                <label>
                  Nähilli äheňde ýüzlense gowy görýär:
                </label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={focus_word}
                  style={{
                    borderRadius: "16px",
                    border: "1px solid #5e9cce",
                    boxShadow: "0px 0px 10px rgba(129,129,129,0.15)",
                    padding: "8px 16px",
                    height: "35px",
                    background: "#f1f1f1",
                  }}
                  onChange={(e) => setFocus_word(e.target.value)}
                >
                  <MenuItem value={0}>Hiçisi</MenuItem>
                  {props.fields.focus_word == null
                    ? ""
                    : props.fields.focus_word.map((item, i) => {
                      return (
                        <MenuItem
                          key={`focus_update_key${i}`}
                          value={item.id}
                        >
                          {item.value}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Stack>
              <Stack direction="column" width="100%" spacing={1}>
                {" "}
                <label>Gürleýiş tony :</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={speak_tone}
                  style={{
                    borderRadius: "16px",
                    border: "1px solid #5e9cce",
                    boxShadow: "0px 0px 10px rgba(129,129,129,0.15)",
                    padding: "8px 16px",
                    height: "35px",
                    background: "#f1f1f1",
                  }}
                  onChange={(e) => setSpeak_tone(e.target.value)}
                >
                  <MenuItem value={0}>Hich haysy</MenuItem>
                  {props.fields.speak_tone == null
                    ? ""
                    : props.fields.speak_tone.map((item, i) => {
                      return (
                        <MenuItem key={`tone_update_key${i}`} value={item.id}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Stack>
              <Stack direction="column" width="100%" spacing={1}>
                {" "}
                <label>Bizi nireden tapdy :</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={find_us}
                  style={{
                    borderRadius: "16px",
                    border: "1px solid #5e9cce",
                    boxShadow: "0px 0px 10px rgba(129,129,129,0.15)",
                    padding: "8px 16px",
                    height: "35px",
                    background: "#f1f1f1",
                  }}
                  onChange={(e) => setFindUs(e.target.value)}
                >
                  <MenuItem value={0}>Hiçisi</MenuItem>
                  {props.fields.find_us == null
                    ? ""
                    : props.fields.find_us.map((item, i) => {
                      return (
                        <MenuItem key={`find_update_key${i}`} value={item.id}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Stack>
            </Stack>
          </div>
          {/* Delete all and Yatda sakla buttons section starts here */}
          <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
            <Button
              onClick={() => clearCustomer()}
              style={{
                borderRadius: "16px",
                textTransform: "none",
                fontWeight: "600",
                color: "#5e9cce",
              }}
              variant="outlined"
            >
              Arassala
            </Button>
            <Button
              onClick={() => editData(props.item.unique_id)}
              style={{
                bacground: "#5e9cce",
                borderRadius: "16px",
                fontWeight: "600",
                color: "#fefefe",
                textTransform: "none",
              }}
              variant="contained"
            >
              Ýatda saklat
            </Button>
          </Stack>
          {/* Delete all and Yatda sakla buttons section ends here */}
          {/* Status of Customer section ends here !!! */}
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default CustomerUpdate;
