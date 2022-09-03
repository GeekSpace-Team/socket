import React, {useContext, useEffect, useState} from "react";
import {
  Button,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import MapLocation from "./MapLocation";
import {Edit} from "@mui/icons-material";
import {AxiosInstance, LocalAxiosInstance} from "../../api-interface/api/AxiosInstance.mjs";
import {showError, showSuccess} from "../Alert/Alert";
import {AppContext} from "../../App";
import { ToastContainer } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "55%",
  display: "block",
  borderRadius: "16px",
  bgcolor: "#FAFCFB",
  boxShadow: 24,
  p: 2,
};

const PlaceChange = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [address,setAddress]=useState('');
  const [saddress,setSAddress]=useState('');
  const [reason,setReason]=useState('');
  const [latitude,setLatitude]=useState('');
  const [longitude,setLongitude]=useState('');
  const {online}=useContext(AppContext);

  useEffect(()=>{
      setAddress(saddress);
  },[saddress]);

  const update=()=>{
      let unique_id=props.unique_id;
      let data={
          order_unique_id:unique_id,
          address:address,
          reason:reason
      };
      let axios=online?AxiosInstance:LocalAxiosInstance;
      axios.put('/operator/change-order-address',data)
          .then(response=>{
              if(!response.data.error){

                  
                  if(latitude!=='' && longitude!==''){
                      updateLocation();
                  } else {
                      showSuccess('Üstünlikli üýtgedildi!');
                      props.getData();
                  }
                  
                  props.addAddressHistory(response.data.body);
                  
              } else {
                  showError('Ýalňyşlyk ýüze çykdy!');
              }
          })
          .catch(err=>{
              showError(err);
          })
  }

  const updateLocation=()=>{
      let unique_id=props.unique_id;
      let data={
          order_unique_id:unique_id,
          latitude:latitude,
          longitude:longitude,
          reason:reason
      };
      let axios=online?AxiosInstance:LocalAxiosInstance;
      axios.put('/operator/change-order-location',data)
          .then(response=>{
              if(!response.data.error){
                  showSuccess('Üstünlikli üýtgedildi!');
                  props.addLocationHistory(response.data.body);
                  props.getData();
              } else {
                  showError('Ýalňyşlyk ýüze çykdy!');
              }
          })
          .catch(err=>{
              showError(err);
          })
  }
  return (
    <div>
      <ToastContainer/>
      <Stack spacing={2} direction="row" alignItems={"center"}>
          <Button startIcon={<Edit/>} onClick={handleOpen} variant={'contained'} color={'secondary'}>
              Üýtget
          </Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack textAlign={"center"}>
            <label style={{ fontSize: "18px", fontWeight: "600" }}>
              Eltip bermeli yeri
            </label>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            mt={1}
            className="eltipBermeli"
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
                <MenuItem value={props.home}>Ýaşaýan ýeri</MenuItem>
                <MenuItem value={props.work}>Işleýän ýeri</MenuItem>
                <MenuItem value={'Elde girizmeli'}>Başga ýere</MenuItem>
              </Select>
            </Stack>
            <Stack width="100%">
              <input type="text" value={address} onChange={e=>setAddress(e.target.value)}/>
            </Stack>
            <Stack width="100%">
                <MapLocation setLatitude={setLatitude} setLongitude={setLongitude} latitude={latitude} longitude={longitude}/>
            </Stack>
          </Stack>

          <Stack direction={"column"} className="eltipBermeli">
            <Stack direction={"row"} alignItems={'center'}>
              <label style={{ fontWeight: "600" }}>Sebabi :</label>
              <input
                type="text"
                value={reason}
                onChange={e=>setReason(e.target.value)}
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                }}
              />
            </Stack>
            <hr />
          </Stack>
          <Stack direction="row" spacing={2} justifyContent={"flex-end"} mt={2}>
            <Button
              onClick={handleClose}
              variant="outlined"
              style={{
                borderRadius: "16px",
                textTransform: "none",
                color: "#282828",
                fontWeight: "600",
              }}
            >
              Yatyr
            </Button>
            <Button
              variant="contained"
              onClick={()=>update()}
              style={{
                borderRadius: "16px",
                textTransform: "none",
                background: "#5E9CCE",
                fontWeight: "600",
              }}
            >
              OK
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default PlaceChange;
