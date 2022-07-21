import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import PhoneCallbackOutlinedIcon from "@mui/icons-material/PhoneCallbackOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import "../../style/sidebar/sidebar.css";
import { CookiesProvider } from "react-cookie";
import { Sidebar, SidebarItem } from "react-responsive-sidebar";

const SidebarD = () => {
  const location = useLocation();
  const GetCurrentRoute = () => {
    return location.pathname;
  };
  const activeItem = "activeItem";
  const passiveItem = "passiveItem";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <CookiesProvider className="app">
        <Sidebar
          className="sideBarContainer"
          breakPoint="768"
          background="#F5F8FC"
          toggleIconColor="#7C057B"
          content={[
            <SidebarItem hoverHighlight="#F5F8FC" activeHightlight="#F5F8FC">
              {" "}
              <Stack direction="column" spacing={0}>
                <NavLink to="/homepage" style={{ textDecoration: "none" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    pl={2}
                    className={
                      GetCurrentRoute() === "/" ||
                      GetCurrentRoute() === "/homepage"
                        ? activeItem
                        : passiveItem
                    }
                  >
                    <HomeOutlinedIcon />
                    <p>Home</p>
                  </Stack>
                </NavLink>
                <NavLink to="/accept-call" style={{ textDecoration: "none" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    pl={2}
                    className={
                      GetCurrentRoute() === "/" ||
                      GetCurrentRoute() === "/accept-call"
                        ? activeItem
                        : passiveItem
                    }
                  >
                    <PhoneCallbackOutlinedIcon />
                    <p>Gelýän jaňlar</p>
                  </Stack>
                </NavLink>
                <NavLink to="/ringin-call" style={{ textDecoration: "none" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    pl={2}
                    className={
                      GetCurrentRoute() === "/" ||
                      GetCurrentRoute() === "/ringin-call"
                        ? activeItem
                        : passiveItem
                    }
                  >
                    <CallOutlinedIcon />
                    <p>Kabul edilen jaňlar</p>
                  </Stack>
                </NavLink>
                <NavLink to="/missed-call" style={{ textDecoration: "none" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    pl={2}
                    className={
                      GetCurrentRoute() === "/" ||
                      GetCurrentRoute() === "/missed-call"
                        ? activeItem
                        : passiveItem
                    }
                  >
                    <AddIcCallOutlinedIcon />
                    <p>Göýberilen jaňlar</p>
                  </Stack>
                </NavLink>
                <NavLink to="/customer" style={{ textDecoration: "none" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    pl={2}
                    className={
                      GetCurrentRoute() === "/" ||
                      GetCurrentRoute() === "/customer"
                        ? activeItem
                        : passiveItem
                    }
                  >
                    <PeopleOutlineOutlinedIcon />
                    <p>Müşderiler</p>
                  </Stack>
                </NavLink>
                <NavLink to="/order" style={{ textDecoration: "none" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    pl={2}
                    className={
                      GetCurrentRoute() === "/" ||
                      GetCurrentRoute() === "/order"
                        ? activeItem
                        : passiveItem
                    }
                  >
                    <ReceiptOutlinedIcon />
                    <p>Sargytlar</p>
                  </Stack>
                </NavLink>
                <NavLink to="/courier" style={{ textDecoration: "none" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    pl={2}
                    className={
                      GetCurrentRoute() === "/" ||
                      GetCurrentRoute() === "/courier"
                        ? activeItem
                        : passiveItem
                    }
                  >
                    <LocalShippingOutlinedIcon />
                    <p>Eltip berijiler</p>
                  </Stack>
                </NavLink>
                <NavLink to="/inbox" style={{ textDecoration: "none" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    pl={2}
                    className={
                      GetCurrentRoute() === "/" ||
                      GetCurrentRoute() === "/inbox"
                        ? activeItem
                        : passiveItem
                    }
                  >
                    <LocalPostOfficeOutlinedIcon />
                    <p>Gelýän hatlar</p>
                  </Stack>
                </NavLink>
                <NavLink to="/login" style={{ textDecoration: "none" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    pl={2}
                    className={
                      GetCurrentRoute() === "/" ||
                      GetCurrentRoute() === "/login"
                        ? activeItem
                        : passiveItem
                    }
                  >
                    <LogoutOutlinedIcon />
                    <p>Log out</p>
                  </Stack>
                </NavLink>
              </Stack>
            </SidebarItem>,
          ]}
        ></Sidebar>
      </CookiesProvider>
      <Outlet />
    </>
  );
};

export default SidebarD;
