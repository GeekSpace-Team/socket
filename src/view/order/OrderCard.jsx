import React, { useEffect, useState } from "react";
import Export from "../common-view/Export";
import Search from "../common-view/Search";
import Sync from "../common-view/Sync";
import { Button, Pagination, Stack, Step, StepContent, StepIcon, StepLabel, Stepper, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddOrderModal from "./AddOrderModal";
import OrderSelect from "./OrderSelect";
import {AxiosInstance, LocalAxiosInstance} from "../../api-interface/api/AxiosInstance.mjs";
import { showError } from "../Alert/Alert";
import OrderPerPage from "./OrderPerPage";
import OrderFilter from "./OrderFilter";
import "../../style/order/order.css";
import Empty from "../../common/Empty";
import Loading from "../../common/Loading";
import Open from "./Open";
import { orderStatus } from "../../common/constant.mjs";
import { CSVLink } from "react-csv";
import {IosShare, Print} from "@mui/icons-material";
import FiberNewIcon from '@mui/icons-material/FiberNew';
import {checkPermission, convertTimeStampToDate, convertTimeStampToTime} from "../../common/utils.mjs";
import { ToastContainer } from "react-toastify";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EditIcon from '@mui/icons-material/Edit';
import UpdateOrder from "./UpdateOrder";
import PdfOrder from "./PdfOrder";
import {useContext} from "react";
import {AppContext} from "../../App";
import SyncPage from "../../layout/sync/SyncPage";
import ScanQr from "./ScanQr";
import {useSearchParams} from "react-router-dom";

const OrderCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let get_unique_id=searchParams.get("unique_id");
  const [age, setAge] = React.useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(0);
  const [page_count, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [isEmptyPage, setEmptyPage] = useState(false);
  const [list, setList] = useState([]);
  const {online}=useContext(AppContext);
  const [search,setSearch]=useState(typeof get_unique_id !== 'undefined' && get_unique_id != null && get_unique_id !== ''?`${get_unique_id}`:'');
  

  useEffect(()=>{
    setPage(1);
  },[perPage]);

  const getData = () => {
    const data = {
      startDate: startDate,
      endDate: endDate,
      page: page,
      perPage: perPage,
      sortBy: parseInt(sortBy),
      search:search
    };
    // console.log(data);
    let axios=online?AxiosInstance:LocalAxiosInstance;
    axios.post("/operator/get-orders", data)
      .then((response) => {
        if (!response.data.error) {
          setList(response.data.body.orders);

          if (page === 1) {
            setPageCount(response.data.body.page_count);
          }
          if (
            typeof response.data.body.orders === "undefined" ||
            response.data.body.orders.length <= 0
          ) {
            setEmptyPage(true);
          } else {
            setEmptyPage(false);
          }
        } else {
          if (list.length === 0) {
            setEmptyPage(true);
          }
        }
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    getData();
  }, [sortBy]);

  useEffect(() => {
    getData();
  }, [startDate]);

  useEffect(() => {
    getData();
  }, [endDate]);

  useEffect(() => {
    getData();
  }, [perPage]);

  const translateStatus = (status) => {
    if (status === "none") {
      return "Status ýok";
    }
    if (status === "pending") {
      return "Garaşylýar";
    }
    if (status === "courier-pending") {
      return "Eltip berijä ugradyldy";
    }
    if (status === "courier-accepted") {
      return "Eltip beriji kabul etdi";
    }
    if (status === "courier-delivered") {
      return "Eltip beriji eltip berdi";
    }
    if (status === "delivered") {
      return "Sargyt tamamlandy";
    }
    if (status === "rejected") {
      return "Sargyt ýatyryldy";
    }
  };

  const getAddress = (list) => {
    try {
      return list[list.length - 1].res.address;
    } catch (err) {
      return 'Girizilmedik';
    }
  }

  const getStatus = (list) => {
    try {
      return list[list.length - 1].res.status;
    } catch (err) {
      return orderStatus.NONE;
    }
  }

  const getDate = (list) => {
    try {
      return list[list.length - 1].res.order_date;
    } catch (err) {
      return 'Girizilmedik';
    }
  }

  const getTime = (list) => {
    try {
      return list[list.length - 1].res.order_time;
    } catch (err) {
      return 'Girizilmedik';
    }
  }

  const getDeliveryPrice = (list) => {
    try {
      return list[list.length - 1].res.delivery_price;
    } catch (err) {
      return '0';
    }
  }

  const getCourierName = (item) => {
    try {
      return item.courier_fullname;
    } catch (err) {
      return 'Eltip beriji bellenmedik';
    }
  }

  const getTotalPrice = (products) => {
    try {
      let total = 0;
      products.forEach(element => {
        let count=1;
        if(typeof element.product_count !== 'undefined' && element.product_count !=null && element.product_count!='' && element.product_count>0){
          count=element.product_count;
        }
        let sum = (element.product_debt_price + element.product_cash_price)*count;
        let t = 0;
        if (element.product_discount != null && element.product_discount != '') {
          t = (element.product_discount / 100) * sum;
        }
        let k = sum - t;
        total += k;
      });
      return total;
    } catch (err) {
      console.log(err);
      return 0;
    }
  }

  const getLastStatus=(list,s)=>{
    let result=null;
    try{
      for(let i=list.length-1;i>=0;i--){
        if(list[i].res.status==s){
          result=list[i];
          break;
        }
        
      }
    } catch(err){
      console.log(err);
      result=null;
    }
    return result;
  }

  const getStepper=(list)=>{
    let temp=[];
      let k=getLastStatus(list,orderStatus.NONE);
      if(k!=null){
        temp.push(k);
      }
      k=getLastStatus(list,orderStatus.PENDING);
      if(k!=null){
        temp.push(k);
      }
      k=getLastStatus(list,orderStatus.COURIER_PENDING);
      if(k!=null){
        temp.push(k);
      }
      k=getLastStatus(list,orderStatus.COURIER_ACCEPTED);
      if(k!=null){
        temp.push(k);
      }
      k=getLastStatus(list,orderStatus.COURIER_DELIVERED);
      if(k!=null){
        temp.push(k);
      }
      k=getLastStatus(list,orderStatus.DELIVERED);
      if(k!=null){
        temp.push(k);
      }
      k=getLastStatus(list,orderStatus.REJECTED);
      if(k!=null){
        temp.push(k);
      }
      return temp;
    
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

  const {permissions}=useContext(AppContext);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getData();
    }
  }

  useEffect(()=>{
    if(search.length===0){
      getData();
    }
  },[search]);

  return (
    <div className="orderCard container">
      
      <div className="orderHeader">
        <h3>Sargytlar</h3>
        <Stack direction={'row'}>
          <Search search={search} setSearch={setSearch} handleKeyDown={handleKeyDown}/>
          <ScanQr setSearch={setSearch} getData={getData}/>
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-end'} spacing={2}>
          <Button startIcon={<IosShare />} sx={{ color: 'black' }} variant={'text'}><CSVLink data={list} style={{ textDecoration: 'none', color: 'black' }}
                                                                                             filename={`Sargytlar ${new Date()}.csv`}>Eksport</CSVLink></Button>
          <SyncPage getData={getData}/>
        </Stack>
      </div>
      <div className="addOrder">
        <Stack direction="row" alignItems="center" spacing={3}>
          <OrderSelect sortBy={sortBy} setSortBy={setSortBy} />
          <OrderFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <OrderPerPage perPage={perPage} setPerPage={setPerPage} />
        </Stack>
        <div className="AddOrderButton">
          {
            checkPermission('orders',permissions).write?
                <AddOrderModal getData={getData} setPage={setPage}/>
                :null
          }
        </div>
      </div>
      {(typeof list === "undefined" || list.length <= 0) && !isEmptyPage ? (
        <Loading />
      ) : (typeof list === "undefined" || list.length <= 0) && isEmptyPage ? (
        <Empty />
      ) : (
        <>
          {/* Order Card Container Section starts here */}
          {list.map((item, i) => {
            return (
              <div className="orderCardContainer" key={`order_key${i}`}>
                <div className="OCCheader">
                  <label style={{ fontWeight: "600" }}>
                    {item.phone_number === null ? "Müşderi tapylmady" : item.phone_number}
                  </label>
                  <label style={{ fontWeight: "600" }}>
                    {item.fullname === null ? "Müşderi tapylmady" : item.fullname}
                  </label>
                  <label>
                    {convertTimeStampToDate(item.created_at)} /{" "}
                    {convertTimeStampToTime(item.created_at)}
                  </label>
                </div>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 12 }}
                  mt={2}
                >
                  {/* Order Card first table starts here */}
                  <Stack
                    direction="column"
                    width="100%"
                    style={{
                      filter: "drop-shadow(0px 0px 10px rgba(129,129,129,0.15)",
                    }}
                  >
                    <div className="OCFTfirstRow">
                      <label>Statusy : </label>
                      <label>
                        {translateStatus(getStatus(item.status_history))}
                      </label>
                    </div>

                    <div className="OCFTsecondRow">
                      <label>Eltip bermeli ýeri : </label>
                      <label>
                        {getAddress(getDesc(item.address_history))}
                      </label>
                    </div>
                    <div className="OCFTthirdRow">
                      <label>Eltip bermeli wagty : </label>
                      <label>
                        {getDate(getDesc(item.date_history))}
                        /
                        {getTime(getDesc(item.date_history))}
                      </label>
                    </div>
                  </Stack>
                  {/* Order Card first table ends here */}
                  {/* Order Card second table starts here  */}
                  <Stack
                    direction="column"
                    width="100%"
                    style={{
                      filter: "drop-shadow(0px 0px 10px rgba(129,129,129,0.15)",
                    }}
                  >
                    <div className="OCFTfirstRow">
                      <label>Eltip bermek bahasy : </label>
                      <label>
                        {getDeliveryPrice(getDesc(item.delivery_price_history))}
                        TMT
                      </label>
                    </div>

                    <div className="OCFTsecondRow">
                      <label>Jemi bahasy :</label>
                      <label>{getTotalPrice(item.products)+getDeliveryPrice(getDesc(item.delivery_price_history))} TMT</label>
                    </div>
                    <div className="OCFTthirdRow">
                      <label>Eltip beriji : </label>
                      <label>{getCourierName(item) == null ? 'Eltip beriji bellenmedik' : getCourierName(item)}</label>
                    </div>
                  </Stack>
                  {/* Order Card second table ends here */}
                  {/* Order Card Container section ends here */}
                </Stack>
                <Stack sx={{mt:3}}>

                  {
                      <Stepper activeStep={getStepper(item.status_history)!=null && getStepper(item.status_history).length>0?getStepper(item.status_history).length-1:0}>
                        {
                          getStepper(item.status_history)!=null && getStepper(item.status_history).length>0?
                          getStepper(item.status_history).map((e,i)=>{
                            console.log(e);
                              return (
                                <Step key={`stepper_key_${i}`}>
                                  <StepLabel>
                                    <Typography color={e.res.status==orderStatus.REJECTED?'error':'primary'} sx={{fontWeight:'bold'}}>
                                      {translateStatus(e.res.status)} / {`${convertTimeStampToDate(e.res.created_at)} ${convertTimeStampToTime(e.res.created_at)}`}
                                      {
                                      e.res.status==orderStatus.REJECTED?
                                      ` (Sebäbi: ${e.res.reason})`:""
                                      }
                                    </Typography>
                                    
                                  </StepLabel>
                                </Step>
                              )
                          })
                          :
                          null
                        }
                      </Stepper>
                  }

                </Stack>
                <div className="OCCbottomFilters">
                  {" "}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2, md: 5 }}
                    mt={2}
                  >
                  <PdfOrder item={item} courier={getCourierName(item) == null ? '' : getCourierName(item)} address={getAddress(getDesc(item.address_history))} delivery_price={getDeliveryPrice(getDesc(item.delivery_price_history))}/>
                    {
                      checkPermission('orders',permissions).edit?
                          <UpdateOrder getData={getData} setPage={setPage} item={item}/>
                          :null
                    }

                  </Stack>
                </div>
              </div>
            );
          })}

          <Stack mt={10} justifyContent="center" direction="row">
            <Pagination
              color="primary"
              count={page_count}
              page={page}
              onChange={handleChange}
            />
          </Stack>

        </>
      )}
      <ToastContainer/>


    </div>
  );
};

export default OrderCard;