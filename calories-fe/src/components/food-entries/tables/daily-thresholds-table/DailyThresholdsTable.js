import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "@material-ui/core";
import EmptyRow from "../../../ui/tables/table-rows/empty-row/EmptyRow";
import TableNoCheckboxes from "../../../ui/tables/table-no-checkboxes/TableNoCheckboxes";
import PropTypes from "prop-types";
import {colors} from "../../../../shared/theme/colors";

const DailyThresholdsTable = (props) => {

    const tableRows = (
        props.tableData.length !== 0 ? props.tableData.map((row) => {
            return (
                <TableRow
                    tabIndex={-1}
                    style={{backgroundColor: colors.error.light}}
                    key = {"daily-thresholds-table-row-" + row.dateTakenOn}>
                    <TableCell align="left">{row.dateTakenOn}</TableCell>
                    <TableCell align="left">{row.dailyCalories}</TableCell>
                </TableRow>
            );
        }) : <EmptyRow text="data" colSpan={props.headCells.length} />
    )
    return (
        <React.Fragment>
            <TableNoCheckboxes headCells={props.headCells}
                               loading={props.loading}
                               tableRows={tableRows}
                               count={0}
                               rowsPerPage={0}
                               page={0}
                               fetchData={() => {}} />
        </React.Fragment>
    )
}
DailyThresholdsTable.propTypes = {
    tableData: PropTypes.array.isRequired,
    headCells: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

export default DailyThresholdsTable;
