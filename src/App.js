import React,{useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { appSocket } from "./api-interface/socket-io/socket.mjs";
import AcceptCall from "./layout/accept-call/AcceptCall";
import Courier from "./layout/courier/Courier";
import Customer from "./layout/customer/Customer";
import Home from "./layout/homepage/Home";
import Inbox from "./layout/inbox/Inbox";
import LoginPage from "./layout/login/LoginPage";
import MissedCall from "./layout/missed-call/MissedCall";
import Order from "./layout/order/Order";
import RinginCall from "./layout/ringin-call/RinginCall";
import Sidebar from "./Sidebar";
import { showSuccess } from "./view/Alert/Alert.jsx";

function App() {
  // console.log = () => {};
  // console.error = () => {};
  // console.warning = () => {};
  // console.warn = () => {};
  // console.info = () => {};
  const [unreadCount,setUnreadCount]=useState(0);
  appSocket.on("onCall", (arg, callback) => {
    if(localStorage.getItem('unique_id')==arg.operator.unique_id){
      try{
        showSuccess(`${arg.call.callStateStr}, ${arg.call.callTypeStr} : ${arg.call.phNumber}, ${arg.customer[0].fullname}`)
      } catch(err){
        // showSuccess(`${arg.call.callStateStr}, ${arg.call.callTypeStr} : ${arg.call.phNumber}`)
      }
    }
  });

  appSocket.on("onInbox",(arg,callback)=>{
    if(arg.unique_id==localStorage.getItem('unique_id')){
      showSuccess(`Täze hat geldi!`)
    }
  })
  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" index element={<LoginPage />} />
          <Route path="/" element={<Sidebar unreadCount={unreadCount} setUnreadCount={setUnreadCount}/>}>
            <Route path="/accept-call" element={<AcceptCall />} />
            <Route path="/courier" element={<Courier />} />
            <Route path="/homepage" element={<Home />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/inbox" element={<Inbox  unreadCount={unreadCount} setUnreadCount={setUnreadCount}/>} />
            <Route path="/ringin-call" element={<RinginCall />} />
            <Route path="/order" element={<Order />} />
            <Route path="/missed-call" element={<MissedCall />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
