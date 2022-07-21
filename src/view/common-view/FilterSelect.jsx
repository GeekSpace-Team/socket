import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

export default function FilterSelect() {
  const [filter, setFilter] = React.useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Box>
      <FormControl style={{ width: "130px" }}>
        <InputLabel style={{ marginTop: "-7px" }} id="demo-simple-select-label">
          Filter
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Filter"
          style={{ borderRadius: "50px", height: "40px", textAlign: "center" }}
          onChange={handleChange}
        >
          <FormLabel
            id="demo-radio-buttons-group-label"
            style={{ padding: "20px", paddingTop: "30px" }}
          >
            Status boyunca
          </FormLabel>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            style={{ padding: "20px" }}
          >
            <FormControlLabel
              value="cykys"
              control={<Radio />}
              label="cykys jan"
            />
            <FormControlLabel
              value="girish"
              control={<Radio />}
              label="Girish jan"
            />
          </RadioGroup>
        </Select>
      </FormControl>
    </Box>
  );
}
