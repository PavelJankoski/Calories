import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import DrawerList from "./drawer-list/DrawerList";
import React, {useCallback, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import {useSidebarStyles} from "./SidebarStyles";
import {useMediaQuery, useTheme} from "@material-ui/core";
import * as actions from '../../../store/actions';

const Sidebar = (props) => {
    const classes = useSidebarStyles();
    const container = props.window !== undefined ? () => window.document.body : undefined;
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('xs'));
    const listenOnInviteClick = useCallback(() => {
        window.addEventListener('message', event => {
            if (event.origin.startsWith('http://localhost:3001')) {
                actions.inviteFriend(event.data);
            }
        });
    }, []);
    useEffect(() => {
        listenOnInviteClick();
    }, [listenOnInviteClick])

    const iframeStyles = useMemo(() => {
        return {
            margin: "auto 1em 1em 1em",
            border: "none",
            height: "233px",
            overflow: 'hidden'
        }
    }, []);

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden xsUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={props.sidebarOpen}
                    onClose={props.handleSidebarToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <DrawerList/>
                    {!matches ? <iframe style={{...iframeStyles}} src="http://localhost:3001" title="Invite a friend widget"/> : null}
                    <div className={classes.toolbar} />
                </Drawer>

            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open>
                    <DrawerList/>
                    {matches ? <iframe style={{...iframeStyles}} src="http://localhost:3001" title="Invite a friend widget"/> : null}

                </Drawer>
            </Hidden>
        </nav>
    )
}

Sidebar.propTypes = {
    sidebarOpen : PropTypes.bool.isRequired,
    handleSidebarToggle: PropTypes.func.isRequired
}

export default Sidebar;
