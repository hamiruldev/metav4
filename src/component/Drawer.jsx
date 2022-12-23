import * as React from "react";
import PropTypes from "prop-types";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
  Divider,
  CssBaseline,
  Drawer,
  useMediaQuery,
  Link,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  Menu as MenuIcon,
} from "@mui/icons-material";
import AudioBcg from "./AudioBcg";

let dateNew = new Date();
let date1 = dateNew.toLocaleTimeString();

const drawerWidth = 248;

const submenu = ["SOUND ON / OFF", `SINGAPORE SGT ${date1}`];

const SubDrawer = () => {
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
              // navigate(`../`);
              window.location.assign("https://www.i-smart.com.sg/");
              // window.location.assign("https://2vr360.com/basiir/test32/");
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
            // handleClickHome;
            window.location.assign("https://www.i-smart.com.sg/");
            // window.location.assign("https://2vr360.com/basiir/test32/");
          }}
        >
          <ListItemText primary="1 HOME" />
          {openHome ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openHome} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(`../portfolio`);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="1.1 PORTFOLIO" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          // onClick={() => {
          //     navigate(`../services`)
          // }}
          onClick={handleClickServices}
        >
          <ListItemText primary="2 SERVICES" />
          {openServices ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openServices} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(`../services/softwaredev`);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.1 SOFTWARE DEVELOPMENT" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate(`../services/ecommerce`);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.2 ECOMMERCE" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate(`../services/websitedesign`);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.3 WEBSITE DESIGN" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate(`../services/webminigame`);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.4 WEB MINI GAME" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate(`../services/virtualevent`);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.5 VIRTUAL EVENT" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate(`../services/onlineshowroom`);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.6 ONLINE SHOWROOM" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate(`../services/3dvisualization`);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.7 3D VISUALIZATION" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate(`../services/metaverse`);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="2.8 METAVERSE" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          onClick={() => {
            navigate(`../contact-us`);
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
  const matches = useMediaQuery("(max-width:599px)");
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />


        {location.pathname == '/' || location.pathname == '/service' &&
          <>
            {matches && (
              <AppBar
                position="fixed"
                sx={{
                  width: { sm: `calc(100 % - ${drawerWidth}px)` },
                  ml: { sm: `${drawerWidth}px` },
                  bgcolor: "text.primary",
                  display: { xs: "block", md: "none", lg: "none" }, // Hidden on desktop
                }}
              >
                <Toolbar>
                  <Link
                    href="https://www.i-smart.com.sg"
                    sx={{ color: "inherit", flexGrow: 1, textDecoration: "none" }}
                  >
                    <Typography
                      variant="h6"
                      noWrap
                      sx={{ flexGrow: 1 }}
                      component="div"
                    >
                      iSmart Support
                    </Typography>
                  </Link>
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
              </AppBar>
            )}

            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              {matches ? (
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
                    "& .MuiDrawer-paper": {
                      boxSizing: "border-box",
                      width: drawerWidth,
                      // pt: 8,
                    },
                  }}
                >
                  <SubDrawer />
                </Drawer>
              ) : (
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
                  <SubDrawer />
                </Drawer>
              )}
            </Box>
          </>
        }

        <Box
          component="main"
          sx={{
            display: "flex",
            height: "100vh",
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: "transparent"
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>

      </Box>
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
