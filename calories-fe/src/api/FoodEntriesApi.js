import {API_DRIVER} from "../config/axiosConfig";
import {endpoints} from "../utils/constants";

const FoodEntriesApi = {
    fetchFoodEntries: (page, size, sort, filter, cancelToken) => {
        return API_DRIVER.get(endpoints.FOOD_ENTRIES, {
            params: {
                page: page,
                size: size,
                sort: sort,
                from: filter.from,
                to: filter.to,
                ...(filter.productName.length !== 0 && {productName: filter.productName})
            },
            cancelToken: cancelToken.token
        })
    },
    fetchTodaysThreshold: () => {
        return API_DRIVER.get(endpoints.FETCH_TODAYS_THRESHOLD)
    },
    fetchDailyThresholds: () => {
        return API_DRIVER.get(endpoints.FETCH_DAILY_THRESHOLDS)
    },
    deleteFoodEntry: (foodEntryId) => {
        return API_DRIVER.delete(endpoints.FOOD_ENTRIES + `/${foodEntryId}`);
    },
    createFoodEntry: (foodEntry) => {
        return API_DRIVER.post(endpoints.FOOD_ENTRIES, foodEntry)
    },
    updateFoodEntry: (id, body) => {
        return API_DRIVER.patch(endpoints.FOOD_ENTRIES + `/${id}`, body)
    },
    fetchPieChartReportData: () => {
        return API_DRIVER.get(endpoints.FETCH_PIE_CHART_REPORT_DATA)
    },
    fetchBarChartReportData: () => {
        return API_DRIVER.get(endpoints.FETCH_BAR_CHART_REPORT_DATA)
    }
}

export default FoodEntriesApi;