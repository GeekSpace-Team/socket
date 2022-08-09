import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

const ITEM_HEIGHT = 78;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 190,
      marginLeft: 30,
    },
  },
};

const MissedPerPage = (props) => {
  const [value, setValue] = React.useState(20);

  React.useEffect(() => {
    props.setPerPage(value);
  }, [value]);
  return (
    <div>
      <Box>
        <FormControl style={{ width: "130px" }}>
          <InputLabel
            style={{ marginTop: "-7px" }}
            id="demo-simple-select-label"
          >
            Per page
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Page"
            style={{
              borderRadius: "50px",
              height: "40px",
              textAlign: "center",
            }}
            MenuProps={MenuProps}
          >
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              style={{ padding: "20px" }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <FormControlLabel
                value="20"
                control={<Radio />}
                label="20 items"
              />
              <FormControlLabel
                value="40"
                control={<Radio />}
                label="40 items"
              />
              <FormControlLabel
                value="60"
                control={<Radio />}
                label="60 items"
              />
              <FormControlLabel
                value="80"
                control={<Radio />}
                label="80 items"
              />
              <FormControlLabel
                value="100"
                control={<Radio />}
                label="100 items"
              />
            </RadioGroup>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "20ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Custom input"
                variant="standard"
                type={"number"}
                defaultValue={20}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Box>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default MissedPerPage;
