import React, {useContext, useEffect, useState} from "react";
import { Button, Grid, IconButton, Modal, Stack } from "@mui/material";
import { Box } from "@mui/system";
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
const AddCustomerModal = (props) => {
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => setOpen(false);
  const [fullname, setFullname] = useState("");
  const [phone_number, setPhone_number] = useState(typeof props.phone_number!== 'undefined' && props.phone_number != null ? props.phone_number : '');
  const [question_mode, setQuestion_mode] = useState("");
  const [address_home, setAddress_home] = useState("");
  const [address_work, setAddress_work] = useState("");
  const [information, setInformation] = useState("");
  const [status, setStatus] = useState(0);
  const [fields, setFileds] = useState([]);
  const [accent, setAccent] = useState(0);
  const [mode, setMode] = useState(0);
  const [word, setWord] = useState(0);
  const [tone, setTone] = useState(0);
  const [findUs, setFindUs] = useState(0);
  const [interested_products, setInterested_products] = useState([
    {
      interested_product_name: "",
      interested_product_size: "",
      interested_product_color: "",
    },
  ]);
  const handleOpen = () => {
    setPhone_number(typeof props.phone_number!== 'undefined' && props.phone_number != null ? props.phone_number : '');
    setOpen(true);
  }
  const {online}=useContext(AppContext);
  const clearCustomer = () => {
    setFullname("");
    setPhone_number("");
    setQuestion_mode("");
    setAddress_home("");
    setAddress_work("");
    setInformation("");
    setStatus(0);
    setAccent(0);
    setMode(0);
    setWord(0);
    setTone(0);
    setFindUs(0);
    setInterested_products([
      {
        interested_product_name: "",
        interested_product_size: "",
        interested_product_color: "",
      },
    ]);
  };

  const hoveredstyle = {
    cursor: "initial",
  };

  const getFields = async () => {
    let axios=online?AxiosInstance:LocalAxiosInstance;
    axios.get("/operator/get-fields")
      .then((response) => {
        setFileds(response.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFields();
  }, []);

  // const addParallelData = async (data) => {
  //   let axios=online?LocalAxiosInstance:AxiosInstance;
  //   axios.post("/operator/add-customer", data)
  //     .then((response) => {
  //       if (!response.data.error) {
  //         handleClose();
  //         props.getData(1);
  //         showSuccess("Musderi ustunlikli gosuldy !");
  //         clearCustomer();
  //       }
        
  //     })
  //     .catch((err) => {
  //       showError(err + "");
  //     });
  // };

  const addData = async () => {
    const data = {
      fullname: fullname,
      phone_number: phone_number,
      question_mode: question_mode,
      find_us: findUs,
      address_home: address_home,
      address_work: address_work,
      information: information,
      speak_mode: mode,
      status: status,
      speak_tone: tone,
      speak_accent: accent,
      focus_word: word,
      interested_products: interested_products,
    };
    let axios=online?AxiosInstance:LocalAxiosInstance;
    axios.post("/operator/add-customer", data)
      .then((response) => {
        if (!response.data.error) {
          handleClose();
          props.getData(1);
          showSuccess("Musderi ustunlikli gosuldy !");
          clearCustomer();
        }
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  const updateInterestProductName = (value, index, item) => {
    let newItem = item;
    newItem.interested_product_name = value;
    const newArray = [
      ...interested_products.slice(0, index),
      newItem,
      ...interested_products.slice(index + 1),
    ];


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
      <Stack
        onClick={handleOpen}
        mb={3}
        direction={"row"}
        justifyContent={"flex-end"}
      >
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
          Müşderi goş
        </Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="CCMtitle">
            <label>Müşderi goşmak</label>
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
                <hr />{" "}
              </div>
            </Grid>
            <Grid item lg={6} md={6} xs={12} sm={12} pl={3}>
              <div className="CAname">
                <Stack direction="row" spacing={2} alignItems="center">
                  <label style={{ fontWeight: "600" }}>Telefon belgisi :</label>
                  <input
                    type="text"
                    value={phone_number}
                    onChange={(e) => setPhone_number(e.target.value)}
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
                  <label style={{ fontWeight: "400" }}>Ýaşaýan ýeri :</label>
                  <input
                    type="text"
                    value={address_home}
                    onChange={(e) => setAddress_home(e.target.value)}
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
                  <label style={{ fontWeight: "400" }}>Iş ýeri :</label>
                  <input
                    type="text"
                    value={address_work}
                    onChange={(e) => setAddress_work(e.target.value)}
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
                    Sorag we söwda gatnaşygy:
                  </label>
                  <input
                    type="text"
                    value={question_mode}
                    onChange={(e) => setQuestion_mode(e.target.value)}
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
                    type="text"
                    value={information}
                    onChange={(e) => setInformation(e.target.value)}
                  />
                </Stack>
              </div>
            </Grid>
          </Grid>
          {/* Haryt barada section starts here !!!  */}
          {interested_products.map((item, i) => {
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
                  key={`add_customer_key${i}`}
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
              Haryt goş
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
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={0}>Hiçisi</MenuItem>
                  {fields.customer_status == null
                    ? ""
                    : fields.customer_status.map((item, i) => {
                        return (
                          <MenuItem key={`status_key${i}`} value={item.id}>
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
                  value={mode}
                  style={{
                    borderRadius: "16px",
                    border: "1px solid #5e9cce",
                    boxShadow: "0px 0px 10px rgba(129,129,129,0.15)",
                    padding: "8px 16px",
                    height: "35px",
                    background: "#f1f1f1",
                  }}
                  onChange={(e) => setMode(e.target.value)}
                >
                  <MenuItem value={0}>Hiçisi</MenuItem>
                  {fields.speak_mode == null
                    ? ""
                    : fields.speak_mode.map((item, i) => {
                        return (
                          <MenuItem key={`mode_key${i}`} value={item.id}>
                            {item.value}
                          </MenuItem>
                        );
                      })}
                </Select>
              </Stack>
              <Stack direction="column" width="100%" spacing={1}>
                {" "}
                <label>Nähilli äheňde gürleşýär:</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={accent}
                  style={{
                    borderRadius: "16px",
                    border: "1px solid #5e9cce",
                    boxShadow: "0px 0px 10px rgba(129,129,129,0.15)",
                    padding: "8px 16px",
                    height: "35px",
                    background: "#f1f1f1",
                  }}
                  onChange={(e) => setAccent(e.target.value)}
                >
                  <MenuItem value={0}>Hiçisi</MenuItem>
                  {fields.speak_accent == null
                    ? ""
                    : fields.speak_accent.map((item, i) => {
                        return (
                          <MenuItem key={`accent_key${i}`} value={item.id}>
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
                  Nähilli äheňde ýüzlense gowy görýär :
                </label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={word}
                  style={{
                    borderRadius: "16px",
                    border: "1px solid #5e9cce",
                    boxShadow: "0px 0px 10px rgba(129,129,129,0.15)",
                    padding: "8px 16px",
                    height: "35px",
                    background: "#f1f1f1",
                  }}
                  onChange={(e) => setWord(e.target.value)}
                >
                  <MenuItem value={0}>Hiçisi</MenuItem>
                  {fields.focus_word == null
                    ? ""
                    : fields.focus_word.map((item, i) => {
                        return (
                          <MenuItem key={`focus_key${i}`} value={item.id}>
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
                  value={tone}
                  style={{
                    borderRadius: "16px",
                    border: "1px solid #5e9cce",
                    boxShadow: "0px 0px 10px rgba(129,129,129,0.15)",
                    padding: "8px 16px",
                    height: "35px",
                    background: "#f1f1f1",
                  }}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <MenuItem value={0}>Hiçisi</MenuItem>
                  {fields.speak_tone == null
                    ? ""
                    : fields.speak_tone.map((item, i) => {
                        return (
                          <MenuItem key={`tone_key${i}`} value={item.id}>
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
                  value={findUs}
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
                  {fields.find_us == null
                    ? ""
                    : fields.find_us.map((item, i) => {
                        return (
                          <MenuItem key={`find_key${i}`} value={item.id}>
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
              onClick={() => addData()}
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

export default AddCustomerModal;
