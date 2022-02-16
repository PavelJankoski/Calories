import {makeStyles} from "@material-ui/core/styles";

export const useDrawerListStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: "transparent",
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    sidebarLogo: {
        height: "100%",
        width: "100%",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12"
    },
    inviteAFriendWidget: {
        margin: "auto 1em 1em 1em"
    }
}));
