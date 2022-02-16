import {makeStyles} from "@material-ui/core";

export const useGenericDialogStyles = makeStyles((theme) => ({
    root: {
        overflowY: "initial",
        paddingBottom: theme.spacing(1),
        "& > :not(:last-child)": {
            marginBottom: theme.spacing(4),
        }
    },
    dialogContent: {
        padding: 0,
        margin: "0.5em 0"
    },
    loadingDiv: {
        paddingBottom: "1.5em",
        textAlign: "center"
    }
}));