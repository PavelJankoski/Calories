import {makeStyles} from "@material-ui/core/styles";

export const useFilterBoxStyles = makeStyles((theme) => ({
    root: {
        padding: "1.5em 3em",
        width: "100%",
        marginBottom: "1em"
    },
    buttonGrid: {
        alignSelf: "end",
        textAlign: "center",
        marginTop: "1em",
        [theme.breakpoints.up('sm')]: {
            textAlign: "right",
            marginTop: 0
        }
    },
    buttonBlock: {
        width: "100%"
    }
}));
