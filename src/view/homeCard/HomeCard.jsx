import React, {useState} from "react";
import "../../style/home/home.css";
import {Button, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import SyncPage from "../../layout/sync/SyncPage";

const HomeCard = (props) => {
    const [ip, setIp] = useState(localStorage.getItem('local_ip'));
    const save=()=>{
        localStorage.setItem('local_ip',ip);
    }
    return (
        <div className="homeCard">
            <Stack pt={5} direction="row" justifyContent="center">
                <label style={{fontSize: "24px", fontWeight: "600"}}>Hoş geldiňiz!</label>
            </Stack>
            <Stack pt={5} direction="row" justifyContent="center">
                <img src="./svg/homeLogo.svg" alt=""/>
            </Stack>
            <Stack
                direction="column"
                mt={3}
                justifyContent="center"
                ml={"35%"}
                width="35%"
            >
                <Stack
                    direction="row"
                    spacing={3}
                    p={1.5}
                    pl={2}
                    style={{
                        background: "#D5E4ED",
                        border: "1px solid ##D5E4ED",
                        boxShadow:
                            "2px 2px 6px rgba(116,150, 204, 0.5), -2px -2px 6px rgba(255,255,255,0.4)",
                        borderRadius: "32px",
                    }}
                >
                    <label>Doly ady :</label>
                    <label style={{fontWeight: "600"}}>{localStorage.getItem('fullname')}</label>
                </Stack>
                <Stack
                    direction="row"
                    spacing={3}
                    mt={3}
                    p={1.5}
                    pl={2}
                    style={{
                        background: "#D5E4ED",
                        border: "1px solid ##D5E4ED",
                        boxShadow:
                            "2px 2px 6px rgba(116,150, 204, 0.5), -2px -2px 6px rgba(255,255,255,0.4)",
                        borderRadius: "32px",
                    }}
                >
                    <label>Telefon belgisi :</label>
                    <label style={{fontWeight: "600"}}>{localStorage.getItem('phone_number')}</label>
                </Stack>
                <Stack
                    direction="column"
                    spacing={3}
                    mt={3}
                >
                    <TextField id="standard-basic" fullWidth={true} label="IP salgysy" variant="standard"
                        value={ip} onChange={e=>setIp(e.target.value)}/>

                    <Button variant={"contained"} onClick={()=>save()}>Ýatda saklat</Button>

                    {props.isSync?
                        <SyncPage getData={()=>{props.setIsSync(false)}} open={true} autorun={true}/>
                        :
                        null
                    }

                </Stack>
            </Stack>
        </div>
    );
};

export default HomeCard;
