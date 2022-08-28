import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import {IconButton, Stack} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";

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

const CustomerPerPage = (props) => {
  const [value, setValue] = React.useState(20);

  React.useEffect(() => {
    props.setPerPage(value);
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
        Sahypa sany
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
              <FormControlLabel value="20" control={<Radio />} label="20 sany" />
              <FormControlLabel value="40" control={<Radio />} label="40 sany" />
              <FormControlLabel value="60" control={<Radio />} label="60 sany" />
              <FormControlLabel value="80" control={<Radio />} label="80 sany" />
              <FormControlLabel value="100" control={<Radio />} label="100 sany" />
            </RadioGroup>
          </FormControl>

          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <IconButton onClick={()=>setValue(value-1)}><RemoveIcon/></IconButton>
            <Typography>{value}</Typography>
            <IconButton onClick={()=>setValue(value+1)}><AddIcon/></IconButton>
          </Stack>



        </div>
      </Menu>
    </div>
  );
};



export default CustomerPerPage;
