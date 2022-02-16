
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../../../../../shared/theme/colors";

export const useDrawerListItemStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        "& > .active > .MuiListItemIcon-root": {
            color: theme.palette.primary.main
        },
        "& > .active > h6": {
            color: colors.font.dark
        },
        "& > .active": {
            backgroundColor: colors.grey.light
        }
    },
    listItemNavlink: {
        width: "100%",
        display: "inline-flex",
        padding: "16px 8px",
        textDecoration: "none"
    },
    listItemText: {
        color: colors.font.light,
        alignSelf: "center"
    },
}));
