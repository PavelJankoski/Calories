import {makeStyles} from "@material-ui/core";

export const useDialogActionsStyles = makeStyles((theme) => ({
    root: {
        margin: "0 0 1em 0",
        padding: theme.spacing(2),
    },
    applyButton: {
        flex: "1 0 0"
    }
}));