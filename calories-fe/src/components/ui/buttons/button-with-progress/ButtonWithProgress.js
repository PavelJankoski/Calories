import {Button, CircularProgress} from "@material-ui/core";
import PropTypes from "prop-types";
import useButtonWithProgressStyles from "./ButtonWithProgressStyles";

const ButtonWithProgress = (props) => {
    const classes = useButtonWithProgressStyles();

    return (
        <div className={classes.wrapper}>
            <Button onClick={props.handleClick}
                    color="primary"
                    disabled={props.disabled || props.loading}
                    variant={props.loading ? "outlined" : "contained"}>
                {props.text}
            </Button>
            {props.loading ? <CircularProgress size={24} className={classes.buttonProgress}/> : null}
        </div>
    )
}

ButtonWithProgress.propTypes = {
    handleClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    loading: PropTypes.bool
}

ButtonWithProgress.defaultProps = {
    disabled: false,
    loading: false
}

export default ButtonWithProgress;