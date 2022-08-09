import React, { useEffect, useState } from "react";
import Export from "../common-view/Export";
import Search from "../common-view/Search";
import Sync from "../common-view/Sync";
import { Button, Pagination, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddOrderModal from "./AddOrderModal";
import OrderSelect from "./OrderSelect";
import { AxiosInstance } from "../../api-interface/api/AxiosInstance.mjs";
import { showError } from "../Alert/Alert";
import OrderPerPage from "./OrderPerPage";
import OrderFilter from "./OrderFilter";
import "../../style/order/order.css";

const OrderCard = () => {
  const [age, setAge] = React.useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(0);
  const [page_count, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(20);

  const [list, setList] = useState([]);

  const getData = async () => {
    const data = {
      startDate: startDate,
      endDate: endDate,
      page: page,
      perPage: perPage,
      sortBy: parseInt(sortBy),
    };
    // console.log(data);
    await AxiosInstance.post("/operator/get-orders", data)
      .then((response) => {
        if (!response.data.error) {
          setList(response.data.body.orders);

          if (page === 1) {
            setPageCount(response.data.body.page_count);
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
      return "Status yok";
    }
    if (status === "pending") {
      return "Garashylyar";
    }
    if (status === "courier-pending") {
      return "Kuryere ugradyldy";
    }
    if (status === "courier-accepted") {
      return "Kuryer kabul etdi";
    }
    if (status === "courier-delivered") {
      return "Kuryer eltip berdi";
    }
    if (status === "delivered") {
      return "Sargyt tamamlandy";
    }
    if (status === "rejected") {
      return "Sargyt yatyryldy";
    }
  };

  return (
    <div className="orderCard container">
      <div className="orderHeader">
        <h3>Sargytlar</h3>
        <Search />
        <Export />
        <Sync />
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
          <AddOrderModal />
        </div>
      </div>
      {/* Order Card Container Section starts here */}
      {list.map((item, i) => {
        return (
          <div className="orderCardContainer" key={`order_key${i}`}>
            <div className="OCCheader">
              <label style={{ fontWeight: "600" }}>
                {item.phone_number === null ? "" : item.phone_number}
              </label>
              <label style={{ fontWeight: "600" }}>
                {item.fullname === null ? "" : item.fullname}
              </label>
              <label>
                {item.created_at.split("T")[0]} /{" "}
                {`${item.created_at.split("T")[1].split(":")[0]}:${
                  item.created_at.split("T")[1].split(":")[1]
                }`}
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
                  
                    {translateStatus(
                      item.status_history[item.status_history.length - 1].status
                    )}
                  </label>
                </div>

                <div className="OCFTsecondRow">
                  <label>Eltip bermeli yeri : </label>
                  <label>
                    {
                      item.address_history[item.address_history.length - 1]
                        .address
                    }
                  </label>
                </div>
                <div className="OCFTthirdRow">
                  <label>Eltip bermeli wagty : </label>
                  <label>
                    {item.date_history[item.date_history.length - 1].order_date}{" "}
                    /
                    {item.date_history[item.date_history.length - 1].order_time}
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
                    {
                      item.delivery_price_history[
                        item.delivery_price_history.length - 1
                      ].delivery_price
                    }{" "}
                    TMT
                  </label>
                </div>

                <div className="OCFTsecondRow">
                  <label>Jemi bahasy :</label>
                  <label>1023 TMT</label>
                </div>
                <div className="OCFTthirdRow">
                  <label>Eltip beriji : </label>
                  <label>Amanov Bagtyyar</label>
                </div>
              </Stack>
              {/* Order Card second table ends here */}
              {/* Order Card Container section ends here */}
            </Stack>
            <div className="OCCbottomFilters">
              {" "}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 5 }}
                mt={2}
              >
                <Button
                  style={{
                    textTransform: "none",
                    borderRadius: "16px",
                    color: "#585858",
                    border: "1px solid #b1b1b1",
                    height: "40px",
                  }}
                  variant="outlined"
                >
                  Print fracture
                </Button>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{
                    borderRadius: "16px",
                    height: "40px",
                    border: "1px solid #b1b1b1",
                    minWidth: "200px",
                    color: "#5e9cce",
                  }}
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{
                    borderRadius: "16px",
                    height: "40px",
                    border: "1px solid #b1b1b1",
                    minWidth: "200px",
                    color: "#5e9cce",
                  }}
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: "16px",
                    background: "#5e9cce",
                    color: "#FAFCFB",
                    textTransform: "none",
                    fontWeight: "600",
                    height: "40px",
                  }}
                >
                  Open
                </Button>
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
    </div>
  );
};

export default OrderCard;
