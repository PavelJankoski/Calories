import Chart from "react-apexcharts";
import {Typography} from "@material-ui/core";
import {useEffect, useMemo} from "react";
import {getBarChartData} from "../ChartsHelper";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../../store/actions";

const AverageCaloriesChart = () => {
    const fetchedChartData = useSelector(state => state.foodEntriesReducer.barChartReport);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.fetchBarChartData());
    }, [dispatch])

    const chartData = useMemo(() => {
        return getBarChartData(fetchedChartData.users, fetchedChartData.avgCalories)
    }, [fetchedChartData])

    return (
        <>
            <Typography variant="subtitle2" style={{padding: "1em"}}>Average calories per user for the past week</Typography>
            <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </>
    )
}

export default AverageCaloriesChart;