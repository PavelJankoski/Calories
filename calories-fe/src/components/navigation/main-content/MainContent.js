import {useMainContentStyles} from "./MainContentStyles";
import Alert from '@material-ui/lab/Alert';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../../store/actions';

const MainContent = ({children}) => {
    const classes = useMainContentStyles();
    const dispatch = useDispatch();
    const todaysThreshold = useSelector(state => state.foodEntriesReducer.todaysThreshold);

    useEffect(() => {
        dispatch(actions.fetchDidPassTodaysThreshold())
    }, [dispatch]);

    return (
        <main className={classes.root}>
            {todaysThreshold.didPass ?
                <Alert severity="error" className={classes.alertBanner}>
                    You passed your threshold of {todaysThreshold.thresholdForUser} calories in the past 24 hours!
                </Alert> : null}
            <div className={classes.mainContentWrapper}>
                {children}
            </div>
        </main>
    )
}

export default MainContent;
