import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid, IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AxiosInstance } from "../../api-interface/api/AxiosInstance.mjs";
import { showError, showSuccess } from "../Alert/Alert.jsx";
import { ToastContainer } from "react-toastify";

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

const CustomerUpdate = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [fullname, setFullname] = useState(props.item.fullname);
  const [phone_number, setPhone_number] = useState(props.item.phone_number);
  const [question_mode, setQuestion_mode] = useState(props.item.question_mode);
  const [address_home, setAddress_home] = useState(props.item.address_home);
  const [address_work, setAddress_work] = useState(props.item.address_work);
  const [information, setInformation] = useState(props.item.information);
  const [status, setStatus] = useState(props.item.status);
  const [speak_accent, setSpeak_accent] = useState(props.item.speak_accent);
  const [speak_mode, setSpeak_mode] = useState(props.item.speak_mode);
  const [focus_word, setFocus_word] = useState(props.item.focus_word);
  const [speak_tone, setSpeak_tone] = useState(props.item.speak_tone);
  const [find_us, setFindUs] = useState(props.item.find_us);
  const [unique_id, setUnique_id] = useState();
  const [fields, setFileds] = useState(props.fields);
  const [interested_products, setInterested_products] = useState(
    props.item.interested_products
  );

  const hoveredstyle = {
    cursor: "initial",
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

    await AxiosInstance.put("/operator/edit-customer", data)
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
          Uytget
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
            <label>Musderi gosmak update</label>
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
                  <label style={{ fontWeight: "600" }}>Ady :</label>
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
                  <label style={{ fontWeight: "400" }}>Yasayan yeri :</label>
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
                  <label style={{ fontWeight: "400" }}>Is yeri :</label>
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
                    Sorag sowda gatnasygy
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
                    Gosmaca maglumatlar :
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
          {interested_products.map((item, i) => {
            return (
              <div className="aboutGoods">
                <Stack
                  direction="row"
                  justifyContent={"flex-end"}
                  alignItems="center"
                >
                  <Stack direction="row" justifyContent={"center"} width="110%">
                    <label style={{ color: "#282828", fontWeight: "600" }}>
                      Haryt barada
                    </label>
                  </Stack>
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 5 }}
                  key={`update_customer_key${i}`}
                >
                  <Stack direction="column" spacing={1} width="100%">
                    <label>Harydyn ady</label>
                    <input
                      type="text"
                      value={item.interested_product_name}
                      onChange={(e) =>
                        updateInterestProductName(e.target.value, i, item)
                      }
                    />
                  </Stack>
                  <Stack direction="column" spacing={1} width="100%">
                    <label>olcegi</label>
                    <input
                      type="number"
                      value={item.interested_product_size}
                      onChange={(e) =>
                        updateInterestProductSize(e.target.value, i, item)
                      }
                    />
                  </Stack>
                  <Stack direction="column" spacing={1} width="100%">
                    <label>Renki</label>
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
                <label>Musderinin statusy :</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    typeof status === "undefined" ||
                    status == null ||
                    status == 0
                      ? 0
                      : status
                  }
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
                  <MenuItem value={0}>Hich haysy</MenuItem>
                  {fields.customer_status == null
                    ? ""
                    : fields.customer_status.map((item, i) => {
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
                <label>Gepleyis sekili :</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    typeof speak_mode === "undefined" ||
                    speak_mode == null ||
                    speak_mode == 0
                      ? 0
                      : speak_mode
                  }
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
                  <MenuItem value={0}>Hich haysy</MenuItem>
                  {fields.speak_mode == null
                    ? ""
                    : fields.speak_mode.map((item, i) => {
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
                <label>Nahili ahende gurlesyar :</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    typeof speak_accent === "undefined" ||
                    speak_accent == null ||
                    speak_accent == 0
                      ? 0
                      : speak_accent
                  }
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
                  <MenuItem value={0}>Hich haysy</MenuItem>
                  {fields.speak_accent == null
                    ? ""
                    : fields.speak_accent.map((item, i) => {
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
                  Nahili ahende yuzlenilse <br /> gowy gorya :
                </label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    typeof focus_word === "undefined" ||
                    focus_word == null ||
                    focus_word == 0
                      ? 0
                      : focus_word
                  }
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
                  <MenuItem value={0}>Hich haysy</MenuItem>
                  {fields.focus_word == null
                    ? ""
                    : fields.focus_word.map((item, i) => {
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
                <label>Gurleyis tony :</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    typeof speak_tone === "undefined" ||
                    speak_tone == null ||
                    speak_tone == 0
                      ? 0
                      : speak_tone
                  }
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
                  {fields.speak_tone == null
                    ? ""
                    : fields.speak_tone.map((item, i) => {
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
                  value={
                    typeof find_us === "undefined" ||
                    find_us == null ||
                    find_us == 0
                      ? 0
                      : find_us
                  }
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
                  <MenuItem value={0}>Hich haysy</MenuItem>
                  {fields.find_us == null
                    ? ""
                    : fields.find_us.map((item, i) => {
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
              Delete all
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
              Yatda sakla
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
