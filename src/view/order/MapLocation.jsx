import { Button, Stack } from "@mui/material";
import React from "react";
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
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [moveMarker, setMoveMarker] = React.useState({
    lat: 37.8965564,
    lng: 58.3740528,
  });

  const mapClicked = (mapProps, map, clickEvent) => {
    console.log(mapProps);
    console.log(map);
    console.log(clickEvent);
    setMoveMarker(clickEvent.latLng);
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
        Kartadan gorkez
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
            <Stack direction={"row"} justifyContent={"flex-end"}>
              <Button autoFocus color="inherit" onClick={handleClose}>
                save
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Map
          google={props.google}
          zoom={17}
          initialCenter={moveMarker}
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
