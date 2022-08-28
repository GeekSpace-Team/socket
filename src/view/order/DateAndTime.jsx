import React, {useContext, useState} from "react";
import { Button, IconButton, Modal, Stack } from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import {AxiosInstance, LocalAxiosInstance} from "../../api-interface/api/AxiosInstance.mjs";
import {showError, showSuccess} from "../Alert/Alert";
import {Edit} from "@mui/icons-material";
import {AppContext} from "../../App";

const style = {
  position: "absolute",
  top: "50%",
  left: "59%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  display: "block",
  borderRadius: "16px",
  bgcolor: "#FAFCFB",
  boxShadow: 24,
  p: 2,
};

const DateAndTime = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [date,setDate]=useState('');
  const [time,setTime]=useState('');
  const [reason,setReason]=useState('');

  const {online}=useContext(AppContext);


  const update=()=>{
      let data={
          order_unique_id:props.order_unique_id,
          order_date:date,
          order_time:time,
          reason:reason
      };

      let axios=online?AxiosInstance:LocalAxiosInstance;
      axios.put('/operator/change-order-date',data)
          .then(response=>{
              if(!response.data.error){
                  showSuccess('Üstünlikli üýtgedildi!');
                  props.addDateHistory(response.data.body);
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
              Eltip bermeli sene we wagty
            </label>
          </Stack>
          <Stack
            className="eltipBermeli"
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            mt={2}
          >
            <Stack width="100%">
              <input
                type="date"
                onChange={e=>setDate(e.target.value)}
                // onChange={(e) => setOrder_date(e.target.value)}
                // value={order_date}
              />
            </Stack>
            <Stack width="100%">
              <input
                type="time"
                onChange={e=>setTime(e.target.value)}
                // onChange={(e) => setOrder_time(e.target.value)}
                // value={order_time}
                style={{ padding: "6px 16px" }}
              />
            </Stack>
          </Stack>
          <Stack className="eltipBermeli" direction={"column"}>
            <Stack direction={"row"}>
              <label style={{ fontWeight: "600" }}>Sebäbi :</label>
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
              Ýatyr
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
              Ýatda saklat
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default DateAndTime;
