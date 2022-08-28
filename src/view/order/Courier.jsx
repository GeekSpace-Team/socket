import React, {useContext, useState} from "react";
import {
    Button,
    IconButton,
    MenuItem,
    Modal,
    Select,
    Stack,
} from "@mui/material";
import {Box} from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import {AppContext} from "../../App";
import {AxiosInstance, LocalAxiosInstance} from "../../api-interface/api/AxiosInstance.mjs";
import {showError, showSuccess} from "../Alert/Alert";
import {Edit} from "@mui/icons-material";

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

const Courier = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {couriers} = useContext(AppContext);
    const [reason,setReason]=useState('');
    const [courier,setCourier]=useState('0');

    const {online}=useContext(AppContext);

    const update=()=>{
        let data={
            order_unique_id:props.order_unique_id,
            courier_unique_id:courier.unique_id,
            reason:reason
        };

        let axios=online?AxiosInstance:LocalAxiosInstance;
        axios.put('/operator/change-order-courier',data)
            .then(response=>{
                if(!response.data.error){
                    showSuccess('Üstünlikli üýtgedildi!');
                    props.addCourierHistory(response.data.body,courier.fullname);
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
                        <label style={{fontSize: "18px", fontWeight: "600"}}>
                            Eltip beriji
                        </label>
                    </Stack>
                    <Stack
                        className="eltipBermeli"
                        width={"100%"}
                        mt={2}
                        direction={"row"}
                        justifyContent={"center"}
                    >
                        <Select
                            id="demo-simple-select"
                              value={courier}
                            style={{
                                background: "#f0eefc",
                                border: "1px solid #5e9cce",
                                borderRadius: "16px",
                                height: "35px",
                                width: "300px",
                            }}
                              onChange={(e) => setCourier(e.target.value)}
                        >
                            {couriers.map((item, i) => {
                                return (
                                    <MenuItem
                                        key={`courierrs_key${i}`}
                                        value={item}
                                    >
                                        {item.fullname}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </Stack>
                    <Stack direction={"column"}>
                        <Stack direction={"row"}>
                            <label style={{fontWeight: "600"}}>Sebäbi :</label>
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
                        <hr/>
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

export default Courier;
