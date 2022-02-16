import {useTheme} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {FirstPage, LastPage, NavigateBefore, NavigateNext} from "@material-ui/icons";
import React from "react";
import * as PropTypes from "prop-types";
import {useCustomTablePaginationStyles} from "./CustomTablePaginationStyles";

const CustomTablePagination = (props) => {
    const classes = useCustomTablePaginationStyles();
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
                style={{margin: "0 0 0 10px"}}
            >
                {theme.direction === 'rtl' ? <LastPage/> : <FirstPage/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page"
                        style={{margin: "0 0 0 0"}}
            >
                {theme.direction === 'rtl' ? <NavigateNext/> : <NavigateBefore/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
                style={{margin: "0 0 0 0"}}

            >
                {theme.direction === 'rtl' ? <NavigateBefore/> : <NavigateNext/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
                style={{margin: "0 25px 0 0"}}

            >
                {theme.direction === 'rtl' ? <FirstPage/> : <LastPage/>}
            </IconButton>
        </div>
    );
}

CustomTablePagination.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default CustomTablePagination;