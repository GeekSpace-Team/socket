import * as React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from "@mui/material/Typography";
import { Select, Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AppContext } from "../../App";

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

export default function CustomerFilter(props) {
  const [start, setStart] = React.useState();
  const [end, setEnd] = React.useState();

  const { fields } = React.useContext(AppContext);

  React.useEffect(() => {
    props.setStartDate(start);
  }, [start]);

  React.useEffect(() => {
    props.setEndDate(end);
  }, [end]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStartDate = (date) => {
    let d = new Date(date);
    setStart(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
  }

  const handleEndDate = (date) => {
    let d = new Date(date);
    setEnd(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
  }



  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant={'outlined'}
        style={{ border: '1px solid', borderRadius: '22px', paddingLeft: '16px', paddingRight: '16px' }}
        sx={{ color: '#585858', borderColor: '#585858' }}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        Filtr
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{ borderRadius: '12px' }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div style={{ padding: '20px' }}>
          <Typography>Wagt boýunça</Typography>
          <Stack direction={'row'} sx={{ mt: 2 }}>
            <Typography sx={{ backgroundColor: '#F1F1F1', padding: '8px', border: '1px solid #B1B1B1', width: '150px' }}>Başlangyç sene</Typography>
            <Typography sx={{ padding: '8px', border: '1px solid #B1B1B1' }}><input type={"date"} className={'datePicker'} onChange={e => handleStartDate(e.target.value)} /></Typography>
          </Stack>

          <Stack direction={'row'} sx={{ mt: 2 }}>
            <Typography sx={{ backgroundColor: '#F1F1F1', padding: '8px', border: '1px solid #B1B1B1', width: '150px' }}>Ahyrky sene</Typography>
            <Typography sx={{ padding: '8px', border: '1px solid #B1B1B1' }}><input type={"date"} className={'datePicker'} onChange={e => handleEndDate(e.target.value)} /></Typography>
          </Stack>
          <br />
          <Typography>Status boýunça</Typography>
          <br/>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.status}
            fullWidth={true}
            variant={'standard'}
            onChange={(e) => props.setStatus(e.target.value)}
          >
            <MenuItem value={0}>Hiçisi</MenuItem>
            {fields.customer_status == null
              ? ""
              : fields.customer_status.map((item, i) => {
                return (
                  <MenuItem key={`status_key${i}`} value={item.id}>
                    {item.value}
                  </MenuItem>
                );
              })}
          </Select>
        </div>

      </Menu>
    </div>
  );
}
