import {useChartsStyles} from "./ChartsStyles";
import {Grid, Paper} from "@material-ui/core";
import EntriesAddedChart from "./entries-added-chart/EntriesAddedChart";
import AverageCaloriesChart from "./average-calories-chart/AverageCaloriesChart";

const Charts = () => {
    const classes = useChartsStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <EntriesAddedChart />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <AverageCaloriesChart />
                    </Paper>
                </Grid>
            </Grid>

        </div>
    )
}

export default Charts;