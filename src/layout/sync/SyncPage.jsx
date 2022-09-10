import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box } from "@mui/system";
import SyncIcon from '@mui/icons-material/Sync';
import { Stack } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import LinearProgress from '@mui/material/LinearProgress';
import { AppContext } from "../../App";
import { AxiosInstance, LocalAxiosInstance } from "../../api-interface/api/AxiosInstance.mjs";
import { syncDirection, tables } from "../../common/constant.mjs";

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SyncPage(props) {
    // UI constants
    const [open, setOpen] = React.useState(typeof props.open !== 'undefined' && props.open != null ? props.open : false);
    const [disabled, setDisabled] = useState(typeof props.autorun !== 'undefined' && props.autorun != null ? props.autorun : false);
    const [running, setRunning] = useState(typeof props.autorun !== 'undefined' && props.autorun != null ? props.autorun : false);
    const [error, setError] = useState(false);
    const [label, setLabel] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    // Business logic

    const { online } = useContext(AppContext);

    const [data, setData] = useState([]);
    const [isOnline, setIsOnline] = useState(false);

    const showError = (text) => {
        setError(true);
        setRunning(false);
        setDisabled(false);
        setLabel(`${text}`);
    }

    const showSuccess = () => {
        setError(false);
        setRunning(false);
        setDisabled(false);
        setLabel(`Maglumatlar üstünlikli ugradyldy we kabul edildi!`);
        props.getData();
    }

    const getOnlyUniqueId = (values) => {
        let res = [];
        values.forEach((e, i) => {
            res.push(e.unique_id);
        })
        return res;
    }

    const getNotExistValues = (ids, values) => {
        return values.filter((e, i) => !ids.includes(e.unique_id));
    }

    const checkByUniqueId = (ids, type, values, direction) => {
        return new Promise((resolve, reject) => {
            if (ids.length > 0) {
                let axios = direction === syncDirection.OFFLINE_TO_ONLINE ? AxiosInstance : LocalAxiosInstance;
                axios.post("/operator/check-by-unique-id", {
                    ids: ids,
                    type: type
                })
                    .then(result => {
                        resolve(getNotExistValues(getOnlyUniqueId(result.data.body.ids), values));
                    })
                    .catch(err => {
                        reject(err);
                    })
            } else {
                resolve(values);
            }
        })
    }

    const valueChecker = (values, type, direction) => {
        let ids = getOnlyUniqueId(values);
        return checkByUniqueId(ids, type, values, direction);
    }

    const sendData = (values, type, direction) => {
        console.log(direction);
        return new Promise((resolve, reject) => {
            let axios = direction === syncDirection.OFFLINE_TO_ONLINE ? AxiosInstance : LocalAxiosInstance;
            axios.post('/operator/insert-values', {
                values: values,
                type: type
            })
                .then(result => {
                    resolve(result.data.body);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }


    const getOrders = (vls, direction) => {
        let axios = direction === syncDirection.OFFLINE_TO_ONLINE ? LocalAxiosInstance : AxiosInstance;
        axios.get(`/operator/get-all-orders?sell_point_id=${localStorage.getItem('sell_point_id')}`)
            .then(result => {
                if (!result.data.body.error) {
                    let k = [
                        {
                            values: result.data.body.orders,
                            type: tables.customer_order
                        },
                        {
                            values: result.data.body.address,
                            type: tables.customer_order_address_history
                        },
                        {
                            values: result.data.body.courier,
                            type: tables.customer_order_courier_history
                        },
                        {
                            values: result.data.body.dates,
                            type: tables.customer_order_date_history
                        },
                        {
                            values: result.data.body.delivery_price,
                            type: tables.customer_order_delivery_price
                        },
                        {
                            values: result.data.body.location,
                            type: tables.customer_order_location_history
                        },
                        {
                            values: result.data.body.products,
                            type: tables.customer_order_product
                        },
                        {
                            values: result.data.body.phone_calls,
                            type: tables.phone_call
                        },
                        {
                            values: result.data.body.product_status,
                            type: tables.customer_order_product_status_history
                        },
                        {
                            values: result.data.body.order_status,
                            type: tables.customer_order_status_history
                        }
                    ];
                    k.forEach((e, i) => {
                        if (direction === syncDirection.OFFLINE_TO_ONLINE) {
                            valueChecker(e.values, e.type, direction)
                                .then(result2 => {
                                    vls.push({
                                        values: result2,
                                        type: e.type
                                    })
                                    if (e.type === tables.customer_order_status_history) {
                                        setLabel("Offline maglumatlar ugradylýar...")
                                        vls.forEach((e, i) => {
                                            if (typeof e.values !== 'undefined' && e.values != null && e.values.length > 0) {
                                                sendData(e.values, e.type, direction)
                                                    .then(result3 => {
                                                        if (e.type === tables.customer_order_status_history) {
                                                            setIsOnline(true);
                                                        }
                                                        console.log(result3);
                                                    })
                                                    .catch(err => {
                                                        showError(err);
                                                    })
                                            } else {
                                                if (e.type === tables.customer_order_status_history) {
                                                    setIsOnline(true);
                                                }
                                            }
                                        })
                                    }
                                })
                                .catch(err => {
                                    showError(err);
                                })
                        } else {
                            vls.push({
                                values: e.values,
                                type: e.type
                            })


                            if (e.type === tables.customer_order_status_history) {
                                setLabel("Online maglumatlar ýüklenýär...")
                                console.log(vls.length);
                                vls.forEach((e, i) => {
                                    if (typeof e.values !== 'undefined' && e.values != null && e.values.length > 0) {
                                        truncateTable(e.type)
                                            .then(result11 => {
                                                sendData(e.values, e.type, direction)
                                                    .then(result3 => {
                                                        if (e.type === tables.customer_order_status_history) {
                                                            setIsOnline(false);
                                                            showSuccess();
                                                        }
                                                    })
                                                    .catch(err => {
                                                        showError(err);
                                                    })
                                            })
                                            .catch(err => {
                                                showError(err);
                                            })
                                    } else {
                                        if (e.type === tables.customer_order_status_history) {
                                            setIsOnline(false);
                                            showSuccess();
                                        }
                                    }
                                })
                            }


                        }
                    })
                } else {
                    showError(result.status);
                }
            })
            .catch(err => {
                showError(err);
            })
    }


    const truncateTable = (type) => {
        return new Promise((resolve, reject) => {
            LocalAxiosInstance.post('/operator/clear-values', {
                type: type
            })
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }


    const offlineToOnline = () => {
        setLabel("Offline maglumatlar barlanýar...")
        LocalAxiosInstance.get(`/operator/get-all-customers?sell_point_id=${localStorage.getItem('sell_point_id')}`)
            .then(async result => {
                if (!result.data.body.error) {

                    let vls = [];
                    valueChecker(result.data.body.customers, tables.customer, syncDirection.OFFLINE_TO_ONLINE)
                        .then(result2 => {
                            vls.push({
                                values: result2,
                                type: tables.customer
                            })
                            valueChecker(result.data.body.customers_interested_products, tables.customer_interested_product, syncDirection.OFFLINE_TO_ONLINE)
                                .then(result3 => {
                                    vls.push({
                                        values: result3,
                                        type: tables.customer_interested_product
                                    })
                                    valueChecker(result.data.body.inbox, tables.inbox, syncDirection.OFFLINE_TO_ONLINE)
                                        .then(result4 => {
                                            vls.push({
                                                values: result4,
                                                type: tables.inbox
                                            })
                                            getOrders(vls, syncDirection.OFFLINE_TO_ONLINE);
                                        })
                                        .catch(err => {
                                            showError(err);
                                        })
                                })
                                .catch(err => {
                                    showError(err);
                                })
                        })
                        .catch(err => {
                            showError(err);
                        })
                } else {
                    showError(result.status);
                }
            })
            .catch(err => {
                showError(err);
            })
    }


    const onlineToOffline = () => {
        setLabel("Online maglumatlar barlanýar...")
        AxiosInstance.get(`/operator/get-all-customers?sell_point_id=${localStorage.getItem('sell_point_id')}`)
            .then(async result => {
                if (!result.data.body.error) {

                    let k = [
                        {
                            values: result.data.body.customers,
                            type: tables.customer
                        },
                        {
                            values: result.data.body.customers_interested_products,
                            type: tables.customer_interested_product
                        },
                        {
                            values: result.data.body.user_role,
                            type: tables.user_role
                        },
                        {
                            values: result.data.body.speak_tone,
                            type: tables.speak_tone
                        },
                        {
                            values: result.data.body.speak_mode,
                            type: tables.speak_mode
                        },
                        {
                            values: result.data.body.sell_point,
                            type: tables.sell_point
                        },
                        {
                            values: result.data.body.role_permission,
                            type: tables.role_permission
                        },
                        {
                            values: result.data.body.inbox,
                            type: tables.inbox
                        },
                        {
                            values: result.data.body.focus_word,
                            type: tables.focus_word
                        },
                        {
                            values: result.data.body.customer_status,
                            type: tables.customer_status
                        },
                        {
                            values: result.data.body.cancel_reason,
                            type: tables.cancel_reason
                        },
                        {
                            values: result.data.body.courier,
                            type: tables.courier
                        },
                        {
                            values: result.data.body.users,
                            type: tables.users
                        }
                    ];

                    let vls = [];

                    k.forEach((e, i) => {
                        vls.push({
                            values: e.values,
                            type: e.type
                        })
                        if (e.type === tables.users) {
                            getOrders(vls, syncDirection.ONLINE_TO_OFFLINE);
                        }
                    })

                } else {
                    showError(result.status);
                }
            })
            .catch(err => {
                showError(err);
            })
    }

    const handleStart = () => {
        setDisabled(true);
        setRunning(true);
        setError(false);
        offlineToOnline();
    }

    useEffect(() => {
        if (isOnline) {
            onlineToOffline()
        }
    }, [isOnline]);

    useEffect(() => {
        if (typeof props.autorun !== 'undefined' && props.autorun != null && props.autorun) {
            handleStart();
        }
    }, []);


    return (
        <div>
            <Button variant="outlined" sx={{ mr: 2 }} startIcon={<SyncIcon />} onClick={handleClickOpen}>
                Sync
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
                            disabled={disabled}
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Maglumatlary ugratmak / almak
                        </Typography>
                        <Button autoFocus color="inherit" disabled={disabled} onClick={handleClose}>
                            Aýyr
                        </Button>
                    </Toolbar>
                </AppBar>
                <div>
                    <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Player
                            autoplay
                            loop
                            src={error ? "/error.json" : running ? "/sync-running.json" : "/sync-start.json"}
                            style={{ height: '200px', width: '200px', marginTop: '100px', marginBottom: '40px' }}
                        >
                        </Player>
                        <Typography sx={{ mb: 2 }}>{label}</Typography>
                        {
                            running && !error ?
                                <Box sx={{ width: '50%' }}>
                                    <LinearProgress color="primary" />
                                </Box>
                                :
                                null
                        }

                        {
                            running ? null :
                                <Button startIcon={<SyncIcon />} onClick={() => handleStart()} variant={'contained'}
                                    fullWidth={false}>
                                    Ugratmak
                                </Button>
                        }
                    </Stack>
                </div>
            </Dialog>
        </div>
    );
}
