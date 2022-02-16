import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {Toolbar} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import PropTypes from "prop-types";
import {useCustomToolbarStyles} from "./CustomToolbarStyles";
import UserDropdown from "./user-dropdown/UserDropdown";
import {useSelector} from "react-redux";


const CustomToolbar = (props) => {
    const classes = useCustomToolbarStyles();
    const name = useSelector(state => state.authReducer.name)
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleSidebarToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap className={classes.toolbarText}>
                    Calories
                </Typography>
                {/*<Typography variant="subtitle2">Welcome, user@user.com</Typography>*/}
                <UserDropdown name={name}/>
            </Toolbar>
        </AppBar>
    )
}

CustomToolbar.propTypes = {
    handleSidebarToggle: PropTypes.func.isRequired
}

export default CustomToolbar;
