import {makeStyles} from "@material-ui/core";
import {colors} from "../../../shared/theme/colors";

export const useActionsAboveTableStyles = makeStyles(() => ({
    root: {
        display: "inline-block",
        width: "100%",
        marginTop: "1.5em",
        marginBottom: "1em"
    },
    sortingLeftBlock: {
        display: "inline-flex",
        alignItems: "center",
        "& > p": {
            margin: "0 0.5em"
        }
    },
    orderLabel: {
        margin: "0 0.5em",
        color: colors.font.light
    },
    creaButton: {
        float: "right"
    }
}));
