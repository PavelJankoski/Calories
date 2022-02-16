import React from "react";
import Dialog from "@material-ui/core/Dialog";
import * as PropTypes from "prop-types";
import {CircularProgress, DialogContent} from "@material-ui/core";
import {useGenericDialogStyles} from "./GenericDialogStyles";
import DialogTitle from "./dialog-title/DialogTitle";
import DialogActions from "./dialog-actions/DialogActions";


const GenericDialog = (props) => {
    const classes = useGenericDialogStyles();
    return (
        <Dialog
            PaperProps={{
                style: {
                    paddingLeft: "10px",
                    paddingRight: "16px",
                },
            }}
            fullWidth={true}
            maxWidth={props.loading || props.error ? "sm" : props.dialogWidth}
            onClose={props.handleDialogClose}
            aria-labelledby="customized-dialog-title"
            open={props.open}
        >
            <DialogTitle onClose={props.handleDialogCloseButton}>
                {!props.loading && !props.error ? props.children : null}
            </DialogTitle>
            {!props.error ? !props.loading ? (
                <DialogContent className={classes.dialogContent}>
                    <DialogContent className={classes.root}>{props.dialogContent}</DialogContent>
                </DialogContent>
            ) : (
                <div className={classes.loadingDiv}>
                    <CircularProgress size={64}/>
                </div>
            ) : <div>Error</div>}

            {!props.loading && !props.error ? <DialogActions dialogActionsProps={props.dialogActionsProps}/> : null}
        </Dialog>
    );
};

GenericDialog.propTypes = {
    dialogWidth: PropTypes.string,
    dialogContent: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    handleDialogClose: PropTypes.func.isRequired,
    handleDialogCloseButton: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    dialogActionsProps: PropTypes.shape({
        handleCancelButton: PropTypes.func.isRequired,
        cancelButtonText: PropTypes.string.isRequired,
        handleApplyButton: PropTypes.func.isRequired,
        applyButtonText: PropTypes.string.isRequired,
        applyButtonDisabled: PropTypes.bool
    }).isRequired
};

GenericDialog.defaultProps = {
    dialogWidth: "md",
    loading: false,
    error: false,
    dialogActionsProps: {
        applyButtonDisabled: false
    }
}

export default GenericDialog;
