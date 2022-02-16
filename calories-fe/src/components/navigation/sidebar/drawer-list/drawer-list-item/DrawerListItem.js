import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Typography, useTheme} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import {NavLink} from "react-router-dom";
import {useDrawerListItemStyles} from "./DrawerListItemStyles";

const DrawerListItem = (props) => {
    const classes = useDrawerListItemStyles();
    const theme = useTheme();
    return (
        <ListItem button className={classes.root}>
            <NavLink
                to={props.to}
                exact
                activeStyle={{borderLeft: `4px solid ${theme.palette.primary.main}`}}
                className={classes.listItemNavlink}>
                <ListItemIcon classes={classes.navLinkIcon}>
                    {props.icon}
                </ListItemIcon>
                <Typography variant={props.fontStyle} className={classes.listItemText}>
                    {props.text}
                </Typography>
            </NavLink>
        </ListItem>
    )
}


export default DrawerListItem;
