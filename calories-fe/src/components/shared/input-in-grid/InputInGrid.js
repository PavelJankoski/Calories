import {Grid, Typography} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import {useInputInGridStyles} from "./InputInGridStyles";

const InputInGrid = (props) => {
    const classes = useInputInGridStyles();
    return (
        <Grid container>
            <Grid item xs={12} sm={4} className={classes.labelGrid}>
                <Typography variant={"subtitle1"}>{props.label}</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
                {props.children}
            </Grid>
        </Grid>
    )
}

InputInGrid.propTypes = {
    label: PropTypes.string.isRequired
}

export default InputInGrid;