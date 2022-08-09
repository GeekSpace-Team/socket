import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  // console.log = () => {};
  console.error = () => {};
  console.warning = () => {};
  console.warn = () => {};
  console.info = () => {};
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/" element={<Sidebar />}>
            <Route path="/accept-call" element={<AcceptCall />} />
            <Route path="/courier" element={<Courier />} />
            <Route path="/homepage" element={<Home />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/inbox" element={<Inbox />} />
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
