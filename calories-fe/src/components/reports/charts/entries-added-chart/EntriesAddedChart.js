import Chart from "react-apexcharts";
import {useEffect, useMemo} from "react";
import {Typography} from "@material-ui/core";
import {getPieChartData} from "../ChartsHelper";
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../../../store/actions';

const EntriesAddedChart = () => {
    const fetchedChartData = useSelector(state => state.foodEntriesReducer.pieChartReport);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.fetchPieChartData());
    }, [dispatch])

    const chartData = useMemo(() => {
        return getPieChartData(fetchedChartData.lastWeek, fetchedChartData.weekBeforeLast)
    }, [fetchedChartData]);
    return (
        <>
            <Typography variant="subtitle2" style={{padding: "1em"}}>Food entries added: Last week vs. week before last week</Typography>
            <Chart options={chartData.options} series={chartData.series} type="pie" width={380} />
        </>
    )
}

export default EntriesAddedChart;