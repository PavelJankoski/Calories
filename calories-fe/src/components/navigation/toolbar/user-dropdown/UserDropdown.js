import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Typography} from "@material-ui/core";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import {useUserDropdownStyles} from "./UserDropdownStyles";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import * as actions from '../../../../store/actions';

const UserDropDown = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useUserDropdownStyles();
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(actions.logoutUser());
        handleClose();
    }

    return (
        <div>
            <Typography variant="subtitle2"
                        className={classes.welcomeTypo}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}>
                Welcome, {props.name} {!Boolean(anchorEl) ? <ArrowDropDown className={classes.dropdownArrow} /> : <ArrowDropUp className={classes.dropdownArrow}/>}
            </Typography>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                className={classes.dropDown}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

UserDropDown.propTypes = {
    name: PropTypes.string.isRequired
}

export default UserDropDown;