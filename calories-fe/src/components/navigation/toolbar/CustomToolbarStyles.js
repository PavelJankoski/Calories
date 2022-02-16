import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;

export const useCustomToolbarStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        // backgroundColor: colors.primary.contrastText
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbarText: {
        flexGrow: "1"
    }
}));
