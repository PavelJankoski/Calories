import PropTypes from "prop-types";
import {Button} from "@material-ui/core";

const ButtonIconLeft = ({text, icon, ...rest}) => {
    return (
        <Button {...rest}>{icon} {text}</Button>
    )
}

ButtonIconLeft.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired
}

export default ButtonIconLeft;