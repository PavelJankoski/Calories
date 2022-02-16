import {makeStyles} from "@material-ui/core/styles";

const useButtonWithProgressStyles = makeStyles((theme) => ({
    wrapper: {
        position: 'relative',
    },
    buttonProgress: {
        color: theme.palette.primary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default useButtonWithProgressStyles;