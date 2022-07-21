import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function BasicSelect() {
  const [sort, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box>
      <FormControl style={{ width: "130px" }}>
        <InputLabel style={{ marginTop: "-7px" }} id="demo-simple-select-label">
          Sort
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort"
          style={{ borderRadius: "50px", height: "40px", textAlign: "center" }}
          onChange={handleChange}
        >
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            style={{ padding: "20px" }}
          >
            <FormControlLabel
              value="tazeden"
              control={<Radio />}
              label="Tazeden kona"
            />
            <FormControlLabel
              value="koneden"
              control={<Radio />}
              label="Koneden taza"
            />
            <FormControlLabel
              value="A-dan"
              control={<Radio />}
              label="A-dan Z-a"
            />
            <FormControlLabel
              value="Z-dan"
              control={<Radio />}
              label="Z-dan A-a"
            />
          </RadioGroup>
        </Select>
      </FormControl>
    </Box>
  );
}
