import { Button, Stack } from "@mui/material";
import React, { useRef } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MapLocation = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
      setMoveMarker({
          lat: props.latitude != null && props.latitude != "" ? props.latitude : 37.8965564,
          lng: props.longitude != null && props.longitude != "" ? props.longitude : 58.3740528,
      });
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [moveMarker, setMoveMarker] = React.useState({
    lat: props.latitude != null && props.latitude != "" ? props.latitude : 37.8965564,
    lng: props.longitude != null && props.longitude != "" ? props.longitude : 58.3740528,
  });

  const mapClicked = (mapProps, map, clickEvent) => {
    setMoveMarker(clickEvent.latLng);
    props.setLatitude(clickEvent.latLng.lat);
    props.setLongitude(clickEvent.latLng.lng);
  };


  return (
    <div>
      <Button
        onClick={handleClickOpen}
        style={{
          borderRadius: "16px",
          textTransform: "none",
          color: "#282828",
          fontWeight: "600",
          width: "100%",
        }}
        variant="outlined"
      >
        Kartadan görkez
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Kartadan görkez
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Ýatda saklat
            </Button>
          </Toolbar>
        </AppBar>
        <Map
          google={props.google}
          zoom={17}
          initialCenter={{
            lat: props.latitude != null && props.latitude != "" ? props.latitude : 37.8965564,
            lng: props.longitude != null && props.longitude != "" ? props.longitude : 58.3740528,
          }}
          mapType="satellite"
          onClick={mapClicked}
        >
          <Marker
            title="Location"
            id={1}
            position={moveMarker}
            draggable={false}
          ></Marker>
        </Map>
      </Dialog>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDjWN9Uw0XBi0DVkb34diiqIeziXHEmLZA",
})(MapLocation);
