import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Edit } from "@mui/icons-material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState } from "react";
import { AxiosInstance, LocalAxiosInstance } from "../../api-interface/api/AxiosInstance.mjs";
import { showError, showSuccess } from "../Alert/Alert";
import { AppContext } from "../../App";

export default function ChangeOrderProductStatus(props) {
    const [open, setOpen] = React.useState(false);

    const [status, setStatus] = useState(props.item.order_product_status);
    const [reason, setReason] = useState('');

    const { online } = useContext(AppContext);


    const handleClickOpen = () => {
        setOpen(true);
        setStatus(props.item.order_product_status);
        setReason('');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateStatus = () => {
        let axios = online ? AxiosInstance : LocalAxiosInstance;
        axios.put('/operator/change-order-product-status', {
            order_product_unique_id: props.item.unique_id,
            status: status,
            reason: reason
        })
            .then(response => {
                if (!response.data.error) {
                    props.updateOldProductStatus(status, props.i, props.item);
                    showSuccess('Üýtgedildi!');
                    handleClose();
                } else {
                    showError('Ýalňyşlyk ýüze çykdy!');
                }
            })
            .catch(err => {
                showError(err);
            })
    }

    return (
        <div>
            <Button
                fullWidth={false}
                color={'warning'}
                onClick={handleClickOpen}
                variant={'contained'}
                startIcon={<Edit />}
            >
                Statusy üýtgetmek
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Haryt statusy</DialogTitle>
                <DialogContent>
                    <Select
                        id="demo-simple-select"
                        value={status}
                        fullWidth={true}
                        style={{
                            background: "#f0eefc",
                            border: "1px solid #5e9cce",
                            borderRadius: "16px",
                            height: "35px",
                        }}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <MenuItem value={"none"}>Täze sargyt</MenuItem>
                        <MenuItem value={"pending"}>Garaşylýar</MenuItem>
                        <MenuItem value={"courier-pending"}>
                            Eltip berijä ugradyldy
                        </MenuItem>
                        <MenuItem value={"courier-accepted"}>
                            Eltip beriji kabul etdi
                        </MenuItem>
                        <MenuItem value={"courier-delivered"}>
                            Eltip beriji eltip berdi
                        </MenuItem>
                        <MenuItem value={"delivered"}>Sargyt tamamlandy</MenuItem>
                        <MenuItem value={"rejected"}>Sargyt ýatyryldy</MenuItem>
                    </Select>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        label="Sebäbi"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Aýyr</Button>
                    <Button onClick={() => updateStatus()}>Ýatda saklat</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}