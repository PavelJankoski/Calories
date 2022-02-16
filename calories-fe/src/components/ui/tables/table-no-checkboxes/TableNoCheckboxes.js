import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import CustomTableHeader from "../table-rows/custom-table-header/CustomTableHeader";
import CustomTableFooter from "../table-rows/custom-table-footer/CustomTableFooter";
import {useTableNoCheckboxesStyles} from "./TableNoCheckboxesStyles";
import PropTypes from "prop-types";
import TableLoader from "../table-rows/table-loader/TableLoader";

const TableNoCheckboxes = (props) => {
    const classes = useTableNoCheckboxesStyles();

    return (
        <Paper className={classes.root}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <CustomTableHeader headCells={props.headCells} />
                    <TableBody>
                        {!props.loading ?
                            props.tableRows :
                            <TableLoader loading={props.loading}
                                         colSpan={props.headCells.length}/>}
                    </TableBody>
                    {props.count !== 0 && !props.loading ?<CustomTableFooter count={props.count}
                                       rowsPerPage={props.rowsPerPage}
                                       page={props.page}
                                       fetchData={props.fetchData} /> : null}
                </Table>
            </TableContainer>

        </Paper>
    );
}

TableNoCheckboxes.propTypes = {
    headCells: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    tableRows: PropTypes.any.isRequired,
    count: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    fetchData: PropTypes.func.isRequired
}

export default TableNoCheckboxes;
