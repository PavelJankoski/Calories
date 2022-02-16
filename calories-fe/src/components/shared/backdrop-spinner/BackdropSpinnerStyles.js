import {makeStyles} from "@material-ui/core";

export const useBackdropSpinnerStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1
    },
}));
