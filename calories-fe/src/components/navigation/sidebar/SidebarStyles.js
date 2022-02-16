import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;

export const useSidebarStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        }
    },
    drawerPaper: {
        width: drawerWidth
    },
    toolbar: theme.mixins.toolbar
}));
