import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

export default function PerPageSelect() {
  const [page, setPage] = React.useState("");

  const handleChange = (event) => {
    setPage(event.target.value);
  };

  return (
    <Box>
      <FormControl style={{ width: "130px" }}>
        <InputLabel style={{ marginTop: "-7px" }} id="demo-simple-select-label">
          Per page
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={page}
          label="Page"
          style={{ borderRadius: "50px", height: "40px", textAlign: "center" }}
          onChange={handleChange}
        >
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            style={{ padding: "20px" }}
          >
            <FormControlLabel value="20" control={<Radio />} label="20 items" />
            <FormControlLabel value="40" control={<Radio />} label="40 items" />
            <FormControlLabel value="60" control={<Radio />} label="60 items" />
            <FormControlLabel value="80" control={<Radio />} label="80 items" />
            <FormControlLabel
              value="100"
              control={<Radio />}
              label="100 items"
            />
            <FormControlLabel value="all" control={<Radio />} label="See all" />
          </RadioGroup>
          <Button
            style={{
              marginLeft: "20px",
              borderRadius: "16px",
              textTransform: "none",
              background: "#5e9cce",
              marginBottom: "10px",
            }}
            variant="contained"
          >
            Custom input
          </Button>
        </Select>
      </FormControl>
    </Box>
  );
}
