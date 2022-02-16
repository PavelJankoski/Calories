import React from "react";
import MuiDialogActions from "@material-ui/core/DialogActions";
import {useDialogActionsStyles} from "./DialogActionsStyles";
import {Button} from "@material-ui/core";
import PropTypes from "prop-types";
import ButtonWithProgress from "../../../buttons/button-with-progress/ButtonWithProgress";


const DialogActions = (props) => {
    const classes = useDialogActionsStyles();
    return (
        <MuiDialogActions className={classes.root}>
            <React.Fragment>
                <Button onClick={props.dialogActionsProps.handleCancelButton} color="primary" variant="outlined">
                    {props.dialogActionsProps.cancelButtonText}
                </Button>
                <div className={classes.applyButton}/>
                <ButtonWithProgress text={props.dialogActionsProps.applyButtonText}
                                    handleClick={props.dialogActionsProps.handleApplyButton}
                                    loading={props.dialogActionsProps.applyButtonLoading}
                                    disabled={props.dialogActionsProps.applyButtonDisabled}/>
            </React.Fragment>
        </MuiDialogActions>
    )
}

DialogActions.propTypes = {
    dialogActionsProps: PropTypes.shape({
        handleCancelButton: PropTypes.func.isRequired,
        cancelButtonText: PropTypes.string.isRequired,
        handleApplyButton: PropTypes.func.isRequired,
        applyButtonText: PropTypes.string.isRequired,
        applyButtonDisabled: PropTypes.bool,
        applyButtonLoading: PropTypes.bool
    }).isRequired
}

DialogActions.defaultProps = {
    dialogActionsProps: {
        applyButtonDisabled: false,
        applyButtonLoading: false
    }
}

export default DialogActions;