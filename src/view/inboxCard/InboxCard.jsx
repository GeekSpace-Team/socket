import React, {useEffect, useState} from "react";
import {Stack, IconButton, Pagination, Modal} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "../../style/inbox/inbox.css";
import Send from "./Send";
import Description from "./Description";
import {AxiosInstance, LocalAxiosInstance} from "../../api-interface/api/AxiosInstance.mjs";
import {showError, showSuccess} from "../Alert/Alert";
import {ToastContainer} from "react-toastify";
import Loading from "../../common/Loading";
import Empty from "../../common/Empty";
import {appSocket, onlineSocket} from "../../api-interface/socket-io/socket.mjs";
import {useContext} from "react";
import {AppContext} from "../../App";
import {checkPermission, convertTimeStampToDate, convertTimeStampToTime} from "../../common/utils.mjs";
import {Box} from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";
import {NavLink} from "react-router-dom";

const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "#FAFCFB",
    //   border: "1px solid red",
    //   boxShadow: 24,
    borderRadius: "16px",
    borderColor: "#5E9CCE",
    p: 3,
};

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

    const {online} = useContext(AppContext);

    const getUnreadCount = () => {
        let axios = online ? AxiosInstance : LocalAxiosInstance;
        axios.get('/operator/get-unread-inbox-count')
            .then(response => {
                if (!response.data.error) {
                    props.setUnreadCount(response.data.body.unread_inbox_count);
                }
            })
            .catch(err => {
            })
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
        let axios = online ? AxiosInstance : LocalAxiosInstance;
        axios.get("/operator/get-inbox?page=" + page)
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
                        setPage(page - 1);
                        setEmptyPage(true);
                    } else {
                        setEmptyPage(false);
                    }
                } else {
                    if (list.length === 0) {
                        setPage(page - 1);
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
        let axios = online ? AxiosInstance : LocalAxiosInstance;
        axios.put("/operator/remove-inbox", data)
            .then((response) => {
                handleCloze();
                getData();
                showSuccess("Sizin hatynyz ustunlikli pozuldy !!!");
            })
            .catch((err) => {
                showError(err + "");
            });
    };

    useEffect(()=>{
        onlineSocket.on("onInbox", (arg, callback) => {
            if (arg.unique_id == localStorage.getItem('unique_id')) {
                getUnreadCount();
            }
        })
    },[]);


    const markAsRead = async () => {
        const data = {
            inbox_unique_id: inbox_unique_id,
        };
        let axios = online ? AxiosInstance : LocalAxiosInstance;
        axios.put("/operator/mark-as-read", data)
            .then((response) => {
                handleCloze();
                getData();
            })
            .catch((err) => {
                showError(err + "");
            });
    };
    const {permissions} = useContext(AppContext);


    // Open
    const [openn, setOpenn] = React.useState(false);
    const handleOpenn = (item) => {
        setOpenn(true);
        setInboxItem(item);
        markAsRead2(item.unique_id);
    };
    const handleClosee = () => setOpenn(false);

    const markAsRead2 = async (inbox_unique_id) => {
        const data = {
            inbox_unique_id: inbox_unique_id,
        };
        let axios = online ? AxiosInstance : LocalAxiosInstance;
        axios.put("/operator/mark-as-read", data)
            .then((response) => {
                getData();
            })
            .catch((err) => {
                showError(err + "");
            });
    };

    const [inbox_item, setInboxItem] = useState(null);

    const getValue=(value)=>{
      try {
        if(typeof value !== 'undefined' && value != null){
          return value;
        } else {
          return '';
        }
      } catch (err){
        return '';
      }
    }


    return (
        <div className="inboxCard container">
            <div className="courierHeader">
                <h3>Gelyan mesajlar</h3>
                {
                    checkPermission('inbox', permissions).write ?
                        <Send getData={getData}/>
                        : null
                }
            </div>
            {(typeof list === "undefined" || list.length <= 0) && !isEmptyPage ? (
                <Loading/>
            ) : (typeof list === "undefined" || list.length <= 0) && isEmptyPage ? (
                <Empty/>
            ) : (
                <>
                    {list.map((item, i) => {
                        return (
                            <div

                                className="inboxCardContainer"
                                style={
                                    item.is_read
                                        ? {borderLeftColor: `#b1b1b1`}
                                        : {borderLeftColor: `#5e9cce`}
                                }
                                key={`inbox_key${i}`}
                            >
                                <Stack direction="column" pt={3} pl={2} pr={3} pb={3}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <label style={{fontWeight: "600"}}>{item.title}</label>
                                        <IconButton
                                            tooltip="Description here"
                                            hoveredstyle={hoveredstyle}
                                            style={{color: "#5E9CCE"}}
                                            aria-controls={opem ? "basic-menu" : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={opem ? "true" : undefined}
                                            onClick={(e) => handleClick(e, item.unique_id)}
                                        >
                                            <MoreVertIcon/>
                                        </IconButton>
                                    </Stack>
                                    <Stack
                                        onClick={()=>handleOpenn(item)}
                                        direction="row" spacing={10}>
                                        <label style={{fontWeight: "600"}}>
                                            {item.sender_name == null
                                                ? item.sender_courier_name
                                                : item.sender_name}
                                        </label>
                                        <Stack
                                            onClick={()=>handleOpenn(item)}
                                            direction="row" spacing={3}>
                                            <label>
                                                {`${convertTimeStampToDate(item.created_at)} / ${convertTimeStampToTime(item.created_at)}`}
                                            </label>
                                            {/* <label>{item.}</label> */}
                                        </Stack>
                                    </Stack>
                                    <Stack
                                        onClick={()=>handleOpenn(item)}
                                        mt={3}>
                                        <label>{item.message}</label>
                                    </Stack>
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
                        {
                            checkPermission('inbox', permissions).delete ?
                                <MenuItem onClick={removeInbox}>Pozmak</MenuItem>
                                : null
                        }

                        <MenuItem onClick={markAsRead}>Okadym</MenuItem>
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
            <ToastContainer/>

          {
            inbox_item!=null
              ?
                <Modal
                    open={openn}
                    onClose={handleClosee}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                  <Box sx={style1}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems={"center"}
                    >
                      <label style={{fontWeight: "600"}}>{getValue(inbox_item.title)}</label>
                      <IconButton
                          tooltip="Description here"
                          hoveredstyle={hoveredstyle}
                          onClick={handleClosee}
                      >
                        <ClearIcon/>
                      </IconButton>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" mt={1}>
                      <label style={{fontWeight: "600"}}>
                        {inbox_item.sender_name == null
                            ? getValue(inbox_item.sender_courier_name)
                            : getValue(inbox_item.sender_name)}
                      </label>
                      <label>
                        {getValue(inbox_item.created_at)!=''?
                            `${convertTimeStampToDate(inbox_item.created_at)} / ${convertTimeStampToTime(inbox_item.created_at)}`
                            :
                            ''}
                      </label>
                    </Stack>
                    <Stack mt={2}>
                      <label>{getValue(inbox_item.message)}</label>
                    </Stack>
                      {
                          inbox_item.link_to_goal!=null && inbox_item.link_to_goal!=''
                          ?
                              <Stack mt={3} pb={5}>
                                  <NavLink
                                      style={{color: "#5E9CCE", textUnderlineOffset: "2px"}}
                                      to={`${inbox_item.link_to_goal}`}
                                  >
                                      Sahypa git
                                  </NavLink>
                              </Stack>
                              :
                              null
                      }
                  </Box>
                </Modal>
                :
                null
          }
        </div>
    );
};

export default InboxCard;
