import React from "react";
import PhoneCallbackOutlinedIcon from "@mui/icons-material/PhoneCallbackOutlined";
import { Stack } from "@mui/material";
import AddOrderModal from "../order/AddOrderModal";
import CustomerUpdate from "../customer/CustomerUpdate";

const AcceptedCallCard = ({ text }) => {
  return (
    <div className="acceptCardContainer">
      <div className="acceptCardTitle">
        <h3>Gelyan janlar</h3>
      </div>
      <div className="acceptCard">
        <div className="acceptCardHeader">
          <div className="acceptCardHeaderRow">
            <Stack direction="row" spacing={1}>
              <PhoneCallbackOutlinedIcon />
              <label>Ringing</label>
            </Stack>
            <label style={{ textAlign: "center", marginLeft: "23%" }}>
              +99363430338
            </label>
            <label>28.06.2022</label>
            <label>19:00</label>
          </div>
          <div className="secondRowCard">
            <label>Gayypov Halil Cerkezowich</label>
          </div>
        </div>
        <div className="acceptRowCardSecond">
          <div className="acceptCardBody">
            <label>Musderinin statusy</label>
            <label>Yasayan yeri</label>
            <label>Ish yeri:</label>
          </div>
          <div className="secondCardRow">
            <label>Yonekey</label>
            <label>
              Ashgabat saher, olimpiya kocesi
              <br />
              4-nji jay, 202-nji oy
            </label>
            <label>
              Ashgabat saherinin Berkararlyk <br />
              etrap hakimligi
            </label>
          </div>
        </div>
        <div className="acceptCardButton">
          <AddOrderModal />
          <CustomerUpdate which={"accept-call"} />
        </div>
      </div>
    </div>
  );
};

export default AcceptedCallCard;
