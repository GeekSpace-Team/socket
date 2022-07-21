import React, { Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
// import { isLogin } from "./common/isLogin";
// import { GlobalDebug } from "./GlobalDebug";
import AcceptCall from "./layout/accept-call/AcceptCall";
import Courier from "./layout/courier/Courier";
import Customer from "./layout/customer/Customer";
import Home from "./layout/homepage/Home";
import Inbox from "./layout/inbox/Inbox";
import LoginPage from "./layout/login/LoginPage";
import MissedCall from "./layout/missed-call/MissedCall";
import Order from "./layout/order/Order";
import RinginCall from "./layout/ringin-call/RinginCall";
import SidebarD from "./layout/sidebar/SidebarD";

function App() {
  // useEffect(() => {
  //   (process.env.NODE_ENV === "production" ||
  //     process.env.REACT_APP_ENV === "STAGING") &&
  //     GlobalDebug(false);
  // }, []);
  return (
    <>
      <Suspense>
        <HashRouter>
          <SidebarD />
          <Routes>
            <Route exact path="/login" element={<LoginPage />} />

            <Route path="/accept-call" element={<AcceptCall />} />
            <Route path="/courier" element={<Courier />} />
            <Route path="/homepage" element={<Home />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/ringin-call" element={<RinginCall />} />
            <Route path="/order" element={<Order />} />
            <Route path="/missed-call" element={<MissedCall />} />
          </Routes>
        </HashRouter>
      </Suspense>
    </>
  );
}

export default App;
