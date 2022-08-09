import React, { useEffect, useState } from "react";
import Export from "../common-view/Export";
import Search from "../common-view/Search";
import Sync from "../common-view/Sync";
import { Pagination, Stack } from "@mui/material";
import CustomerUpdate from "./CustomerUpdate";
import CustomerSort from "./CustomerSort";
import "../../style/customer/customer.css";
import { AxiosInstance } from "../../api-interface/api/AxiosInstance.mjs";
import { showError } from "../Alert/Alert";
import AddCustomerModal from "./AddCustomerModal";
import CustomerFilter from "./CustomerFilter";
import CustomerPerPage from "./CustomerPerPage";
import Loading from "../../common/Loading";
import Empty from "../../common/Empty";

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

  const [list, setList] = useState([]);

  const getData = async () => {
    const data = {
      startDate: startDate,
      endDate: endDate,
      status: status,
      page: page,
      perPage: perPage,
      sortBy: parseInt(sortBy),
    };
    // console.log(data);
    await AxiosInstance.post("/operator/get-customers?page=1", data)
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getFields = async () => {
    await AxiosInstance.get("/operator/get-fields")
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

  return (
    <div className="customerCard container">
      <div className="customerHeader">
        <h3>Musderiler</h3>
        <Search />
        <Export />
        <Sync />
      </div>
      <AddCustomerModal getData={getData} />
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
                  <CustomerUpdate
                    getData={getData}
                    item={item}
                    fields={fields}
                  />
                </div>
                <div className="customerCardTable">
                  <div className="CCTfirstRow">
                    <label>Musderinin statusy</label>
                    <label>Sargytlar:</label>
                    <label>Yasayan yeri</label>
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
