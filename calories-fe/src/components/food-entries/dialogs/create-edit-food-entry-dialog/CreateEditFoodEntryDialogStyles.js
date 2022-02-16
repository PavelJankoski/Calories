import {makeStyles} from "@material-ui/core/styles";

export const useCreateEditFoodEntryDialogStyles = makeStyles((theme) => ({
    createNewFoodEntry: {
        cursor: "pointer",
        color: "black",
        padding: "0.5em",
        "&:hover": {
            backgroundColor: theme.palette.background.default
        }
    },
    divLoader: {
        textAlign: "center"
    }
}));