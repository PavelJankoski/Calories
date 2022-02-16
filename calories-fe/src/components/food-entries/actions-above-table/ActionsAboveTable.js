import {useActionsAboveTableStyles} from "./ActionsAboveTableStyles";
import {Typography} from "@material-ui/core";
import SortingSelect from "../../../components/ui/selects/sorting-select/SortingSelect";
import PropTypes from "prop-types";
import {Add} from "@material-ui/icons";
import ButtonIconLeft from "../../../components/ui/buttons/button-icon-left/ButtonIconLeft";
const ActionsAboveTable = (props) => {
    const classes = useActionsAboveTableStyles();

    return (
        <div className={classes.root}>
            <div className={classes.sortingLeftBlock}>
                <Typography className={classes.orderLabel} variant="body2">Order by:</Typography>
                <SortingSelect value={props.sortingValue}
                               changeSortingCriteria={props.changeSortingCriteria}
                               selectItems={props.sortingCriteria}/>
            </div>
            <ButtonIconLeft color="primary"
                            variant="contained"
                            className={classes.creaButton}
                            onClick={props.handleButtonClick}
                            text={props.createButtonText}
                            icon={<Add />} />
        </div>
    )
}

ActionsAboveTable.propTypes = {
    sortingValue: PropTypes.string.isRequired,
    changeSortingCriteria: PropTypes.func.isRequired,
    sortingCriteria: PropTypes.array.isRequired,
    createButtonText: PropTypes.string.isRequired,
    handleButtonClick: PropTypes.func.isRequired
}

export default ActionsAboveTable;
