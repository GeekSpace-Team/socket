import React, { useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CallInfoModal from "../missed-calls/CallInfoModal";
import Pagination from "@mui/material/Pagination";
import { AxiosInstance } from "../../api-interface/api/AxiosInstance.mjs";
import { showError } from "../Alert/Alert";
import RingingCallFilter from "./RingingCallFilter";
import RingingCallSort from "./RingingCallSort";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import CallMadeIcon from "@mui/icons-material/CallMade";
import RingingPerPage from "./RingingPerPage";
import "../../style/ringing-call/ringing-call.css";
import RingingExport from "./RingingExport";
import Empty from "../../common/Empty";
import Loading from "../../common/Loading";

const RinginCallCard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [incoming, setIncoming] = useState(false);
  const [outgoing, setOutgoing] = useState(false);
  const [page, setPage] = useState(1);
  const [page_count, setPageCount] = useState(0);
  const [sortBy, setSortBy] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [isEmptyPage, setEmptyPage] = useState(false);

  const [list, setList] = useState([]);

  const getData = async () => {
    const data = {
      startDate: startDate,
      endDate: endDate,
      incoming: incoming,
      outgoing: outgoing,
      page: page,
      perPage: perPage,
      sortBy: parseInt(sortBy),
    };
    // console.log(data);
    await AxiosInstance.post("/operator/get-accepted-calls", data)
      .then((response) => {
        if (!response.data.error) {
          setList(response.data.body.calls);

          if (page === 1) {
            setPageCount(response.data.body.page_count);
          }
          if (
            typeof response.data.body.inbox === "undefined" ||
            response.data.body.inbox.length <= 0
          ) {
            setEmptyPage(true);
          } else {
            setEmptyPage(false);
          }
        } else {
          if (list.length === 0) {
            setEmptyPage(true);
          }
        }
      })
      .catch((err) => {
        showError(err + "");
        if (list.length === 0) {
          setEmptyPage(true);
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [list]);
  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    getData();
  }, [sortBy]);

  useEffect(() => {
    getData();
  }, [startDate]);

  useEffect(() => {
    getData();
  }, [endDate]);

  useEffect(() => {
    getData();
  }, [incoming]);

  useEffect(() => {
    getData();
  }, [outgoing]);

  useEffect(() => {
    getData();
  }, [perPage]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className="RingingCallContainer container">
      {/* header section starts here */}
      <div className="ringingHeader">
        <h3>Kabul edilen janlar</h3>
        <RingingExport />
      </div>
      {/* header section ends here */}

      {(typeof list === "undefined" || list.length <= 0) && !isEmptyPage ? (
        <Loading />
      ) : (typeof list === "undefined" || list.length <= 0) && isEmptyPage ? (
        <Empty />
      ) : (
        <>
          {/* filter section starts here */}
          <Stack direction="row" alignItems="center" spacing={3}>
            <RingingCallSort sortBy={sortBy} setSortBy={setSortBy} />

            <RingingCallFilter
              startDate={startDate}
              endDate={endDate}
              incoming={incoming}
              outgoing={outgoing}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setIncoming={setIncoming}
              setOutgoing={setOutgoing}
            />
            <RingingPerPage perPage={perPage} setPerPage={setPerPage} />
          </Stack>
          {/* filter section ends here */}

          {/* missed call section starts here */}
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            columns={12}
          >
            {list.map((item, i) => {
              return (
                <Grid item sm={1} md={6} lg={6}>
                  <div
                    className="ringingCallThirdSection"
                    key={`accept_call_key${i}`}
                  >
                    <div className="missedCallContainer">
                      <div className="missedCallHeader">
                        <Stack direction="row" justifyContent={"space-between"}>
                          <Stack direction="row" spacing={2}>
                            {item.call_direction == "0" ? (
                              <PhoneCallbackIcon />
                            ) : (
                              <CallMadeIcon />
                            )}
                            <span>Missed call</span>
                          </Stack>
                          <Stack direction="row" spacing={7}>
                            <span>{item.phone_number}</span>
                            <CallInfoModal item={item} />
                          </Stack>
                        </Stack>
                        <h3>
                          {item.user_full_name == "--------"
                            ? "Näbelli müşderi"
                            : item.user_full_name}
                        </h3>
                      </div>
                      <div className="callDate">
                        <Stack direction="row" spacing={12} mb={3}>
                          <span>{item.call_date.split("T")[0]}</span>
                          <span>{item.call_time}</span>
                        </Stack>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>
                              Janlar{" "}
                              <span style={{ color: "#3570A2" }}>
                                ({item.call_history.length})
                              </span>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <hr />
                            <Typography>Today</Typography>
                            {item.call_history
                              .slice(0, 3)
                              .map((call_item, index) => {
                                return (
                                  <>
                                    <Stack
                                      direction={"row"}
                                      justifyContent="space-between"
                                      mt={3}
                                      key={`cal_history_${index}`}
                                    >
                                      <span>
                                        {call_item.call_direction == 0
                                          ? "Giris jan"
                                          : "Cykys jan"}
                                      </span>
                                      <span>{call_item.call_time}</span>
                                      <span>{`${parseInt(
                                        call_item.call_duration / 60
                                      )} min, ${
                                        call_item.call_duration % 60
                                      } sek`}</span>
                                    </Stack>
                                    <hr />
                                  </>
                                );
                              })}

                            <CallInfoModal wich={"show-all"} item={item} />
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
          {/* missed call section ends here */}
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
    </div>
  );
};

export default RinginCallCard;
