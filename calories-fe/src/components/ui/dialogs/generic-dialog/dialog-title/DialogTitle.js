import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import {useDialogTitleStyles} from "./DialogTitleStyles";

const DialogTitle = (props) => {
    const {children, onClose, ...other} = props;
    const classes = useDialogTitleStyles();
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            {children}
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
};


export default DialogTitle;
