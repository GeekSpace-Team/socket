import React, {useContext, useEffect, useState} from "react";
import Export from "../common-view/Export";
import Search from "../common-view/Search";
import Sync from "../common-view/Sync";
import { Button, Pagination, Stack } from "@mui/material";
import CustomerUpdate from "./CustomerUpdate";
import CustomerSort from "./CustomerSort";
import "../../style/customer/customer.css";
import {AxiosInstance, LocalAxiosInstance} from "../../api-interface/api/AxiosInstance.mjs";
import { showError } from "../Alert/Alert";
import AddCustomerModal from "./AddCustomerModal";
import CustomerFilter from "./CustomerFilter";
import CustomerPerPage from "./CustomerPerPage";
import Loading from "../../common/Loading";
import Empty from "../../common/Empty";
import { IosShare } from "@mui/icons-material";
import { CSVLink } from "react-csv";
import OrderFilter from "../order/OrderFilter";
import {checkPermission} from "../../common/utils.mjs";
import {AppContext} from "../../App";
import SyncPage from "../../layout/sync/SyncPage";

const CustomerCard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState(0);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(0);
  const [page_count, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [fields, setFileds] = useState([]);
  const [isEmptyPage, setEmptyPage] = useState(false);
  const {online}=useContext(AppContext);
  const [search,setSearch]=useState('');

  const [list, setList] = useState([]);

  const getData = async () => {
    const data = {
      startDate: startDate,
      endDate: endDate,
      status: status,
      page: page,
      perPage: perPage,
      sortBy: parseInt(sortBy),
      search:search
    };
    // console.log(data);
    let axios=online?AxiosInstance:LocalAxiosInstance;
    axios.post("/operator/get-customers?page=" + page, data)
      .then((response) => {
        if (!response.data.error) {
          setList(response.data.body.customers);

          if (page === 1) {
            setPageCount(response.data.body.page_count);
          }
          if (
            typeof response.data.body.inbox === "undefined" ||
            response.data.body.inbox.length <= 0
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
        if (list.length === 0) {
          setEmptyPage(true);
        }
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

  useEffect(() => {
    getData();
  }, [status]);

  useEffect(()=>{
    setPage(1);
  },[perPage]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getFields = async () => {
    let axios=online?AxiosInstance:LocalAxiosInstance;
    axios.get("/operator/get-fields")
      .then((response) => {
        setFileds(response.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFields();
  }, []);

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

  const {permissions}=useContext(AppContext);

  return (
    <div className="customerCard container">
      <div className="customerHeader">
        <h3>Müşderiler</h3>
        <Search search={search} setSearch={setSearch} handleKeyDown={handleKeyDown}/>
        <Button startIcon={<IosShare />} sx={{ color: 'black' }} variant={'text'}><CSVLink data={list} style={{ textDecoration: 'none', color: 'black' }}
          filename={`Mushderiler ${new Date()}.csv`}>Eksport</CSVLink></Button>
        <SyncPage getData={getData}/>
      </div>
      
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <CustomerSort sortBy={sortBy} setSortBy={setSortBy} />
          <CustomerFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            status={status}
            setStatus={setStatus}
          />
          <CustomerPerPage perPage={perPage} setPerPage={setPerPage} />
        </Stack>
        {
          checkPermission('customer',permissions).write?
              <AddCustomerModal getData={getData} />
              :
              null
        }
      </Stack>
      <br/>
      {(typeof list === "undefined" || list.length <= 0) && !isEmptyPage ? (
        <Loading />
      ) : (typeof list === "undefined" || list.length <= 0) && isEmptyPage ? (
        <Empty />
      ) : (
        <>
          {list.map((item, i) => {
            return (
              <div className="customerCardContainer" key={`customer_key${i}`}>
                <div className="customerCardContainerHeader">
                  <div className="CCCHtitle">
                    <label>{item.phone_number}</label>
                    <label>{item.fullname}</label>
                  </div>
                  {
                    checkPermission('customer',permissions).edit?
                        <CustomerUpdate
                            getData={getData}
                            item={item}
                            fields={fields}
                        />
                        :
                        null
                  }

                </div>
                <div className="customerCardTable">
                  <div className="CCTfirstRow">
                    <label>Müşderiniň statusy:</label>
                    <label>Sargytlar:</label>
                    <label>Ýaşaýan ýeri: </label>
                  </div>
                  <div className="CCTsecondRow">
                    <label>{item.customer_status_text}</label>
                    <label
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "2px",
                        color: "#5E9CCE",
                      }}
                    >
                      {item.order_count} sany
                    </label>
                    <label>{item.address_home}</label>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Musderi gosmak modal section starts here!!! */}

          {/* Musderi gosmak modal section ends here!!! */}
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
    </div>
  );
};

export default CustomerCard;
