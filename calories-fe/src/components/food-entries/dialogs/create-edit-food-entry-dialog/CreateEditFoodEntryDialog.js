import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../../store/actions";
import {CircularProgress, ClickAwayListener, TextField, Typography} from "@material-ui/core";
import GenericDialog from "../../../ui/dialogs/generic-dialog/GenericDialog";
import PropTypes from "prop-types";
import InputInGrid from "../../../shared/input-in-grid/InputInGrid";
import {DateTimePicker} from "@material-ui/pickers";
import {Autocomplete} from "@material-ui/lab";
import {useCallback, useEffect, useState} from "react";
import {useCreateEditFoodEntryDialogStyles} from "./CreateEditFoodEntryDialogStyles";
import useDebounce from "../../../../hooks/useDebounce";
import * as actionTypes from '../../../../store/actionTypes';

const CreateEditFoodEntryDialog = (props) => {
    const dispatch = useDispatch();
    const createEditLoading = useSelector((state) => state.foodEntriesReducer.dialogLoading.createEditLoading);
    const [foodEntries, setFoodEntries] = useState([]);
    const [productName, setProductName] = useState(props.foodEntry.productName);
    const autocompleteFoodEntries = useSelector(state => state.foodEntriesReducer.autocompleteFoodEntries);
    const [openAutocomplete, setOpenAutocomplete] = useState(false);
    const [autocompleteDisabled, setAutocompleteDisabled] = useState(false);
    const [caloriesDisabled, setCaloriesDisabled] = useState(false);
    const [setTimeoutAutocomplete] = useDebounce((searchText) => dispatch(actions.fetchAutocompleteFoodEntries(searchText)), 1000);
    const [autocomplete, setAutocomplete] = useState(null);
    const [textField, setTextField] = useState("");
    const classes = useCreateEditFoodEntryDialogStyles();

    useEffect(() => {
        setFoodEntries(autocompleteFoodEntries.data);
    }, [autocompleteFoodEntries])

    useEffect(() => {
        if(props.isEdit) {
            setFoodEntries(foodEntries => [...foodEntries, {title: props.foodEntry.productName}])
            setAutocomplete({title: props.foodEntry.productName});
        }
    }, [props.isEdit, props.foodEntry.productName])

    useEffect(() => {
        return () => {
            dispatch({type: actionTypes.FETCH_AUTOCOMPLETE_SUCCESS, payload: []})
        }
    }, [dispatch])

    const handleApplyClick = () => {
        if(!props.isEdit){
            dispatch(actions.createFoodEntry({
                productName: productName,
                calories: props.foodEntry.calories,
                takenOn: props.foodEntry.takenOnDate
            }));
        }
        else{
            dispatch(actions.updateFoodEntry(props.foodEntry.id, {
                productName: productName,
                calories: props.foodEntry.calories,
                takenOn: props.foodEntry.takenOnDate
            }))
        }
        props.handleDialogClose();
    }

    const handleAutocompleteChange = useCallback((e, value) => {
        setProductName(value.title);
        props.handleOnInputChange(value.calories)
        setAutocomplete(value);
        setAutocompleteDisabled(true);
        setOpenAutocomplete(false);
        setCaloriesDisabled(true);
    }, [props])

    const handleTextChange = useCallback((e) => {
        setTextField(e.target.value);
        setTimeoutAutocomplete(e.target.value)
    }, [setTimeoutAutocomplete]);

    const handleCreateNewFoodEntry = useCallback((e) => {
        e.stopPropagation();
        const newFoodEntry = {title: textField}
        setFoodEntries([...foodEntries, newFoodEntry])
        handleAutocompleteChange(e, newFoodEntry);
        setCaloriesDisabled(false)
    }, [handleAutocompleteChange, textField, foodEntries]);
    const dialogContent = (
        <>
            <InputInGrid label="Product name">
                <ClickAwayListener onClickAway={() => setOpenAutocomplete(false)}>
                    <Autocomplete
                        options={foodEntries}
                        disabled={autocompleteDisabled}
                        debug
                        open={openAutocomplete}
                        getOptionLabel={(option) => `${option.title} ${option.calories ? `(${option.calories} cal)` : ""}`}
                        getOptionSelected={(o, v) => o.title === v.title}
                        noOptionsText={!autocompleteFoodEntries.loading ?
                            <Typography variant="body2"
                                        className={classes.createNewFoodEntry}
                                        onClick={handleCreateNewFoodEntry}>Add food entry "{textField}"</Typography> :
                            <div className={classes.divLoader}><CircularProgress /></div> }
                        onChange={handleAutocompleteChange}
                        value={autocomplete}
                        renderInput={(params) => <TextField value={textField}
                                                            onClick={() => !autocompleteDisabled ? setOpenAutocomplete(!openAutocomplete) : {}}
                                                            onChange={handleTextChange} {...params} />}
                    />
                </ClickAwayListener>
            </InputInGrid>
            <InputInGrid label="Calories">
                <TextField value={props.foodEntry.calories}
                           type="number"
                           fullWidth
                           disabled={caloriesDisabled}
                           name="calories"
                           onChange={(e) => props.handleOnInputChange(e.target.value)} />
            </InputInGrid>
            <InputInGrid label="Taken on">
                <DateTimePicker fullWidth
                                maxDate={new Date()}
                                value={props.foodEntry.takenOnDate}
                                onChange={(val) => props.handleDateInputChange(val)} />
            </InputInGrid>
        </>
    );

    const dialogActionsProps = {
        handleCancelButton: () => props.handleDialogClose(),
        cancelButtonText: "Cancel",
        handleApplyButton: () => handleApplyClick(),
        applyButtonText: "Apply",
        applyButtonLoading: createEditLoading,
        applyButtonDisabled: !productName.trim()
            || !props.foodEntry.calories || !props.foodEntry.takenOnDate
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
                {props.isEdit ? "Modify" : "Create"} Food Entry
            </Typography>
        </GenericDialog>
    )
}

CreateEditFoodEntryDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleDialogClose: PropTypes.func.isRequired,
    foodEntry: PropTypes.object.isRequired,
    isEdit: PropTypes.bool.isRequired,
    handleDateInputChange: PropTypes.func.isRequired
}

export default CreateEditFoodEntryDialog;
