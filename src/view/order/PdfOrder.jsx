import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ReactToPrint from "react-to-print";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PrintIcon from '@mui/icons-material/Print';
import App from "../../App";
import PdfChild from "./PdfChild";
import { Print } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const PdfOrder = (props) => {
    const componentRef = useRef();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getPageStyle = () => {
        return '@page { size: A3; margin: 0mm; background:white !important; color: black !important;} ' +
            '@media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; ' +
            'background:white !important; color: black !important;} }';
    }

    return (
        <div>
            <Button startIcon={<Print />} onClick={handleClickOpen} variant={'contained'}>
                Hasap fakturasy
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Maglumaty
                        </Typography>
                        <ReactToPrint
                            trigger={() => {
                                return <Button color={'secondary'} startIcon={<PrintIcon />} color={'inherit'} onClick={() => {
                                }}>Çap et</Button>
                            }}
                            content={() => componentRef.current}
                            documentTitle='new document'
                            pageStyle={getPageStyle()}
                        />
                    </Toolbar>
                </AppBar>
                <div>
                    <PdfChild componentRef={componentRef} courier={props.courier} item={props.item} address={props.address} delivery_price={props.delivery_price} />
                </div>
            </Dialog>
        </div>
    )
}

export default PdfOrder;