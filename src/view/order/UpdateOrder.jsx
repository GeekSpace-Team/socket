import React, {useContext, useEffect, useState} from "react";
import {
    Autocomplete,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    Stack,
    TextField,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {AxiosInstance, LocalAxiosInstance} from "../../api-interface/api/AxiosInstance.mjs";
import {showError, showSuccess} from "../Alert/Alert.jsx";
import Map from "./MapLocation.jsx";
import MapLocation from "./MapLocation.jsx";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {ToastContainer} from "react-toastify";
import {convertTimeStampToDate, convertTimeStampToTime} from "../../common/utils.mjs";
import {AppContext} from "../../App.js";
import EditIcon from "@mui/icons-material/Edit";
import {orderStatus, translateStatus} from "../../common/constant.mjs";
import {Edit} from "@mui/icons-material";
import ChangeOrderProductStatus from "./ChangeOrderProductStatus";
import PlaceChange from "./PlaceChange";
import DateAndTime from "./DateAndTime";
import DeliveredPrice from "./DeliveredPrice";
import Courier from "./Courier";
import Status from "./Status";

const style = {
    position: "absolute",
    // transform: "translate(-50%, -50%)",
    width: "100%",
    height: "99%",
    overflow: "scroll",
    display: "block",
    bgcolor: "#FAFCFB",
    boxShadow: 24,
    p: 4,
};

const UpdateOrder = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);

    const [is_express, setIs_express] = useState(props.item.is_express);
    const [additional_information, setAdditional_information] = useState(props.item.additional_information);
    const [customer_unique_id, setCustomer_unique_id] = useState(props.item.customer_unique_id);

    const {allCustomer} = useContext(AppContext);
    const {couriers} = useContext(AppContext);
    const [value, setValue] = useState("");
    const [home, setHome] = useState("");
    const [work, setWork] = useState("");
    const [products, setProducts] = useState([]);
    const [oldProducts, setOldProducts] = useState([]);

    // Lists
    const [address_history,setAddress_history]=useState(props.item.address_history);
    const [courier_history,setCourier_history]=useState(props.item.courier_history);
    const [date_history,setDate_history]=useState(props.item.date_history);
    const [delivery_price_history,setDelivery_price_history]=useState(props.item.delivery_price_history);
    const [location_history,setLocation_history]=useState(props.item.location_history);
    const [status_history,setStatus_history]=useState(props.item.status_history);
    const {online}=useContext(AppContext);

    const handleOpen = () => {
        setOpen(true);
        getOrderProductHistory(props.item.unique_id);
        setIs_express(props.item.is_express);
        setAdditional_information(props.item.additional_information);
        setCustomer_unique_id(props.item.customer_unique_id);
        setAddress_history(props.item.address_history);
        setCourier_history(props.item.courier_history);
        setDate_history(props.item.date_history);
        setDelivery_price_history(props.item.delivery_price_history);
        setLocation_history(props.item.location_history);
        setStatus_history(props.item.status_history);
    };


    const checkUserUnqiueId = () => {
        try {
            let temp = allCustomer.filter((item, i) => item.unique_id == props.item.customer_unique_id);
            setValue(temp[0]);
        } catch (err) {
        }
    }

    useEffect(() => {
        checkUserUnqiueId();
    }, []);

    const hoveredstyle = {
        cursor: "initial",
    };

    const getOrderProductHistory = (unique_id) => {
        let axios=online?AxiosInstance:LocalAxiosInstance;
        axios.get('/operator/get-order-product-history?order_unique_id=' + unique_id)
            .then(response => {
                if (!response.data.error) {
                    setOldProducts(response.data.body);
                }
            })
            .catch(err => {
            })
    }

    useEffect(() => {
        try {
            setHome(value.address_home);
            setWork(value.address_work);
        } catch (err) {
            console.log(err);
        }
    }, [value]);

    useEffect(()=>{
        console.log(address_history);
    },[address_history]);


    const clearData = () => {
        setIs_express(false);
        setAdditional_information("");
        setCustomer_unique_id("");
        setValue("");
        setHome("");
        setWork("");
        setProducts([
            {
                product_name: "",
                product_brand: "",
                product_model: "",
                product_artikul_code: "",
                product_debt_price: 0,
                product_cash_price: 0,
                product_discount: 0,
                product_size: "",
                product_color: "",
                product_count: 1,
            },
        ]);
    }


    const updateProductName = (value, index, item) => {
        let newItem = item;
        newItem.product_name = value;
        const newArray = [
            ...products.slice(0, index),
            newItem,
            ...products.slice(index + 1),
        ];

        setProducts(newArray);
    };

    const updateProductBrand = (value, index, item) => {
        let newItem = item;
        newItem.product_brand = value;
        const newArray = [
            ...products.slice(0, index),
            newItem,
            ...products.slice(index + 1),
        ];

        setProducts(newArray);
    };

    const updateProductModel = (value, index, item) => {
        let newItem = item;
        newItem.product_model = value;
        const newArray = [
            ...products.slice(0, index),
            newItem,
            ...products.slice(index + 1),
        ];

        setProducts(newArray);
    };

    const updateProductArticulCode = (value, index, item) => {
        let newItem = item;
        newItem.product_artikul_code = value;
        const newArray = [
            ...products.slice(0, index),
            newItem,
            ...products.slice(index + 1),
        ];

        setProducts(newArray);
    };

    const updateProductDebtPrice = (value, index, item) => {
        let newItem = item;
        newItem.product_debt_price = value;
        const newArray = [
            ...products.slice(0, index),
            newItem,
            ...products.slice(index + 1),
        ];

        setProducts(newArray);
    };

    const updateProductCashPrice = (value, index, item) => {
        let newItem = item;
        newItem.product_cash_price = value;
        const newArray = [
            ...products.slice(0, index),
            newItem,
            ...products.slice(index + 1),
        ];

        setProducts(newArray);
    };

    const updateProductDiscount = (value, index, item) => {
        let newItem = item;
        newItem.product_discount = value;
        const newArray = [
            ...products.slice(0, index),
            newItem,
            ...products.slice(index + 1),
        ];

        setProducts(newArray);
    };

    const updateProductSize = (value, index, item) => {
        let newItem = item;
        newItem.product_size = value;
        const newArray = [
            ...products.slice(0, index),
            newItem,
            ...products.slice(index + 1),
        ];

        setProducts(newArray);
    };

    const updateProductColor = (value, index, item) => {
        let newItem = item;
        newItem.product_color = value;
        const newArray = [
            ...products.slice(0, index),
            newItem,
            ...products.slice(index + 1),
        ];

        setProducts(newArray);
    };

    const updateProductCount = (value, index, item) => {
        let newItem = item;
        newItem.product_count = value;
        const newArray = [
            ...products.slice(0, index),
            newItem,
            ...products.slice(index + 1),
        ];

        setProducts(newArray);
    };

    const updateOldProductStatus = (value, index, item) => {
        let newItem = item;
        newItem.order_product_status = value;
        const newArray = [
            ...oldProducts.slice(0, index),
            newItem,
            ...oldProducts.slice(index + 1),
        ];

        setOldProducts(newArray);
    };

    const updateProductStatus = (value, index, item) => {
        let newItem = item;
        newItem.order_product_status = value;
        const newArray = [
            ...products.slice(0, index),
            newItem,
            ...products.slice(index + 1),
        ];

        setProducts(newArray);
    };

    const addProduct = () => {
        const newArray = [
            ...products.slice(0, products.length),
            {
                product_name: "",
                product_brand: "",
                product_model: "",
                product_artikul_code: "",
                product_debt_price: 0,
                product_cash_price: 0,
                product_discount: 0,
                product_size: "",
                product_color: "",
                product_count: 1,
                order_product_status: orderStatus.NONE
            },
        ];
        setProducts(newArray);
    };


    const removeByIndex = (index) => {
        let temp = products.filter((item, i) => i != index);
        setProducts(temp);
    }

    const updateOrder = () => {
        const data = {
            order_unique_id: props.item.unique_id,
            customer_unique_id: customer_unique_id,
            info: additional_information,
            is_express: is_express,
            products: products
        };
        let axios=online?AxiosInstance:LocalAxiosInstance;
        axios.put('/operator/change-order-product', data)
            .then(response => {
                if (!response.data.error) {
                    showSuccess('Üýtgedildi!');
                    props.getData();
                } else {
                    showError('Ýalňyşlyk ýüze çykdy!');
                }
            })
            .catch(err => {
                showError(err);
            })
    }

    const checkList=(list)=>{
        try{
            let t=list[0];
            return true;
        } catch (err){
            return false;
        }
    }

    const addAddressHistory=(item)=>{
        try{
            let temp=[
                {
                    res: item,
                    operator: localStorage.getItem("fullname"),
                    courier: null
                },
                ...address_history
            ];
            setAddress_history(temp);
        } catch(err){
            let temp=[
                {
                    res: item,
                    operator: localStorage.getItem("fullname"),
                    courier: null
                }
            ];
            setAddress_history(temp);
        }
        
    }

    const addLocationHistory=(item)=>{
        try{
            let temp=[
                {
                    res: item,
                    operator: localStorage.getItem("fullname"),
                    courier: null
                },
                ...location_history
            ]
            setLocation_history(temp);
        } catch(err){
            let temp=[
                {
                    res: item,
                    operator: localStorage.getItem("fullname"),
                    courier: null
                }
            ]
            setLocation_history(temp);
        }
    }
    const addDateHistory=(item)=>{
        try{
            let temp=[
                {
                    res: item,
                    operator: localStorage.getItem("fullname"),
                    courier: null
                },
                ...date_history
            ]
            setDate_history(temp);
        } catch(err){
            let temp=[
                {
                    res: item,
                    operator: localStorage.getItem("fullname"),
                    courier: null
                }
            ]
            setDate_history(temp);
        }
    }
    const addPriceHistory=(item)=>{
        try{
            let temp=[
                {
                    res: item,
                    operator: localStorage.getItem("fullname"),
                    courier: null
                },
                ...delivery_price_history
            ]
            setDelivery_price_history(temp);
        } catch(err){
            let temp=[
                {
                    res: item,
                    operator: localStorage.getItem("fullname"),
                    courier: null
                }
            ]
            setDelivery_price_history(temp);
        }
    }
    const addCourierHistory=(item,name)=>{
        try{
            let temp=[
                {
                    res: item,
                    operator: localStorage.getItem("fullname"),
                    courier: name
                },
                ...courier_history
            ]
            setCourier_history(temp);
        } catch(err){
            let temp=[
                {
                    res: item,
                    operator: localStorage.getItem("fullname"),
                    courier: name
                }
            ]
            setCourier_history(temp);
        }
    }
    const addStatusHistory=(item)=>{
        try{
            let temp=[
                ...status_history,
                {
                    res: item,
                    operator: localStorage.getItem("fullname"),
                    courier: null
                }
            ]
            setStatus_history(temp);
        } catch(err){
            let temp=[
                {
                    res: item,
                    operator: localStorage.getItem("fullname"),
                    courier: null
                }
            ]
            setStatus_history(temp);
        }
    }

    const getDesc=(list)=>{
        try{
            let temp=[];
            for(let i=list.length-1;i>=0;i--){
                temp.push(list[i]);
            }
            return temp;
        } catch (err){
            return [];
        }
    }

    const getValue=(value)=>{
        try{
            return value;
        } catch (err){
            return '';
        }
    }


    return (
        <div>

            <Button startIcon={<EditIcon/>} color={'warning'} variant={'contained'} onClick={handleOpen}>
                Üýtgetmek
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="SGMtitle">
                        <Stack direction="row" spacing={3}>
                            <label>{convertTimeStampToDate(new Date())}</label>
                            <label>{convertTimeStampToTime(new Date())}</label>
                        </Stack>
                        <label style={{fontWeight: "600"}}>Sargydy üýtgetmek</label>
                    </div>
                    <div className="MGbutton">
                        <IconButton
                            onClick={handleClose}
                            tooltip="Description here"
                            hoveredstyle={hoveredstyle}
                        >
                            <ClearIcon style={{color: "#B1B1B1", cursor: "pointer"}}/>
                        </IconButton>
                    </div>
                    <Stack
                        direction={{xs: "column", sm: "row"}}
                        spacing={{xs: 1, sm: 2, md: 4}}
                        mt={3}
                    >
                        <Stack direction="column" spacing={1.5} width="100%">
                            <Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                options={allCustomer}
                                id="disable-close-on-select"
                                disableCloseOnSelect
                                getOptionLabel={(option) => `${option.fullname} / ${option.phone_number}`}
                                width="100%"
                                renderInput={(params) => (
                                    <TextField {...params} label="Ady" variant="standard"/>
                                )}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction="column" mt={3} spacing={1.5} width="100%">
                        <Stack direction="row" spacing={3} width="100%">
                            <label>Goşmaça bellikler:</label>
                            <input
                                type="text"
                                value={additional_information}
                                onChange={(e) => setAdditional_information(e.target.value)}
                                style={{
                                    outline: "none",
                                    border: "none",
                                    background: "transparent",
                                    width: "70%",
                                }}
                            />
                        </Stack>
                        <hr/>

                        <Stack width="100%">
                            <FormControlLabel control={<Checkbox checked={is_express}
                                                                 onChange={e => setIs_express(e.target.checked)}/>}
                                              label="Çalt eltip bermek hyzmaty barmy"/>
                        </Stack>
                    </Stack>
                    {oldProducts.map((item, i) => {
                        return (
                            <div className="AOharytBarada" key={`add_order_key${i}`}>
                                <Stack direction="row" mt={1} justifyContent={"center"} alignItems={'center'}>
                                    <label style={{fontWeight: "600"}}>Haryt barada</label>

                                </Stack>
                                <Stack
                                    direction={{xs: "column", sm: "row"}}
                                    spacing={{xs: 1, sm: 2, md: 4}}
                                    mt={3}
                                >
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Görnüşi:</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={item.product_name}
                                            onChange={(e) =>
                                                updateProductName(e.target.value, i, item)
                                            }
                                        />
                                    </Stack>
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Markasy:</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={item.product_brand}
                                            onChange={(e) =>
                                                updateProductBrand(e.target.value, i, item)
                                            }
                                        />
                                    </Stack>
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Artikuly:</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={item.product_artikul_code}
                                            onChange={(e) =>
                                                updateProductArticulCode(e.target.value, i, item)
                                            }
                                        />
                                    </Stack>

                                </Stack>
                                <Stack
                                    direction={{xs: "column", sm: "row"}}
                                    spacing={{xs: 1, sm: 2, md: 4}}
                                    mt={1.5}
                                >
                                    <Stack direction="row" mt={2} width="100%" spacing={5}>
                                        <Stack width="100%" direction="column" spacing={1}>
                                            <label>Nagt:</label>
                                            <input
                                                type="number"
                                                disabled
                                                value={item.product_cash_price}
                                                onChange={(e) =>
                                                    updateProductCashPrice(e.target.value, i, item)
                                                }
                                                placeholder="Nagt ..."
                                            />
                                        </Stack>
                                        <Stack width="100%" direction="column" spacing={1}>
                                            <label>Garaşaryna:</label>
                                            <input type="number" placeholder="Garasaryna ..."
                                                   value={item.product_debt_price}
                                                   disabled
                                                   onChange={(e) =>
                                                       updateProductDebtPrice(e.target.value, i, item)
                                                   }
                                            />
                                        </Stack>
                                        <Stack width="100%" mt={2} direction="column" spacing={1}>
                                            <label>Arzanladyş:</label>
                                            <input
                                                type="text"
                                                value={item.product_discount}
                                                disabled
                                                onChange={(e) =>
                                                    updateProductDiscount(e.target.value, i, item)
                                                }
                                            />
                                        </Stack>

                                    </Stack>

                                </Stack>
                                <Stack
                                    direction={{xs: "column", sm: "row"}}
                                    spacing={{xs: 1, sm: 2, md: 4}}
                                    alignItems="center"
                                    mt={2}
                                    justifyContent={"space-between"}
                                >
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Modeli:</label>
                                        <input
                                            type="text"
                                            value={item.product_model}
                                            disabled
                                            onChange={(e) =>
                                                updateProductModel(e.target.value, i, item)
                                            }
                                        />
                                    </Stack>
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Ölçegi:</label>
                                        <input
                                            type="number"
                                            disabled
                                            value={item.product_size}
                                            onChange={(e) =>
                                                updateProductSize(e.target.value, i, item)
                                            }
                                        />
                                    </Stack>
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Reňki:</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={item.product_color}
                                            onChange={(e) =>
                                                updateProductColor(e.target.value, i, item)
                                            }
                                        />
                                    </Stack>
                                </Stack>
                                <Stack
                                    direction={{xs: "column", sm: "row"}}
                                    spacing={{xs: 1, sm: 2, md: 4}}
                                    alignItems="center"
                                    mt={2}
                                >
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Haryt sany:</label>
                                        <input
                                            type="number"
                                            min="1"
                                            disabled
                                            value={item.product_count}
                                            onChange={(e) =>
                                                updateProductCount(e.target.value, i, item)
                                            }
                                        />
                                    </Stack>
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Haryt statusy:</label>
                                        <Select
                                            id="demo-simple-select"
                                            value={item.order_product_status}
                                            disabled
                                            style={{
                                                background: "#f0eefc",
                                                border: "1px solid #5e9cce",
                                                borderRadius: "16px",
                                                height: "35px",
                                            }}
                                            onChange={(e) =>
                                                updateOldProductStatus(e.target.value, i, item)
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
                                    </Stack>
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Haryt statusy üýtgetmek:</label>
                                        <ChangeOrderProductStatus i={i} item={item}
                                                                  updateOldProductStatus={updateOldProductStatus}/>
                                    </Stack>
                                </Stack>

                            </div>
                        );
                    })}
                    {products.map((item, i) => {
                        return (
                            <div className="AOharytBarada" key={`add_order_key${i}`}>
                                <Button endIcon={<RemoveCircleOutlineIcon/>} color={'error'} sx={{float: 'right'}}
                                        onClick={() => removeByIndex(i)}>Aýyr</Button>
                                <Stack direction="row" mt={1} justifyContent={"center"} alignItems={'center'}>
                                    <label style={{fontWeight: "600"}}>Haryt barada</label>

                                </Stack>
                                <Stack
                                    direction={{xs: "column", sm: "row"}}
                                    spacing={{xs: 1, sm: 2, md: 4}}
                                    mt={3}
                                >
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Görnüşi:</label>
                                        <input
                                            type="text"
                                            value={item.product_name}
                                            onChange={(e) =>
                                                updateProductName(e.target.value, i, item)
                                            }
                                        />
                                    </Stack>
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Markasy:</label>
                                        <input
                                            type="text"
                                            value={item.product_brand}
                                            onChange={(e) =>
                                                updateProductBrand(e.target.value, i, item)
                                            }
                                        />
                                    </Stack>
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Artikuly:</label>
                                        <input
                                            type="text"
                                            value={item.product_artikul_code}
                                            onChange={(e) =>
                                                updateProductArticulCode(e.target.value, i, item)
                                            }
                                        />
                                    </Stack>

                                </Stack>
                                <Stack
                                    direction={{xs: "column", sm: "row"}}
                                    spacing={{xs: 1, sm: 2, md: 4}}
                                    mt={1.5}
                                >
                                    <Stack direction="row" mt={2} width="100%" spacing={5}>
                                        <Stack width="100%" direction="column" spacing={1}>
                                            <label>Nagt:</label>
                                            <input
                                                type="number"
                                                value={item.product_cash_price}
                                                onChange={(e) =>
                                                    updateProductCashPrice(e.target.value, i, item)
                                                }
                                                placeholder="Nagt ..."
                                            />
                                        </Stack>
                                        <Stack width="100%" direction="column" spacing={1}>
                                            <label>Garaşaryna:</label>
                                            <input type="number" placeholder="Garasaryna ..."
                                                   value={item.product_debt_price}
                                                   onChange={(e) =>
                                                       updateProductDebtPrice(e.target.value, i, item)
                                                   }
                                            />
                                        </Stack>
                                        <Stack width="100%" mt={2} direction="column" spacing={1}>
                                            <label>Arzanladyş:</label>
                                            <input
                                                type="text"
                                                value={item.product_discount}
                                                onChange={(e) =>
                                                    updateProductDiscount(e.target.value, i, item)
                                                }
                                            />
                                        </Stack>

                                    </Stack>

                                </Stack>
                                <Stack
                                    direction={{xs: "column", sm: "row"}}
                                    spacing={{xs: 1, sm: 2, md: 4}}
                                    alignItems="center"
                                    mt={2}
                                    justifyContent={"space-between"}
                                >
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Modeli:</label>
                                        <input
                                            type="text"
                                            value={item.product_model}
                                            onChange={(e) =>
                                                updateProductModel(e.target.value, i, item)
                                            }
                                        />
                                    </Stack>
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Ölçegi:</label>
                                        <input
                                            type="number"
                                            value={item.product_size}
                                            onChange={(e) =>
                                                updateProductSize(e.target.value, i, item)
                                            }
                                        />
                                    </Stack>
                                    <Stack width="100%" direction="column" spacing={1}>
                                        <label>Reňki:</label>
                                        <input
                                            type="text"
                                            value={item.product_color}
                                            onChange={(e) =>
                                                updateProductColor(e.target.value, i, item)
                                            }
                                        />
                                    </Stack>
                                </Stack>
                                <Stack
                                    direction={{xs: "column", sm: "row"}}
                                    spacing={{xs: 1, sm: 2, md: 4}}
                                    alignItems="center"
                                    mt={2}
                                >
                                    <Stack width="32%" direction="column" spacing={1}>
                                        <label>Haryt sany:</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.product_count}
                                            onChange={(e) =>
                                                updateProductCount(e.target.value, i, item)
                                            }
                                        />
                                    </Stack>
                                </Stack>

                            </div>
                        );
                    })}
                    <Stack direction="row" alignItems={"center"}>
                        <Button onClick={addProduct} sx={{color: "#5E9CCE"}} endIcon={<AddCircleOutlineIcon/>}>
                            Haryt goş
                        </Button>
                    </Stack>
                    <br/>


                    {/* Eltip bermeli yeri */}
                    <div className="eltipBermeli">
                        <label>Eltip bermeli salgysy:</label>
                        {
                            checkList(address_history)?
                            getDesc(address_history).map((e, i) => {
                                return (
                                    <Stack direction="column" spacing={1.5} mb={2}
                                           key={`address_key${i}`}
                                           style={{opacity: i !== address_history.length - 1 ? '0.3' : '1'}}>
                                        <Stack
                                            direction={{xs: "column", sm: "row"}}
                                            spacing={{xs: 1, sm: 2, md: 4}}
                                            mt={1}
                                        >
                                            <Stack width="100%">
                                                <input
                                                    type="text"
                                                    disabled
                                                    value={e.res.address}
                                                />
                                            </Stack>
                                        </Stack>

                                        <Stack mb={1}>
                                            <label
                                                style={{color: "#3570A2", fontWeight: "600"}}
                                            >
                                                {e.operator!=null?`Operator ${e.operator}`:`Eltip beriji ${e.courier}`} tarapyndan girizildi
                                            </label>
                                            <label
                                                style={{color: "#3570A2", fontWeight: "600"}}
                                            >
                                                Sebäbi: {e.res.reason}
                                            </label>
                                        </Stack>

                                    </Stack>
                            )
                            })
                                :null
                        }
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <label></label>
                            <PlaceChange home={home} getData={props.getData} work={work} unique_id={props.item.unique_id} addAddressHistory={addAddressHistory} addLocationHistory={addLocationHistory}/>
                        </Stack>
                        <br/>
                        <hr/>
                    </div>
                    {/* Eltip bermeli yeri */}

                    {/* Eltip bermeli yeri */}
                    <div className="eltipBermeli">
                        <label>Eltip bermeli yeri:</label>
                        {
                            checkList(location_history)?
                            getDesc(location_history).map((e, i) => {
                                return (
                                    <Stack direction="column" spacing={1.5} mb={2}
                                           key={`address_key${i}`}
                                           style={{opacity: i !== location_history.length - 1 ? '0.3' : '1'}}>
                                        <Stack
                                            direction={{xs: "column", sm: "row"}}
                                            spacing={{xs: 1, sm: 2, md: 4}}
                                            mt={1}
                                        >
                                            <Stack width="100%">
                                                <input
                                                    type="text"
                                                    disabled
                                                    value={`${e.res.latitude}, ${e.res.longitude}`}
                                                />
                                            </Stack>
                                            <Stack width="100%">
                                                <MapLocation setLatitude={(i)=>{}} setLongitude={(i)=>{}} latitude={e.res.latitude} longitude={e.res.longitude}/>
                                            </Stack>
                                        </Stack>

                                        <Stack mb={1}>
                                            <label
                                                style={{color: "#3570A2", fontWeight: "600"}}
                                            >
                                                {e.operator!=null?`Operator ${e.operator}`:`Eltip beriji ${e.courier}`} tarapyndan girizildi
                                            </label>
                                            <label
                                                style={{color: "#3570A2", fontWeight: "600"}}
                                            >
                                                Sebäbi: {e.res.reason}
                                            </label>
                                        </Stack>

                                    </Stack>
                                )
                            }):null
                        }
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <label></label>
                            <PlaceChange home={home} getData={props.getData} work={work} unique_id={props.item.unique_id} addAddressHistory={addAddressHistory} addLocationHistory={addLocationHistory}/>

                        </Stack>
                        <br/>
                        <hr/>
                    </div>
                    {/* Eltip bermeli yeri */}

                    {/* Eltip bermeli wagty */}
                    <div className="eltipBermeli">
                        <label>Eltip bermeli sene we wagty:</label>
                        {
                            checkList(date_history)?
                            getDesc(date_history).map((e, i) => {
                                return (
                                    <Stack direction="column" spacing={1.5} mb={2}
                                           key={`date_key${i}`}
                                           style={{opacity: i !== date_history.length - 1 ? '0.3' : '1'}}>
                                        <Stack
                                            direction={{xs: "column", sm: "row"}}
                                            spacing={{xs: 1, sm: 2, md: 4}}
                                            mt={1}
                                        >
                                            <Stack width="32%">
                                                <input
                                                    type="text"
                                                    disabled
                                                    value={e.res.order_date}
                                                />
                                            </Stack>
                                            <Stack width="32%">
                                                <input
                                                    type="text"
                                                    disabled
                                                    value={e.res.order_time}
                                                />
                                            </Stack>
                                        </Stack>

                                        <Stack mb={1}>
                                            <label
                                                style={{color: "#3570A2", fontWeight: "600"}}
                                            >
                                                {e.operator!=null?`Operator ${e.operator}`:`Eltip beriji ${e.courier}`} tarapyndan girizildi
                                            </label>
                                            <label
                                                style={{color: "#3570A2", fontWeight: "600"}}
                                            >
                                                Sebäbi: {e.res.reason}
                                            </label>
                                        </Stack>

                                    </Stack>
                                )
                            }):null
                        }
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <label></label>
                            <DateAndTime addDateHistory={addDateHistory} getData={props.getData} order_unique_id={props.item.unique_id}/>
                        </Stack>
                        <br/>
                        <hr/>
                    </div>
                    {/* Eltip bermeli wagty */}



                    {/* Eltip bermek bahasy */}
                    <div className="eltipBermeli">
                        <label>Eltip bermek bahasy:</label>
                        {
                            checkList(delivery_price_history)?
                            getDesc(delivery_price_history).map((e, i) => {
                                return (
                                    <Stack direction="column" spacing={1.5} mb={2}
                                           key={`delivery_price_key${i}`}
                                           style={{opacity: i !== delivery_price_history.length - 1 ? '0.3' : '1'}}>
                                        <Stack
                                            direction={{xs: "column", sm: "row"}}
                                            spacing={{xs: 1, sm: 2, md: 4}}
                                            mt={1}
                                        >
                                            <Stack width="32%">
                                                <input
                                                    type="text"
                                                    disabled
                                                    value={`${e.res.delivery_price} TMT`}
                                                />
                                            </Stack>
                                        </Stack>

                                        <Stack mb={1}>
                                            <label
                                                style={{color: "#3570A2", fontWeight: "600"}}
                                            >
                                                {e.operator!=null?`Operator ${e.operator}`:`Eltip beriji ${e.courier}`} tarapyndan girizildi
                                            </label>
                                            <label
                                                style={{color: "#3570A2", fontWeight: "600"}}
                                            >
                                                Sebäbi: {e.res.reason}
                                            </label>
                                        </Stack>

                                    </Stack>
                                )
                            }):null
                        }
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <label></label>
                            <DeliveredPrice addPriceHistory={addPriceHistory} getData={props.getData} order_unique_id={props.item.unique_id}/>
                        </Stack>
                        <br/>
                        <hr/>
                    </div>
                    {/* Eltip bermek bahasy */}

                    {/* Courier history */}
                    <div className="eltipBermeli">
                        <label>Eltip beriji:</label>
                        {
                            checkList(courier_history)?
                            getDesc(courier_history).map((e, i) => {
                                return (
                                    <Stack direction="column" spacing={1.5} mb={2}
                                           key={`courier_key${i}`}
                                           style={{opacity: i !== courier_history.length - 1 ? '0.3' : '1'}}>
                                        <Stack
                                            direction={{xs: "column", sm: "row"}}
                                            spacing={{xs: 1, sm: 2, md: 4}}
                                            mt={1}
                                        >
                                            <Stack width="32%">
                                                <input
                                                    type="text"
                                                    disabled
                                                    value={`${e.courier}`}
                                                />
                                            </Stack>
                                        </Stack>

                                        <Stack mb={1}>
                                            <label
                                                style={{color: "#3570A2", fontWeight: "600"}}
                                            >
                                                {e.operator} tarapyndan girizildi
                                            </label>
                                            <label
                                                style={{color: "#3570A2", fontWeight: "600"}}
                                            >
                                                Sebäbi: {e.res.reason}
                                            </label>
                                        </Stack>

                                    </Stack>
                                )
                            }):null
                        }
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <label></label>
                            <Courier addCourierHistory={addCourierHistory} getData={props.getData} order_unique_id={props.item.unique_id}/>
                        </Stack>
                        <br/>
                        <hr/>
                    </div>
                    {/* Courier history */}

                    {/* Status history */}
                    <div className="eltipBermeli">
                        <label>Status:</label>
                        {
                            checkList(status_history)?
                            getDesc(status_history).map((e, i) => {
                                return (
                                    <Stack direction="column" spacing={1.5} mb={2}
                                           key={`courier_key${i}`}
                                           style={{opacity: i !== status_history.length - 1 ? '0.3' : '1'}}>
                                        <Stack
                                            direction={{xs: "column", sm: "row"}}
                                            spacing={{xs: 1, sm: 2, md: 4}}
                                            mt={1}
                                        >
                                            <Stack width="32%">
                                                <input
                                                    type="text"
                                                    disabled
                                                    value={`${translateStatus(e.res.status)}`}
                                                />
                                            </Stack>
                                        </Stack>

                                        <Stack mb={1}>
                                            <label
                                                style={{color: "#3570A2", fontWeight: "600"}}
                                            >
                                                {e.operator!=null?`Operator ${e.operator}`:`Eltip beriji ${e.courier}`} tarapyndan girizildi
                                            </label>
                                            <label
                                                style={{color: "#3570A2", fontWeight: "600"}}
                                            >
                                                Sebäbi: {e.res.reason}
                                            </label>
                                        </Stack>

                                    </Stack>
                                )
                            }):null
                        }
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <label></label>
                            <Status addStatusHistory={addStatusHistory} getData={props.getData} order_unique_id={props.item.unique_id}/>
                        </Stack>
                        <br/>
                        <hr/>
                    </div>
                    {/* Status history */}


                    <Stack direction={'row'} alignItems={'end'} justifyContent={'space-between'}>
                        <label></label>
                        <Button onClick={() => updateOrder()} variant={'contained'}>
                            Ýatda saklat
                        </Button>
                    </Stack>


                </Box>
            </Modal>
            <ToastContainer/>
        </div>
    );
};

export default UpdateOrder;
