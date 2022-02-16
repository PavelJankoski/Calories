import PropTypes from "prop-types";
import GenericDialog from "../../../ui/dialogs/generic-dialog/GenericDialog";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import * as actions from '../../../../store/actions';

const DeleteFoodEntryDialog = (props) => {
    const dispatch = useDispatch();
    const deleteLoading = useSelector((state) => state.foodEntriesReducer.dialogLoading.deleteLoading);

    const handleApplyClick = () => {
        dispatch(actions.deleteFoodEntry(props.foodEntry.id));
        props.handleDialogClose();
    }

    const dialogContent = (
        <Typography variant="body1">
            Are you sure you want to delete {props.foodEntry.productName}?
        </Typography>
    );

    const dialogActionsProps = {
        handleCancelButton: () => props.handleDialogClose(),
        cancelButtonText: "Cancel",
        applyButtonLoading: deleteLoading,
        handleApplyButton: () => handleApplyClick(),
        applyButtonText: "Accept"
    }


    return (
        <GenericDialog
            dialogWidth="sm"
            open={props.open}
            handleDialogClose={props.handleDialogClose}
            handleDialogCloseButton={props.handleDialogClose}
            dialogActionsProps={dialogActionsProps}
            dialogContent={dialogContent}>
            <Typography variant={"h5"}>
                Delete Food Entry
            </Typography>
        </GenericDialog>
    )
}
DeleteFoodEntryDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleDialogClose: PropTypes.func.isRequired,
    foodEntry: PropTypes.shape({
        id: PropTypes.number,
        productName: PropTypes.string.isRequired,
    }).isRequired
}

export default DeleteFoodEntryDialog;
