import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

export const CloseButton = ({ closeToast }) => (
    <IconButton style={{color: "#fff"}} onClick={closeToast}>
        <CloseIcon />
    </IconButton>
);