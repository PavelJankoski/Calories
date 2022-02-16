import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../../../../shared/theme/colors";

export const useSortingSelectStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
        backgroundColor: colors.grey.light
    },
    descMenuItem: {
        borderBottom: "1px solid #ddd"
    },
    descIcon: {
        transform: "rotate(90deg)"
    },
    ascIcon: {
        transform: "rotate(-90deg)"
    },
    sortingSelectIconRight: {
        display: "none"
    },
    sortingMenuItem: {
        padding: "0.75em 0.5em",
        "&.Mui-selected": {
            backgroundColor: "white"
        },
        "&.Mui-selected > .sorting-select-icon-right": {
            display: "inline-flex"
        },
        "&.Mui-selected > div": {
            color: theme.palette.primary.dark
        },
        "&.Mui-selected div > p": {
            color: theme.palette.primary.dark
        }

    },
    menuItemWithIcon: {
        display: "inline-flex",
        alignItems: "center",
        flexGrow: 1
    }
}));
