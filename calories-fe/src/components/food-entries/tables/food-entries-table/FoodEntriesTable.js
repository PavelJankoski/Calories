import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "@material-ui/core";
import EmptyRow from "../../../ui/tables/table-rows/empty-row/EmptyRow";
import TableNoCheckboxes from "../../../ui/tables/table-no-checkboxes/TableNoCheckboxes";
import PropTypes from "prop-types";
import ActionsCell from "../../../ui/tables/table-cells/actions-cell/ActionsCell";
import {useSelector} from "react-redux";

const FoodEntriesTable = (props) => {
    const role = useSelector(state => state.authReducer.role)

    const getDeleteFoodEntry = (id, productName) => {
        return {
            id: id,
            productName: productName
        }
    }

    const tableRows = (
        props.count !== 0 ? props.tableData.map((row) => {
            return (
                <TableRow
                    tabIndex={-1}
                    key = {"food-entries-table-row-" + row.id}>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.productName}</TableCell>
                    <TableCell align="left">{row.takenOn}</TableCell>
                    <TableCell align="left">{row.calories}</TableCell>
                    {role === "ROLE_ADMIN" ? <TableCell align="left">{row.userId}</TableCell> : null}
                    {role === "ROLE_ADMIN" ? <ActionsCell handleOnEditButton={() => props.handleOpenEditDialog(row)}
                                 handleOnDeleteButton={() => props.handleOpenDeleteDialog(getDeleteFoodEntry(row.id, row.productName))} /> : null}
                </TableRow>
            );
        }) : <EmptyRow text="data" colSpan={props.headCells.length} />
    )
    return (
        <React.Fragment>
            <TableNoCheckboxes headCells={props.headCells}
                               loading={props.loading}
                               tableRows={tableRows}
                               count={props.count}
                               rowsPerPage={props.rowsPerPage}
                               page={props.page}
                               fetchData={props.fetchData} />
        </React.Fragment>
    )
}
FoodEntriesTable.propTypes = {
    count: PropTypes.number.isRequired,
    tableData: PropTypes.array.isRequired,
    headCells: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    handleOpenDeleteDialog: PropTypes.func.isRequired,
    handleOpenEditDialog: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired
}

export default FoodEntriesTable;
