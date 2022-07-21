import React from "react";
import Export from "../common-view/Export";
import BasicSelect from "../../view/common-view/BasicSelect";
import FilterSelect from "../../view/common-view/FilterSelect";
import PerPageSelect from "../../view/common-view/PerPageSelect";
import { Grid, Pagination, Stack } from "@mui/material";
import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../../style/missed-call/missed-call.css";
import CallInfoModal from "./CallInfoModal";

const MissedCalls = () => {
  return (
    <div className="MmissedCallContainer">
      {/* header section starts here */}
      <div className="missedHeader">
        <h3>Goyberilen janlar</h3>
        <Export />
      </div>
      {/* header section ends here */}

      {/* filter section starts here */}
      <div className="missedFilter">
        <BasicSelect />
        <FilterSelect />
        <PerPageSelect />
      </div>
      {/* filter section ends here */}

      {/* missed call section starts here */}
      <div className="missedCallThirdSection">
        <Grid container mt={2}>
          <Grid item lg={6} md={6} xs={12} sm={12}>
            <div className="MissedCallContainer">
              <div className="MissedCallHeader">
                <Stack direction="row" justifyContent={"space-between"}>
                  <Stack direction="row" spacing={2}>
                    <AddIcCallOutlinedIcon />
                    <span>Missed call</span>
                  </Stack>
                  <Stack direction="row" spacing={7}>
                    <span>+99363430338</span>
                    <CallInfoModal />
                  </Stack>
                </Stack>
                <h3>Gayypov Halil Cherkezowich</h3>
              </div>
              <div className="CallDate">
                <Stack direction="row" spacing={12} mb={3}>
                  <span>12.12.2022</span>
                  <span>12 min, 12 sek</span>
                </Stack>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      Janlar <span style={{ color: "#3570A2" }}>(3)</span>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <hr />
                    <Typography>Today</Typography>
                    <Stack
                      direction={"row"}
                      justifyContent="space-between"
                      mt={3}
                    >
                      <span>Cykys jan</span>
                      <span>14:50</span>
                      <span>12 min, 21 sek</span>
                    </Stack>
                    <hr />
                    <Stack
                      direction={"row"}
                      justifyContent="space-between"
                      mt={1}
                    >
                      <span>Giris jan</span>
                      <span>14:50</span>
                      <span>12 min, 21 sek</span>
                    </Stack>
                    <hr />
                    <Stack
                      direction={"row"}
                      justifyContent="space-between"
                      mt={1}
                    >
                      <span>Giris jan</span>
                      <span>14:50</span>
                      <span>12 min, 21 sek</span>
                    </Stack>
                    <CallInfoModal wich={"show-all"} />
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      {/* missed call section ends here */}
      <Stack mt={10} justifyContent="center" direction="row">
        <Pagination color="primary" count={10} />
      </Stack>
    </div>
  );
};

export default MissedCalls;
