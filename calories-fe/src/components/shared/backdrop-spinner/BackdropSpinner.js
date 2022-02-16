import {Backdrop, CircularProgress} from "@material-ui/core";
import {useBackdropSpinnerStyles} from "./BackdropSpinnerStyles";

const BackdropSpinner = () => {
    const classes = useBackdropSpinnerStyles();
    return (
        <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="primary" />
        </Backdrop>
    )
}

export default BackdropSpinner
