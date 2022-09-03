import React, {useContext, useEffect} from "react";
import {
  Badge, Button,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper, Stack, Switch,
} from "@mui/material";
import MuiListItem from "@material-ui/core/ListItem";
import {Link, Outlet, useLocation} from "react-router-dom";
import { sidebarItems } from "./layout/sidebar/Sidebar";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import MailIcon from '@mui/icons-material/Mail';
import { useState } from "react";
import {appSocket, onlineSocket} from "./api-interface/socket-io/socket.mjs";
import {AxiosInstance, LocalAxiosInstance} from "./api-interface/api/AxiosInstance.mjs";
import '../src/style/sidebar/sidebar.css';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { css } from "@emotion/react";
import {Logout} from "@mui/icons-material";
import {AppContext} from "./App";
import LoadingOverlay from 'react-loading-overlay';
import {checkPermissionSidebar, loginChecker} from "./common/utils.mjs";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const ListItem = withStyles({
  root: {
    "&":{
      padding:'4px',
      marginTop:'6px',
      textAlign:'center',
      borderRadius:'25px',
    },
    "&$selected": {
      backgroundColor: "#D5E4ED",
      color: "#3570A2",
      padding:'4px',
      fontWeight:'bold',
      textAlign:'center',
      borderRadius:'25px',
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      "& .MuiListItemIcon-root": {
        color: "#3570A2"
      }
    },
    "&$selected:hover": {
      backgroundColor: "#D5E4ED",
      color: "#3570A2",
      "& .MuiListItemIcon-root": {
        color: "#3570A2"
      }
    },
    "&:hover": {
      backgroundColor: "#D5E4ED",
      color: "#3570A2",
      "& .MuiListItemIcon-root": {
        color: "#3570A2"
      }
    }
  },
  selected: {}
})(MuiListItem);

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));


const Sidebar = (props) => {
  const classes = useStyles();
  const { window1 } = props;
  const [selected, setSelected] = React.useState(0);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const setTitle = React.useState(sidebarItems[0].title);
  const {online}=useContext(AppContext);
  const {permissions}=useContext(AppContext);

  
  



  const getUnreadCount=()=>{
    let axios=online?AxiosInstance:LocalAxiosInstance;
    axios.get('/operator/get-unread-inbox-count')
        .then(response=>{
          if(!response.data.error){
            props.setUnreadCount(response.data.body.unread_inbox_count);
          }
        })
        .catch(err=>{})
  }

  useEffect(()=>{
   getUnreadCount();
    onlineSocket.on("onInbox",(arg,callback)=>{
      if(arg.unique_id==localStorage.getItem('unique_id')){
        props.setUnreadCount(arg.unread_inbox_count);
      }
    })
  },[]);

  useEffect(()=>{
    getUnreadCount();
  },[online]);



  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSelect = (index, title) => {
    setSelected(index);
  };

  const logout=()=>{
    let axios=online?AxiosInstance:LocalAxiosInstance;
    axios.post('/operator/auth-v2/log-out')
        .then(result=>{
          window.sessionStorage.setItem("token",'');
          window.location.href="/login";
        })
        .catch(err=>{
          alert(err+"")
          alert(err+"")
        });
  }

  let location = useLocation();
  const [currentPage,setCurrentPage]=React.useState('');

  React.useEffect(() => {
    loginChecker();
    setCurrentPage(location.pathname);

  }, [location]);

  const drawer = (
    <Paper
      sx={{ height: "100vh", bottom: 0, paddingLeft:'12px',paddingRight:'12px' }}
      style={{ maxHeight: "100vh", overflow: "auto" }}
    >
      <Divider />
      <List style={{ maxHeight: "100%", overflow: "auto" }}>
        {sidebarItems.map((sidebarItem, i) => (
            checkPermissionSidebar(permissions,sidebarItem.link).read?
                <Link
                    to={sidebarItem.link}
                    style={{
                      textDecoration: "none",
                      color: "#000000",
                    }}
                    key={`${sidebarItem.title}___`}
                >
                  <ListItem
                      selected={currentPage==sidebarItem.link}
                      onClick={() => handleSelect(i, sidebarItem.title)}
                      key={sidebarItem.title}
                      disablePadding
                  >
                    <ListItemButton

                        sx={{ textDecoration: "none", background:'transparent'}}
                        style={{background:'transparent'}}
                    >
                      <ListItemIcon color="action">{sidebarItem.icon}</ListItemIcon>
                      <ListItemText primary={sidebarItem.title} color="action" />

                      {
                        sidebarItem.link=='/inbox'?
                            <Badge badgeContent={props.unreadCount} color="primary">
                            </Badge>
                            :
                            null
                      }
                    </ListItemButton>
                  </ListItem>
                </Link>
                :null
        ))}
      </List>
      <br/>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent={'center'}>
        <Typography variant={'body1'} sx={{fontWeight:'bold'}}>Internet: </Typography>
        <Typography>Off</Typography>
        <AntSwitch checked={online} onChange={e=>props.setOnline(e.target.checked)} inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>On</Typography>
      </Stack>
      <br/>
      <center>
        <Button startIcon={<Logout/>} onClick={()=>logout()}>Ulgamdan çykmak</Button>
      </center>
    </Paper>
  );

  const container =
    window1
    !== undefined ? () => window1().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>

      <CssBaseline />



      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window1: PropTypes.func,
};
export default Sidebar;
