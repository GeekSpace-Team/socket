import React, {useContext, useState} from "react";
import { Button, IconButton, Modal, Stack } from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import {Edit} from "@mui/icons-material";
import {AxiosInstance, LocalAxiosInstance} from "../../api-interface/api/AxiosInstance.mjs";
import {showError, showSuccess} from "../Alert/Alert";
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

const DeliveredPrice = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [delivery_price,setDeliveryPrice]=useState('0');
  const [reason,setReason]=useState('');
    const {online}=useContext(AppContext);
    const update=()=>{
        let data={
            order_unique_id:props.order_unique_id,
            delivery_price:delivery_price,
            reason:reason
        };

        let axios=online?AxiosInstance:LocalAxiosInstance;
        axios.put('/operator/change-order-delivery-price',data)
            .then(response=>{
                if(!response.data.error){
                    showSuccess('Üstünlikli üýtgedildi!');
                    props.addPriceHistory(response.data.body);
                    props.getData();
                } else {
                    showError('Ýalňyşlyk ýüze çykdy!');
                }
            })
            .catch(err=>{
                showError(err);
            })
    }

  const hoveredstyle = {
    cursor: "initial",
  };
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
              Eltip bermek bahasy
            </label>
          </Stack>
          <Stack
            className="eltipBermeli"
            width={"100%"}
            mt={2}
            direction={"row"}
            justifyContent={"center"}
          >
            <input type="number" value={delivery_price} onChange={e=>setDeliveryPrice(e.target.value)}/>
          </Stack>

          <Stack direction={"column"}>
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

export default DeliveredPrice;
