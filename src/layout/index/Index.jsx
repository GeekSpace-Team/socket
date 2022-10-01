import AcceptCall from "../accept-call/AcceptCall";
import Courier from "../courier/Courier";
import Customer from "../customer/Customer";
import Home from "../homepage/Home";
import Inbox from "../inbox/Inbox";
import MissedCall from "../missed-call/MissedCall";
import Order from "../order/Order";
import React from "react";
import RinginCall from "../ringin-call/RinginCall";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  const GetCurrentRoute = () => {
    return location.pathname;
  };
  let page = <Home />;
  if (GetCurrentRoute() === "/home") {
    page = <Home />;
  }

  if (GetCurrentRoute() === "/accept-call") {
    page = <AcceptCall />;
  }
  if (GetCurrentRoute() === "/courier") {
    page = <Courier />;
  }
  if (GetCurrentRoute() === "customer") {
    page = <Customer />;
  }
  if (GetCurrentRoute() === "inbox") {
    page = <Inbox />;
  }
  if (GetCurrentRoute() === "ringin-call") {
    page = <RinginCall />;
  }
  if (GetCurrentRoute() === "order") {
    page = <Order />;
  }
  if (GetCurrentRoute() === "missed-call") {
    page = <MissedCall />;
  }
  return <div>{page}</div>;
};

export default Index;
