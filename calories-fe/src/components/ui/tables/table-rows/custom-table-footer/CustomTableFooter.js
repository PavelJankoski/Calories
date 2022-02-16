import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import React from "react";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import CustomTablePagination from "./custom-table-pagination/CustomTablePagination";

const CustomTableFooter = (props) => {
    const handleChangePage = (event, newPage) => {
        props.fetchData(newPage, props.rowsPerPage);
    }

    const handleChangeRowsPerPage = (event) => {
        props.fetchData(0, +event.target.value);
    };

    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[5, 15, 25]}
                    count={props.count}
                    rowsPerPage={props.rowsPerPage}
                    page={props.page}
                    SelectProps={{
                        inputProps: {'aria-label': 'rows per page'},
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={CustomTablePagination}
                />
            </TableRow>
        </TableFooter>
    )
}

CustomTableFooter.propTypes = {
    count: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    fetchData: PropTypes.func.isRequired
}

export default CustomTableFooter;