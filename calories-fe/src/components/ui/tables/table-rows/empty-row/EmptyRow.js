import Typography from "@material-ui/core/Typography";
import React from "react";
import PropTypes from "prop-types";
import {useEmptyRowStyles} from "./EmptyRowStyles";
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "@material-ui/core";

const EmptyRow = (props) => {
    const classes = useEmptyRowStyles();
    return (
        <TableRow>
            <TableCell colSpan={props.colSpan} className={classes.emptyCell} >
                <Typography variant="body2">
                    No {props.text}
                </Typography>
            </TableCell>
        </TableRow>
    )
}

EmptyRow.propTypes = {
    colSpan: PropTypes.number,
    text: PropTypes.string
}

export default EmptyRow;
