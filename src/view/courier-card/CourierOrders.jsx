import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {Box} from "@mui/system";
import HistoryIcon from '@mui/icons-material/History';
import {useContext, useState} from "react";
import {AppContext} from "../../App";
import {AxiosInstance, LocalAxiosInstance} from "../../api-interface/api/AxiosInstance.mjs";
import {showError} from "../Alert/Alert";
import {ToastContainer} from "react-toastify";
import {Stack, Step, StepLabel, Stepper} from "@mui/material";
import {orderStatus} from "../../common/constant.mjs";
import {convertTimeStampToDate, convertTimeStampToTime} from "../../common/utils.mjs";
import moment from "moment";
import Empty from "../../common/Empty";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CourierOrders(props) {
    const [open, setOpen] = React.useState(false);

    const {online} = useContext(AppContext);

    const [list,setList]=useState([]);

    const [ulist,setUList]=useState([]);

    const getUniqueList=(data)=>{
        let temp=[];
        data.forEach((e,i)=>{
            if(!temp.includes(convertTimeStampToDate(e.current_status))){
                temp.push(convertTimeStampToDate(e.current_status));
            }
        })
        return temp;
    }

    const handleClickOpen = () => {
        setOpen(true);
        let axios=online?AxiosInstance:LocalAxiosInstance;
        axios.get(`/operator/get-order-by-status?status=${orderStatus.COURIER_DELIVERED}&user_id=${props.unique_id}`)
            .then(result=>{
                setList(result.data.body);
                setUList(getUniqueList(result.data.body));
            })
            .catch(err=>{
                showError(err);
            })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getListByDate=(date)=>{
        return list.filter((e,i)=>convertTimeStampToDate(e.current_status)===date);
    }

    function isYesterday(date) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (yesterday.toDateString() === new Date(date).toDateString()) {
            return true;
        }
        return false;
    }

    function isToday(date) {
        const yesterday = new Date();
        if (yesterday.toDateString() === new Date(date).toDateString()) {
            return true;
        }
        return false;
    }

    const getLabel=(date)=>{
        if(isToday(date)){
            return 'Bu gün';
        } else if(isYesterday(date)){
            return 'Düýn';
        } else {
            return date;
        }
    }

    const datetimeDifference=(start,end)=>{
        let a=moment(new Date(start));
        let b=moment(new Date(end));
        let duration = moment.duration(b.diff(a));
        let hour=parseInt(duration.asMinutes()/60);
        console.log(`${start} / ${end} --- ${duration.asMinutes()}`);
        let minutes=parseInt(duration.asMinutes()%60);
        return `${hour>0?hour+' sag :':''}${minutes} min`
    }

    const orderByDesc=(array)=>{
        return array.sort(function compare(a, b) {
            var dateA = new Date(a);
            var dateB = new Date(b);
            return dateB - dateA;
          });
    }

    // React.useEffect(()=>{
    //     console.log(getListByDate(ee))
    // },[list]);

    return (
        <div>
            <ToastContainer/>
            <Button variant="text" startIcon={<HistoryIcon/>} onClick={handleClickOpen}>
                Sargytlar taryhy
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Sargytlar taryhy
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Aýyr
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box>
                    <Stack p={5}>
                        {
                            ulist.length<=0?
                                <Empty/>
                                :
                                orderByDesc(ulist).map((ee,ii)=>{
                                return(
                                    <div key={`steep_key${ii}`} style={{marginTop:'40px'}}>
                                        <Typography variant='h5'><b>{getLabel(ee)}</b></Typography>
                                        <br/>
                                        <Stepper activeStep={list!=null && list.length>0?list.length-1:0} orientation={'vertical'}>
                                            {
                                                getListByDate(ee).map((e,i)=>{
                                                    return(
                                                        <Step key={`stepper_key_${i}`}>
                                                            <StepLabel>
                                                                <Typography>
                                                                    {`${e.fullname} / ${e.phone_number} / ${convertTimeStampToTime(e.current_status)} ${i>0?'/ Aralyk: '+datetimeDifference(getListByDate(ee)[i-1].current_status,e.current_status):''}`}
                                                                </Typography>
                                                            </StepLabel>
                                                        </Step>
                                                    )
                                                })
                                            }
                                        </Stepper>
                                    </div>
                                )
                            })
                        }
                    </Stack>
                </Box>
            </Dialog>
        </div>
    );
}
