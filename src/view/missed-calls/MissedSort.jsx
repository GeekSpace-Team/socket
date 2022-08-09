import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";

const ITEM_HEIGHT = 58;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 230,
      marginLeft: 43,
    },
  },
};

const MissedSort = (props) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    props.setSortBy(value);
  }, [value]);
  return (
    <div>
      <FormControl sx={{ m: 1, width: 150 }}>
        <InputLabel
          style={{ marginTop: "-7px" }}
          id="demo-multiple-checkbox-label"
        >
          {items[value].label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={items[value].label}
          style={{ borderRadius: "50px", height: "40px" }}
          MenuProps={MenuProps}
        >
          <MenuItem>
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
            {/* <Checkbox checked={personName.indexOf(name) > -1} /> */}
            <ListItemText />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default MissedSort;
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
