import * as React from 'react'
import PropTypes from 'prop-types'

import { useLocation, useNavigate } from 'react-router-dom'
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
} from '@mui/material'
import {
    ExpandMore,
    ExpandLess,
    Menu as MenuIcon,
} from '@mui/icons-material'
import AudioBcg from './AudioBcg'

let dateNew = new Date()
let date1 = dateNew.toLocaleTimeString()

const drawerWidth = 248

const submenu = ['SOUND ON / OFF', `SINGAPORE SGT ${date1}`]

const SubDrawer = () => {
    // const [open, setOpen] = React.useState(true)
    // const [menu, setMenu] = React.useState('1 HOME')

    //Home & Index
    const [openHome, setOpenHome] = React.useState(true)
    const handleClickHome = () => {
        setOpenHome(!openHome)
    }

    //Services
    const [openServices, setOpenServices] = React.useState(false)
    const handleClickServices = () => {
        setOpenServices(!openServices)
    }

    const route = useLocation()
    const navigate = useNavigate()

    // const handleClick = (key) => {
    //     setMenu(key)
    //     open ? setOpen(!open) : setOpen(true)
    // }

    return (
        <>
            <Toolbar className="d-flex justify-content-center">
                <Box>
                    <img
                        src={`https://360xp.co/metagallery/wp-content/uploads/2022/10/ISMART-Logo-White-01.png`}
                        style={{ width: 110 }}
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
                    width: '100%',
                    maxWidth: 350,
                    bgcolor: 'transparent',
                    color: 'white',
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton
                    // onClick={() => {
                    //     navigate(`../`)
                    // }}
                    onClick={handleClickHome}
                >
                    <ListItemText primary="1 HOME" />
                    {openHome ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openHome} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate(`../portfolio`)
                            }}
                            sx={{ pl: 4 }}
                        >
                            <ListItemText primary="1.1 INDEX" />
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
                                navigate(`../services/softwaredev`)
                            }}
                            sx={{ pl: 4 }}
                        >
                            <ListItemText primary="2.1 SOFTWARE DEVELOPMENT" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => {
                                navigate(`../services/ecommerce`)
                            }}
                            sx={{ pl: 4 }}
                        >
                            <ListItemText primary="2.2 ECOMMERCE" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => {
                                navigate(`../services/websitedesign`)
                            }}
                            sx={{ pl: 4 }}
                        >
                            <ListItemText primary="2.3 WEBSITE DESIGN" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => {
                                navigate(`../services/webminigame`)
                            }}
                            sx={{ pl: 4 }}
                        >
                            <ListItemText primary="2.4 WEB MINI GAME" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => {
                                navigate(`../services/virtualevent`)
                            }}
                            sx={{ pl: 4 }}
                        >
                            <ListItemText primary="2.5 VIRTUAL EVENT" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => {
                                navigate(`../services/onlineshowroom`)
                            }}
                            sx={{ pl: 4 }}
                        >
                            <ListItemText primary="2.6 ONLINE SHOWROOM" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => {
                                navigate(`../services/3dvisualization`)
                            }}
                            sx={{ pl: 4 }}
                        >
                            <ListItemText primary="2.7 3D VISUALIZATION" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => {
                                navigate(`../services/metaverse`)
                            }}
                            sx={{ pl: 4 }}
                        >
                            <ListItemText primary="2.8 METAVERSE" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton
                    onClick={() => {
                        navigate(`../contact-us`)
                    }}
                >
                    <ListItemText primary="3 CONTACT" />
                </ListItemButton>

                <ListItemButton

                >
                    <ListItemText>

                        <AudioBcg />
                        <br />
                        {`SINGAPORE SGT ${date1}`}
                    </ListItemText>
                </ListItemButton>

                <ListItemButton>
                    <ListItemText>
                        CONTACT US
                        <br />
                        info@i-smart.com.sg
                    </ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>
                        GENERAL LINE
                        <br />
                        +6567176778
                    </ListItemText>
                </ListItemButton>
            </List>

            <Divider />
        </>
    )
}

/**
 * Responsive Drawer function for both Mobile and Desktop
 */
function ResponsiveDrawer(props) {
    const { window } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const container =
        window !== undefined ? () => window().document.body : undefined

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100 % - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: 'text.primary',
                    display: { xs: 'block', md: 'none', lg: 'none' }, // Hidden on desktop
                }}
            >
                <Toolbar>

                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                        iSmart Support
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    // variant="temporary"
                    variant="persistent"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            pt: 8,
                        },
                    }}
                >
                    <SubDrawer />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    <SubDrawer />
                </Drawer>
            </Box>
        </Box>
    )
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}

export default ResponsiveDrawer
