import React, { useEffect, useState } from "react";
import { Stack, IconButton, Pagination } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "../../style/inbox/inbox.css";
import Send from "./Send";
import Description from "./Description";
import { AxiosInstance } from "../../api-interface/api/AxiosInstance.mjs";
import { showError, showSuccess } from "../Alert/Alert";
import { ToastContainer } from "react-toastify";
import Loading from "../../common/Loading";
import Empty from "../../common/Empty";
import { appSocket } from "../../api-interface/socket-io/socket.mjs";

const InboxCard = (props) => {
  const [page, setPage] = useState(1);
  const [page_count, setPageCount] = useState(0);
  const [list, setList] = useState([]);
  const [perPage, setPerPage] = useState(20);
  const [isEmptyPage, setEmptyPage] = useState(false);
  const [inbox_unique_id, setInbox_unique_id] = useState("");
  const handleChange = (event, value) => {
    setPage(value);
  };
  const hoveredstyle = {
    cursor: "initial",
  };

  const getUnreadCount=()=>{
    AxiosInstance.get('/operator/get-unread-inbox-count')
  .then(response=>{
    if(!response.data.error){
      props.setUnreadCount(response.data.body.unread_inbox_count);
    }
  })
  .catch(err=>{})
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opem = Boolean(anchorEl);
  const handleClick = (event, unique_id) => {
    setInbox_unique_id(unique_id);
    setAnchorEl(event.currentTarget);
  };
  const handleCloze = () => {
    setAnchorEl(null);
  };

  const getData = async () => {
    await AxiosInstance.get("/operator/get-inbox?page="+page)
      .then((response) => {
        if (!response.data.error) {
          setList(response.data.body.inbox);
          // if (page == 1) {
            setPageCount(response.data.body.page_count);
          // }
          if (
            typeof response.data.body.inbox === "undefined" ||
            response.data.body.inbox.length <= 0
          ) {
            setPage(page-1);
            setEmptyPage(true);
          } else {
            setEmptyPage(false);
          }
        } else {
          if (list.length === 0) {
            setPage(page-1);
            setEmptyPage(true);
          }
        }
        getUnreadCount();
      })
      .catch((err) => {
        showError(err + "");
        if (list.length == 0) {
          setEmptyPage(true);
        }
      });
  };

  useEffect(() => {
    getData();
    getUnreadCount();
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  const removeInbox = async () => {
    const data = {
      inbox_unique_id: inbox_unique_id,
    };
    await AxiosInstance.put("/operator/remove-inbox", data)
      .then((response) => {
        handleCloze();
        getData();
        showSuccess("Sizin hatynyz ustunlikli pozuldy !!!");
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  appSocket.on("onInbox",(arg,callback)=>{
    if(arg.unique_id==localStorage.getItem('unique_id')){
      setPage(1);
    }
  })

  const markAsRead = async () => {
    const data = {
      inbox_unique_id: inbox_unique_id,
    };
    await AxiosInstance.put("/operator/mark-as-read", data)
      .then((response) => {
        handleCloze();
        getData();
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  return (
    <div className="inboxCard container">
      <div className="courierHeader">
        <h3>Gelyan mesajlar</h3>
        <Send getData={getData} />
      </div>
      {(typeof list === "undefined" || list.length <= 0) && !isEmptyPage ? (
        <Loading />
      ) : (typeof list === "undefined" || list.length <= 0) && isEmptyPage ? (
        <Empty />
      ) : (
        <>
          {list.map((item, i) => {
            return (
              <div
                className="inboxCardContainer"
                style={
                  item.is_read
                    ? { borderLeftColor: `#b1b1b1` }
                    : { borderLeftColor: `#5e9cce` }
                }
                key={`inbox_key${i}`}
              >
                <Stack direction="column" pt={3} pl={2} pr={3} pb={3}>
                  <Stack direction="row" justifyContent="space-between">
                    <label style={{ fontWeight: "600" }}>{item.title}</label>
                    <IconButton
                      tooltip="Description here"
                      hoveredstyle={hoveredstyle}
                      style={{ color: "#5E9CCE" }}
                      aria-controls={opem ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={opem ? "true" : undefined}
                      onClick={(e) => handleClick(e, item.unique_id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Stack>
                  <Stack direction="row" spacing={10}>
                    <label style={{ fontWeight: "600" }}>
                      {item.sender_name == null
                        ? item.sender_courier_name
                        : item.sender_name}
                    </label>
                    <Stack direction="row" spacing={3}>
                      <label>
                        {item.created_at.split("T")[0]} /{" "}
                        {`${item.created_at.split("T")[1].split(":")[0]}:${
                          item.created_at.split("T")[1].split(":")[1]
                        }`}
                      </label>
                      {/* <label>{item.}</label> */}
                    </Stack>
                  </Stack>
                  <Description
                    item={item}
                    markAsRead={markAsRead}
                    getData={getData}
                    setInbox_unique_id={setInbox_unique_id}
                  />
                </Stack>
              </div>
            );
          })}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={opem}
            onClose={handleCloze}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={removeInbox}>Delete</MenuItem>
            <MenuItem onClick={markAsRead}>Mark as read</MenuItem>
          </Menu>
          <Stack mt={10} justifyContent="center" direction="row">
            <Pagination
              color="primary"
              count={page_count}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default InboxCard;
