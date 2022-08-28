import React, {useContext} from "react";
import CallEndOutlinedIcon from '@mui/icons-material/CallEndOutlined';
import RingVolumeOutlinedIcon from '@mui/icons-material/RingVolumeOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import PhoneMissedOutlinedIcon from '@mui/icons-material/PhoneMissedOutlined';
import PhoneCallbackOutlinedIcon from "@mui/icons-material/PhoneCallbackOutlined";
import { Button, IconButton, Stack } from "@mui/material";
import AddOrderModal from "../order/AddOrderModal";
import CustomerUpdate from "../customer/CustomerUpdate";
import Empty from "../../common/Empty";
import { useState } from "react";
import { appSocket } from "../../api-interface/socket-io/socket.mjs";
import { useEffect } from "react";
import { callDirection, callState } from "../../common/constant.mjs";
import Close from "@mui/icons-material/Close";
import {AxiosInstance, LocalAxiosInstance} from "../../api-interface/api/AxiosInstance.mjs";
import AddCustomerModal from "../customer/AddCustomerModal";
import {AppContext} from "../../App";

const AcceptedCallCard = (props) => {
  
  const [fields, setFileds] = useState([]);

  const {online}=useContext(AppContext);

  const callChecker = (call) => {
    return props.calls.filter((item, i) => item.call.uniqueId !== call.call.uniqueId);
  }

  const removeCall = (call) => {
    let checked = callChecker(call);
    props.setCalls(checked);
  }


  const getIcon = (state, duration) => {
    let icon;
    switch (state) {
      case callState.CALL_STATE_IDLE:
        if (duration > 10)
          icon = <CallEndOutlinedIcon />;
        else
          icon = <PhoneMissedOutlinedIcon />;
        break;
      case callState.CALL_STATE_OFFHOOK:
        icon = <PhoneInTalkOutlinedIcon />;
        break;
      case callState.CALL_STATE_RINGING:
        icon = <RingVolumeOutlinedIcon />;
        break;
      case callState.CALL_STATE_START:
        icon = <RingVolumeOutlinedIcon />;
        break;
    }
    return icon;
  }

  const getColor = (state, duration) => {
    let color;
    switch (state) {
      case callState.CALL_STATE_IDLE:
        if (duration > 10)
          color = "#ff6961";
        else
          color = "#E74F4F";
        break;
      case callState.CALL_STATE_OFFHOOK:
        color = "#FFCC00";
        break;
      case callState.CALL_STATE_RINGING:
        color = "#6DBA75";
        break;
      case callState.CALL_STATE_START:
        color = "#6DBA75";
        break;
    }
    return color;
  }

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

  useEffect(()=>{
    getFields();
  },[]);

  const getFullName=(item)=>{
    try{
      return item.customer[0].fullname;
    } catch(err){
      return "Näbelli müşderi";
    }
  }

  const getCustomerStatus=(item)=>{
    try{
      return item.customer[0].customer_status_text;
    } catch(err){
      return "Näbelli müşderi";
    }
  }

  const getCustomerAddress=(item)=>{
    try{
      return item.customer[0].address_home;
    } catch(err){
      return "Näbelli müşderi";
    }
  }

  const getCustomerWork=(item)=>{
    try{
      return item.customer[0].address_work;
    } catch(err){
      return "Näbelli müşderi";
    }
  }


  return (
    <div className="acceptCardContainer container">
      <div className="acceptCardTitle">
        <h3>Gelyan janlar</h3>
      </div>
      <div>
        {
          typeof props.calls === 'undefined' || props.calls == null || props.calls.length <= 0 || props.calls == '' ?
            <Empty />
            :
            props.calls.map((item, i) => {
              return (
                <div className="acceptCard" key={`accept_call_keey_${i}`}>
                  <div className="acceptCardHeader" style={{ backgroundColor: getColor(item.call.state, item.call.callDuration) }}>
                    <IconButton onClick={() => removeCall(item)}><Close /></IconButton>
                    <div className="acceptCardHeaderRow">
                      <Stack direction="row" spacing={1}>
                        {
                          getIcon(item.call.state, item.call.callDuration)
                        }
                        <label>{item.call.callStateStr}</label>
                      </Stack>
                      <label>Jaň dowamlylygy: {`${parseInt(
                        item.call.callDuration / 60
                      )} min, ${item.call.callDuration % 60
                        } sek`}</label>
                      <label style={{ textAlign: "center", marginLeft: "23%" }}>
                        {typeof item.call.phNumber === 'undefined' ? '' : item.call.phNumber}
                      </label>
                      <label>{item.call.callDate}</label>
                      <label>{item.call.callTime}</label>
                    </div>
                    <div className="secondRowCard">
                      <label>{getFullName(item)}</label>
                    </div>
                  </div>
                  <div className="acceptRowCardSecond">
                    <div className="acceptCardBody">
                      <label>Statusy: </label>
                      <label>Ýaşaýan ýeri: </label>
                      <label>Iş ýeri: </label>
                    </div>
                    <div className="secondCardRow">
                      <label>{getCustomerStatus(item)}</label>
                      <label>
                        {getCustomerAddress(item)}
                      </label>
                      <label>
                        {getCustomerWork(item)}
                      </label>
                    </div>
                  </div>
                  <div className="acceptCardButton">
                    
                    {
                      typeof item.customer==='undefined' || item.customer==null || item.customer.length<=0 || typeof item.customer[0] === 'undefined' || item.customer[0] == null ?
                      <AddCustomerModal getData={()=>{}} key={`customer_update_${i}`} phone_number={item.call.phNumber}/>
                      :
                      <div>
                        <AddOrderModal user_unique_id={item.customer[0].unique_id} getData={()=>{}} setPage={(page)=>{}}/>
                        {/*<CustomerUpdate which={"accept-call"} item={item.customer[0]} fields={fields} key={`customer_update_${i}`} getData={()=>{}}/>*/}
                      </div>
                    }
                  </div>
                </div>
              )
            })
        }
      </div>
    </div>
  );
};



export default AcceptedCallCard;
