import {useSortingSelectStyles} from "./SortingSelectStyles";
import {FormControl, MenuItem, Select, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import {Done, TrendingFlat} from "@material-ui/icons";

const SortingSelect = (props) => {
    const classes = useSortingSelectStyles();

    const handleChange = (event) => {
        props.changeSortingCriteria(event.target.value);
    };
    return (
        <FormControl className={classes.formControl}>
            <Select
                value={props.value}
                onChange={handleChange}
                displayEmpty
                disableUnderline={true}
            >
                {props.selectItems.map((item, idx) => {
                    return (
                        [
                            <MenuItem key={item.value + "-desc"} className={classes.sortingMenuItem}
                                      value={item.value + ",desc"}>
                                <div className={classes.menuItemWithIcon}>
                                    <Typography variant="body2">{item.text}</Typography>
                                    <TrendingFlat className={classes.descIcon} fontSize="small"/></div>
                                <div className={`${classes.sortingSelectIconRight} sorting-select-icon-right`}><Done fontSize="small"/></div>
                            </MenuItem>,
                            <MenuItem key={item.value + "-asc"}
                                      className={idx !== props.selectItems.length - 1 ? classes.descMenuItem + ` ${classes.sortingMenuItem}` : classes.sortingMenuItem}
                                      value={item.value + ",asc"}>
                                <div className={classes.menuItemWithIcon}>
                                    <Typography variant="body2">{item.text}</Typography>
                                    <TrendingFlat fontSize="small" className={classes.ascIcon}/>
                                </div>
                                <div className={`${classes.sortingSelectIconRight} sorting-select-icon-right`}>
                                    <Done fontSize="small"/>
                                </div>
                            </MenuItem>]
                    )
                })}
            </Select>
        </FormControl>
    )
}

SortingSelect.propTypes = {
    changeSortingCriteria: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    selectItems: PropTypes.array.isRequired
}

export default SortingSelect;