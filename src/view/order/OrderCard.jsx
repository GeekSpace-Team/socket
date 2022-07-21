import React from "react";
import BasicSelect from "../common-view/BasicSelect";
import Export from "../common-view/Export";
import FilterSelect from "../common-view/FilterSelect";
import PerPageSelect from "../common-view/PerPageSelect";
import Search from "../common-view/Search";
import Sync from "../common-view/Sync";
import "../../style/order/order.css";
import { Button, Pagination, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddOrderModal from "./AddOrderModal";

const OrderCard = ({ text }) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="orderCard">
      <div className="orderHeader">
        <h3>Sargytlar</h3>
        <Search />
        <Export />
        <Sync />
      </div>
      <div className="addOrder">
        <div className="orderFilter">
          <BasicSelect />
          <FilterSelect />
          <PerPageSelect />
        </div>
        <div className="AddOrderButton">
          <AddOrderModal />
        </div>
      </div>
      {/* Order Card Container Section starts here */}
      <div className="orderCardContainer">
        <div className="OCCheader">
          <label style={{ fontWeight: "600" }}>+99363430338</label>
          <label style={{ fontWeight: "600" }}>
            Gayypov Halil Cherkezovich
          </label>
          <label>12.12.2022</label>
          <label>15:00</label>
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
              <label>Kabul edildi</label>
            </div>

            <div className="OCFTsecondRow">
              <label>Eltip bermeli yeri : </label>
              <label>
                Ashgabat saher, olimpiya kocesi <br />
                4-nji jay, 202-nji oy
              </label>
            </div>
            <div className="OCFTthirdRow">
              <label>Eltip bermeli wagty : </label>
              <label>
                12.12.22
                <br />
                15:00
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
              <label>20 TMT</label>
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
      <Stack mt={10} justifyContent="center" direction="row">
        <Pagination color="primary" count={10} />
      </Stack>
    </div>
  );
};

export default OrderCard;
