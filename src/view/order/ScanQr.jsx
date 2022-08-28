import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton} from "@mui/material";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import {Player} from "@lottiefiles/react-lottie-player";

export default function ScanQr(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const search=()=>{
        props.getData();
        handleClose();
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <QrCodeScannerIcon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Qr kod boýunça gözleg</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sargydyň hasap fakturasyndaky QR kody skanere ýakynlaşdyryň we gözleg düwmesine basyň
                    </DialogContentText>

                    <Player
                        autoplay
                        loop
                        src={"/scan.json"}
                        style={{height: '200px', width: '200px', marginTop: '10px', marginBottom: '10px'}}
                    >
                    </Player>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Skanirlenen kod"
                        type="text"
                        onChange={e=>props.setSearch(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Aýyr</Button>
                    <Button onClick={search}>Gözleg</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
