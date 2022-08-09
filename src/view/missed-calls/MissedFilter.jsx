import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

const ITEM_HEIGHT = 68;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 270,
      marginLeft: 63,
    },
  },
};

const MissedFilter = (props) => {
  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(0);
  const [incoming, setIncoming] = React.useState(false);
  const [outgoing, setOutgoing] = React.useState(false);

  React.useEffect(() => {
    props.setStartDate(start);
  }, [start]);
  React.useEffect(() => {
    props.setEndDate(end);
  }, [end]);
  React.useEffect(() => {
    props.setIncoming(incoming);
  }, [incoming]);
  React.useEffect(() => {
    props.setOutgoing(outgoing);
  }, [outgoing]);
  return (
    <Box>
      <FormControl style={{ width: "150px" }}>
        <InputLabel style={{ marginTop: "-7px" }} id="demo-simple-select-label">
          Filter
        </InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Filter"
          style={{
            borderRadius: "50px",
            height: "40px",
            padding: "20px",
            textAlign: "center",
          }}
          MenuProps={MenuProps}
        >
          <Stack p={2} mb={-2}>
            <label style={{ color: "#585858", fontWeight: "600" }}>
              Wagt boyunca
            </label>
          </Stack>
          <Stack p={2} mb={-2} direction="row" alignItems="center">
            {" "}
            <Stack
              alignItems="center"
              p={0.3}
              pl={2}
              pr={1}
              pt={0.4}
              style={{
                background: "#F1F1F1",
                border: "1px solid #B1B1B1",
                borderRadius: "2px 0px 0px 2px",
              }}
            >
              <label htmlFor="startDate">Start date</label>
            </Stack>
            <Stack
              p={0.8}
              alignItems="center"
              style={{
                background: "#F5F8FC",
                borderRadius: "0px 2px 2px 0px",
                border: "1px solid #B1B1B1",
              }}
            >
              <input
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  appearance: "none",
                  MozAppearance: "none",
                }}
                type="date"
                value={props.startDate}
                onChange={(e) => setStart(e.target.value)}
              />
            </Stack>
          </Stack>
          <Stack p={2} direction="row" alignItems="center">
            {" "}
            <Stack
              alignItems="center"
              p={0.3}
              pl={2}
              pr={1.5}
              pt={0.4}
              style={{
                background: "#F1F1F1",
                border: "1px solid #B1B1B1",
                borderRadius: "2px 0px 0px 2px",
              }}
            >
              <label htmlFor="endDate">End date</label>
            </Stack>
            <Stack
              p={0.8}
              alignItems="center"
              style={{
                background: "#F5F8FC",
                borderRadius: "0px 2px 2px 0px",
                border: "1px solid #B1B1B1",
              }}
            >
              <input
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  appearance: "none",
                  MozAppearance: "none",
                }}
                type="date"
                value={props.endDate}
                onChange={(e) => setEnd(e.target.value)}
              />
            </Stack>
          </Stack>
          <Stack p={2} mb={-3}>
            <label style={{ fontWeight: "600", color: "#585858" }}>
              Status boyunca
            </label>
          </Stack>

          <FormGroup style={{ padding: "20px" }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Cykys jan"
              value={props.incoming}
              onChange={(e) => setOutgoing(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Girish jan"
              value={props.outgouing}
              onChange={(e) => setIncoming(e.target.value)}
            />
          </FormGroup>
        </Select>
      </FormControl>
    </Box>
  );
};

export default MissedFilter;
