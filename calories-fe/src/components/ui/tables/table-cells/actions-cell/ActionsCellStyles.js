import {makeStyles} from "@material-ui/core";

export const useActionsCellStyles = makeStyles((theme) => ({
    editButton: {
        color: theme.palette.success.main
    },
    deleteButton: {
        color: theme.palette.error.main
    }
}));