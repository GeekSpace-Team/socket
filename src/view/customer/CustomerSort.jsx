import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import FormLabel from "@mui/material/FormLabel";

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

const CustomerSort = (props) => {
  const [value, setValue] = React.useState(props.sortBy);

  React.useEffect(() => {
    props.setSortBy(value);
  }, [value]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant={'outlined'}
          style={{ border: '1px solid',borderRadius:'22px',paddingLeft:'16px',paddingRight:'16px' }}
          sx={{color:'#585858',borderColor:'#585858'}}
          endIcon={open?<KeyboardArrowUpIcon/>:<KeyboardArrowDownIcon/>}
      >
        Sort
      </Button>
      <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          style={{borderRadius:'12px'}}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
      >
        <div style={{padding:'20px'}}>
          <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="0"
                name="radio-buttons-group"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
              <FormControlLabel value="0" control={<Radio />} label="Täzeden könä" />
              <FormControlLabel value="1" control={<Radio />} label="Köneden täzä" />
              <FormControlLabel value="2" control={<Radio />} label="A-dan Z-a" />
              <FormControlLabel value="3" control={<Radio />} label="Z-dan A-a" />
            </RadioGroup>
          </FormControl>

        </div>
      </Menu>
    </div>
  );
};

export default CustomerSort;
