import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import React from "react";
import PropTypes from "prop-types";
import {Typography} from "@material-ui/core";

const CustomTableHeader = (props) => {
    return (
        <TableHead>
            <TableRow>
                {props.headCells.map((column, idx) => (
                    <TableCell
                        key={"head-cell-" + idx}
                        align={column.align ? column.align : "left"}
                        style={{minWidth: column.minWidth}}>
                        <Typography variant={"subtitle2"}>
                            {column.label}
                        </Typography>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

CustomTableHeader.propTypes = {
    headCells: PropTypes.array.isRequired
}

export default CustomTableHeader;
