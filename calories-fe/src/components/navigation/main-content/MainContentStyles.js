import {makeStyles} from "@material-ui/core/styles";

export const useMainContentStyles = makeStyles((theme) => ({
    root: {
        marginTop: "56px",
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            marginTop: "64px",
            marginLeft: "240px"
        }
    },
    mainContentWrapper: {
        padding: "1em"
    },
    alertBanner: {
        position: "sticky",
        top: "56px",
        zIndex: "1000",
        [theme.breakpoints.up('sm')]: {
            top: "64px"
        }
    }
}));
