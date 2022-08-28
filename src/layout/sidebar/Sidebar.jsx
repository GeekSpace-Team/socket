import React from "react";
import PhoneCallbackOutlinedIcon from "@mui/icons-material/PhoneCallbackOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PhoneMissedOutlinedIcon from "@mui/icons-material/PhoneMissedOutlined";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";

const Sidebar = () => {
  return <></>;
};

export default Sidebar;

export const sidebarItems = [
  {
    title: "Baş sahypa",
    icon: <HomeOutlinedIcon />,
    link: "/",
  },
  {
    title: "Gelýän jaňlar",
    icon: <PhoneCallbackOutlinedIcon />,
    link: "/accept-call",
  },
  {
    title: "Kabul edilen jaňlar",
    icon: <CallOutlinedIcon />,
    link: "/ringin-call",
  },
  {
    title: "Göýberilen jaňlar",
    icon: <PhoneMissedOutlinedIcon />,
    link: "/missed-call",
  },
  {
    title: "Müşderiler",
    icon: <PeopleOutlineOutlinedIcon />,
    link: "/customer",
  },
  {
    title: "Sargytlar",
    icon: <ReceiptOutlinedIcon />,
    link: "/order",
  },
  {
    title: "Eltip berijiler",
    icon: <LocalShippingOutlinedIcon />,
    link: "/courier",
  },
  {
    title: "Gelýän hatlar",
    icon: <LocalPostOfficeOutlinedIcon />,
    link: "/inbox",
  },
];
