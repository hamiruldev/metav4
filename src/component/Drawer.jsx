import * as React from "react";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import {
  Box,
  Collapse,
  AppBar,
  Typography,
  Toolbar,
  ListItemText,
  ListItemButton,
  IconButton,
  ListItem,
  List,
  CssBaseline,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { ExpandMore, ExpandLess, Menu as MenuIcon } from "@mui/icons-material";
import AudioBcg from "./AudioBcg";
import FullScreenDialog from "./FullScreenDialog";

let dateNew = new Date();
let date1 = dateNew.toLocaleTimeString();

const drawerWidth = 248;

const SubDrawer = (props) => {

  const { handleIframe, handleIframeClose } = props

  //Home & Index
  const [openHome, setOpenHome] = React.useState(true);
  const handleClickHome = () => {
    setOpenHome(!openHome);
  };

  //Services
  const [openServices, setOpenServices] = React.useState(false);
  const handleClickServices = () => {
    setOpenServices(!openServices);
  };

  const navigate = useNavigate();

  return (
    <>
      <Toolbar className="d-flex justify-content-center">
        <Box>
          <img
            onClick={() => {
              navigate(`../`);
              handleIframeClose("");
            }}
            src={`https://360xp.co/metagallery/wp-content/uploads/2022/10/ISMART-Logo-White-01.png`}
            style={{ width: 110, cursor: "pointer" }}
          />
        </Box>
      </Toolbar>

      {/* <Divider /> */}

      <List>
        <ListItem className="belowLogo">
          SOFTWARE DEVELOPMENT <br />
          DIGITAL EXPERIENTIAL MARKETING
        </ListItem>
      </List>

      <List
        sx={{
          width: "100%",
          maxWidth: 350,
          bgcolor: "transparent",
          color: "white",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton

          onClick={() => {
            // navigate(`../`);
            handleIframe("");
            handleClickHome;
          }}
        >
          <ListItemText primary="1 HOME" />
          {openHome ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openHome} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={() => {
                handleIframe("portfolio");
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="1.1 PORTFOLIO" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          onClick={handleClickServices}
        >
          <ListItemText primary="2 SERVICES" />
          {openServices ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openServices} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={() => {
                handleIframe("services/#softwaredev_section");
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.1 SOFTWARE DEVELOPMENT" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleIframe("services/#ecommerce_section");
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.2 ECOMMERCE" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleIframe("services/#websitedesign_section")
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.3 WEBSITE DESIGN" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleIframe("services/#webminigame_section")
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.4 WEB MINI GAME" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleIframe("services/#virtualevent_section")

              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.5 VIRTUAL EVENT" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleIframe(`services/#onlineshowroom_section`);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.6 ONLINE SHOWROOM" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleIframe(`services/#3dvisualization_section`);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.7 3D VISUALIZATION" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleIframe(`services/#metaverse_section`);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.8 METAVERSE" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          onClick={() => {
            handleIframe(`contact-us`);
          }}
        >
          <ListItemText primary="3 CONTACT" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText>
            <AudioBcg />
            <br />
            {`SINGAPORE SGT ${date1}`}
          </ListItemText>
        </ListItemButton>

        <ListItemButton>
          <ListItemText>
            <a href="mailto:info@i-smart.com.sg">
              CONTACT US
              <br />
              info@i-smart.com.sg
            </a>
          </ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemText>
            <a href="tel:6567176778">
              GENERAL LINE
              <br />
              +6567176778
            </a>
          </ListItemText>
        </ListItemButton>
      </List>
    </>
  );
};

/**
 * Responsive Drawer function for both Mobile and Desktop
 */
function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [iframeUrl, setIframe] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery("(max-width:599px)");
  const navigate = useNavigate();
  const container = window !== undefined ? () => window().document.body : undefined;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleIframeClose = () => {
    setIframe('')
  }

  const handleIframe = (url) => {
    setIframe(url)
    setOpen(true);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <CssBaseline />

        {matches && <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100 % - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: "text.primary",
            display: { xs: "block", md: "none", lg: "none" }, // Hidden on desktop
            position: "relative",
            zIndex: "1000000"
          }}
        >
          <Toolbar>
            <Typography onClick={() => {
              navigate(`../`);
              setIframe("");
            }} variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
              iSmart Support
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>}

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          {matches ?
            <Drawer
              container={container}
              variant="temporary"
              // variant="persistent"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                position: "relative",
                zIndex: "1000000",
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  pt: 8,
                },
              }}
            >
              <SubDrawer handleIframeClose={handleIframeClose} handleIframe={handleIframe} />
            </Drawer>
            :
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                position: "relative",
                zIndex: "1000000",
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              <SubDrawer handleIframeClose={handleIframeClose} handleIframe={handleIframe} />
            </Drawer>
          }
        </Box>
      </Box>

      {iframeUrl !== '' && <>
        <FullScreenDialog handleClose={handleClose} open={open} url={`https://360xp.co/ismartwebsite/${iframeUrl == "portfolio" ? "" : iframeUrl}`} />
      </>}
    </>

  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
