import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const BasicSelect = (props) => {
  let items = [
    {
      value: 0,
      label: "Tazeden kona",
    },
    {
      value: 1,
      label: "Koneden taza",
    },
    {
      value: 2,
      label: "A-dan Z-a",
    },
    {
      value: 3,
      label: "Z-dan A-a",
    },
  ];
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    props.setSortBy(value);
  }, [value]);

  return (
    <Box>
      <FormControl style={{ width: "130px" }}>
        <InputLabel style={{ marginTop: "-7px" }} id="demo-simple-select-label">
          {items[value].label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={items[value].label}
          style={{ borderRadius: "50px", height: "40px", textAlign: "center" }}
          renderValue={(selected) => selected.join(", ")}
        >
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ padding: "20px" }}
          >
            {items.map((item, i) => {
              return (
                <FormControlLabel
                  value={item.value}
                  control={<Radio />}
                  label={item.label}
                  key={`select__${i}`}
                />
              );
            })}
          </RadioGroup>
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
