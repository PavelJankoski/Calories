import {Button, Grid, Paper, TextField} from "@material-ui/core";
import {useFilterBoxStyles} from "./FilterBoxStyles";
import PropTypes from "prop-types";
import {DateTimePicker} from "@material-ui/pickers";

const FilterBox = (props) => {
    const classes = useFilterBoxStyles();
    return (
        <Paper elevation={3} className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <TextField label="Product name"
                               name="productName"
                               variant="standard"
                               fullWidth
                               value={props.filter.productName}
                               onChange={props.handleInputChange} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <DateTimePicker label="From"
                                    fullWidth
                                    maxDate={new Date()}
                                    value={props.filter.from}
                                    onChange={(val) => props.handleDateInputChange(val, "from")} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <DateTimePicker label="To"
                                    fullWidth
                                    value={props.filter.to}
                                    maxDate={new Date()}
                                    minDate={props.filter.from ? props.filter.from : undefined}
                                    onChange={(val) => props.handleDateInputChange(val, "to")} />
                </Grid>

                <Grid item xs={12} md={4} className={classes.buttonGrid}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Button type="button"
                                    color="primary"
                                    variant="outlined"
                                    disabled={props.isResetDisabled}
                                    onClick={props.handleResetButton}
                                    className={classes.buttonBlock}>Reset</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button type="button"
                                    color="primary"
                                    variant="contained"
                                    onClick={props.handleApplyButton}
                                    disabled={!props.filter.productName.trim() && !props.filter.from && !props.filter.to}
                                    className={classes.buttonBlock}>Apply</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )

}

FilterBox.propTypes = {
    filter: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleDateInputChange: PropTypes.func.isRequired,
    handleApplyButton: PropTypes.func.isRequired,
    handleResetButton: PropTypes.func.isRequired,
    isResetDisabled: PropTypes.bool.isRequired
}

export default FilterBox;
