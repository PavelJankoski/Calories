import React from "react";
import { ScaleLoader } from "react-spinners";
import PropTypes from 'prop-types';
import {useTableLoaderStyles} from "./TableLoaderStyles";
import TableRow from "@material-ui/core/TableRow";
import {TableCell, useTheme} from "@material-ui/core";

const TableLoader = (props) => {
    const classes = useTableLoaderStyles();
    const theme = useTheme();
    return (
        <TableRow>
            <TableCell colSpan={props.colSpan} className={classes.tableLoaderCell}>
                <ScaleLoader color={theme.palette.primary.main} loading={props.loading} size={150} />
            </TableCell>
        </TableRow>
    );
};
TableLoader.propTypes = {
    colSpan: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired
};

export default TableLoader;
