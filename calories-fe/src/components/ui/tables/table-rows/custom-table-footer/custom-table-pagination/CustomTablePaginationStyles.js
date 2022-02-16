import {makeStyles} from "@material-ui/core/styles";

export const useCustomTablePaginationStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5)
    }
}));