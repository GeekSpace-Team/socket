import React from "react";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {IconButton, Stack} from "@mui/material";
import AddOrderModal from "../order/AddOrderModal";
import CustomerUpdate from "../customer/CustomerUpdate";
import AddCustomerModal from "../customer/AddCustomerModal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "65%",
    bgcolor: "background.paper",
    border: "transparent",
    borderRadius: "16px",
    boxShadow: 24,
    p: 4,
};

const CallInfoModal = (props) => {
    const hoveredstyle = {
        cursor: "initial",
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {props.wich === "show-all" ? (
                <Stack mt={3} alignItems="center">
          <span
              onClick={handleOpen}
              style={{
                  color: "#3570A2",
                  textDecoration: "underline",
                  cursor: "pointer",
                  textUnderlineOffset: "2px",
              }}
          >
            Hemmesini görkez
          </span>
                </Stack>
            ) : (
                <IconButton
                    tooltip="Description here"
                    hoveredstyle={hoveredstyle}
                    onClick={handleOpen}
                >
                    <InfoOutlinedIcon style={{color: "#3570A2"}}/>
                </IconButton>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    <Box sx={style}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems={"center"}
                        >
                            <label style={{fontWeight: "600", fontSize: "16px"}}>
                                {props.item.phone_number}
                            </label>
                            <label style={{fontWeight: "600", fontSize: "16px"}}>
                                {props.item.user_full_name == "--------"
                                    ? "Näbelli müşderi"
                                    : props.item.user_full_name}
                            </label>{" "}
                            <IconButton
                                tooltip="Description here"
                                hoveredstyle={hoveredstyle}
                                onClick={handleClose}
                            >
                                <ClearIcon/>
                            </IconButton>
                        </Stack>
                        <Stack
                            direction={{xs: "column", sm: "row"}}
                            spacing={{xs: 1, sm: 2, md: 4}}
                            mt={3}
                            width="100%"
                        >
                            <Stack
                                direction="column"
                                style={{
                                    filter: "drop-shadow(0px 0px 10px rgba(129,129,129,0.15)",
                                }}
                                width="100%"
                            >
                                <Stack
                                    direction="row"
                                    style={{
                                        border: "1px solid #e2e2e2",
                                        background: "#f0eefc",
                                        borderRadius: "16px 16px 0px 0px",
                                    }}
                                    p={1}
                                    spacing={2}
                                >
                                    <label>Statusy :</label>
                                    <label>
                                        {props.item.user_status == null
                                            ? "Maglumat girizilmedik"
                                            : props.item.user_status}
                                    </label>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    p={1}
                                    style={{border: "1px solid #e2e2e2"}}
                                >
                                    <label>Ýaşaýan ýeri :</label>
                                    <label>
                                        {props.item.address_home == null
                                            ? "Maglumat girizilmedik"
                                            : props.item.address_home}
                                    </label>
                                </Stack>
                                <Stack
                                    direction="row"
                                    style={{
                                        border: "1px solid #e2e2e2",
                                        background: "#F0EEFC",
                                        borderRadius: "0px 0px 16px 16px",
                                    }}
                                    spacing={2}
                                    p={1}
                                >
                                    <label>Iş ýeri :</label>
                                    <label>
                                        {props.item.address_work == null
                                            ? "Maglumat girizilmedik"
                                            : props.item.address_work}
                                    </label>
                                </Stack>
                            </Stack>
                            <Stack width="100%">
                                <List
                                    sx={{
                                        width: "100%",
                                        bgcolor: "background.paper",
                                        position: "relative",
                                        overflow: "auto",
                                        maxHeight: 300,
                                        "& ul": {padding: 0},
                                    }}
                                    subheader={<li/>}
                                >
                                    <li>
                                        <ul style={{padding: "7px"}}>Jaňlar</ul>
                                        <hr/>
                                    </li>
                                    {" "}
                                    {props.item.call_history.map((call_item, index) => {
                                        return (
                                            <>
                                                <Stack
                                                    direction="row"
                                                    mt={2}
                                                    justifyContent={"space-between"}
                                                    p={1}
                                                >
                                                    <label>
                                                        {call_item.call_direction == 0
                                                            ? "Giriş jaň"
                                                            : "Çykyş jaň"}
                                                    </label>
                                                    <label>
                                                        {props.item.call_date.split("T")[0]} /
                                                        {call_item.call_time}
                                                    </label>
                                                    <label>{`${parseInt(
                                                        call_item.call_duration / 60
                                                    )} min, ${call_item.call_duration % 60} sek`}</label>
                                                </Stack>
                                                <hr/>
                                            </>
                                        );
                                    })}
                                </List>
                            </Stack>
                        </Stack>

                        {props.item.user_full_name == "--------"
                            ? <Stack
                                direction="row"
                                spacing={3}
                                justifyContent={"flex-end"}
                                mt={4}
                            >
                                <AddCustomerModal phone_number={props.item.phone_number}  getData={props.getData} />
                            </Stack>
                            :
                            <Stack
                                direction="row"
                                spacing={3}
                                justifyContent={"flex-end"}
                                mt={4}
                            >
                                <AddOrderModal user_unique_id={props.item.customer_unique_id} getData={props.getData} setPage={(page)=>{}}/>
                                {/*<CustomerUpdate*/}
                                {/*    item={props.item}*/}
                                {/*    fields={props.fields}*/}
                                {/*    getData={props.getData}*/}
                                {/*    which={"accept-call"}*/}
                                {/*/>*/}
                            </Stack>
                        }


                    </Box>
                </div>
            </Modal>
        </div>
    );
};

export default CallInfoModal;
