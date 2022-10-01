import "../../style/ringing-call/ringing-call.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CallInfoModal from "../missed-calls/CallInfoModal";
import CallMadeIcon from "@mui/icons-material/CallMade";
import Empty from "../../common/Empty";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loading from "../../common/Loading";
import Pagination from "@mui/material/Pagination";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import React, { useContext, useEffect, useState } from "react";
import RingingCallFilter from "./RingingCallFilter";
import RingingCallSort from "./RingingCallSort";
import RingingExport from "./RingingExport";
import RingingPerPage from "./RingingPerPage";
import Typography from "@mui/material/Typography";
import { CSVDownload, CSVLink } from "react-csv";
import { downloadExcel } from "react-export-table-to-excel";
import { AppContext } from "../../App";
import { AxiosInstance, LocalAxiosInstance } from "../../api-interface/api/AxiosInstance.mjs";
import { convertTimeStampToDate, isOperator } from "../../common/utils.mjs";
import { showError } from "../Alert/Alert";
import { IosShare } from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";

const RinginCallCard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [incoming, setIncoming] = useState(true);
  const [outgoing, setOutgoing] = useState(true);
  const [page, setPage] = useState(1);
  const [page_count, setPageCount] = useState(0);
  const [sortBy, setSortBy] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [isEmptyPage, setEmptyPage] = useState(false);
  const [fields, setFileds] = useState([]);

  const [list, setList] = useState([]);

  const { online } = useContext(AppContext);

  useEffect(() => {
    setPage(1);
  }, [perPage]);



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
    const axios = isOperator() ? LocalAxiosInstance : AxiosInstance;
    await axios.post(isOperator() ? "/operator/get-accepted-calls" : "/operator/get-accepted-calls-admin", data)
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

  const getFields = async () => {
    let axios = online ? AxiosInstance : LocalAxiosInstance;
    await axios.get("/operator/get-fields")
      .then((response) => {
        setFileds(response.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFields();
    getData();
  }, []);

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


  function handleDownloadExcel() {
    let keys = Object.keys(list[0]);
    console.log(keys);
    downloadExcel({
      fileName: "react-export-table-to-excel -> downloadExcel method",
      sheet: "Kabul edilen jaňlar",
      tablePayload: {
        keys,
        // accept two different data structures
        body: list,
      },
    });
  }



  return (
    <div className="RingingCallContainer container">
      {/* header section starts here */}
      <div className="ringingHeader">
        <h3>Kabul edilen jaňlar</h3>
        <Button startIcon={<IosShare />} sx={{ color: 'black' }} variant={'text'}><CSVLink data={list} style={{ textDecoration: 'none', color: 'black' }}
          filename={`Kabul edilen jaňlar ${new Date()}.csv`}>Eksport</CSVLink></Button>
      </div>
      {/* header section ends here */}

      <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 3 }}>
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

      {(typeof list === "undefined" || list.length <= 0) && !isEmptyPage ? (
        <Loading />
      ) : (typeof list === "undefined" || list.length <= 0) && isEmptyPage ? (
        <Empty />
      ) : (
        <>
          {/* filter section starts here */}

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
                            <span>
                              {item.call_direction == "0" ? (
                                "Giriş jaň"
                              ) : (
                                "Çykyş jaň"
                              )}
                            </span>
                          </Stack>
                          <Stack direction="row" spacing={7}>
                            <span>{item.phone_number}</span>
                            <CallInfoModal
                              getData={getData}
                              fields={fields}
                              item={item}
                              key={`customer_update_ringing_$`}
                            />
                          </Stack>
                        </Stack>
                        <Stack direction={'row'} justifyContent='space-between'>
                          <h3>
                            {item.user_full_name == "--------"
                              ? "Näbelli müşderi"
                              : item.user_full_name}
                          </h3>
                          <h3>
                            {
                              isOperator() ? `` : `${item.operator_fullname} / ${item.sell_point_name}`
                            }
                          </h3>
                        </Stack>
                      </div>
                      <div className="callDate">
                        <Stack direction="row" spacing={12} mb={3}>
                          <span>{convertTimeStampToDate(item.call_date)}</span>
                          <span>{item.call_time}</span>
                        </Stack>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>
                              Jaňlar{" "}
                              <span style={{ color: "#3570A2" }}>
                                ({item.call_history.length})
                              </span>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <hr />
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
                                          ? "Giriş jaň"
                                          : "Çykyş jaň"}
                                      </span>
                                      <span>{call_item.call_time}</span>
                                      <span>{`${parseInt(
                                        call_item.call_duration / 60
                                      )} min, ${call_item.call_duration % 60
                                        } sek`}</span>
                                    </Stack>
                                    <hr />
                                  </>
                                );
                              })}

                            <CallInfoModal
                              getData={getData}
                              fields={fields}
                              wich={"show-all"}
                              item={item}
                              key={`customer_update_ringing_$`}
                            />
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
