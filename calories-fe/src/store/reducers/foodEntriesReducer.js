import {
    initialAutocompleteFoodEntriesState, initialBarChartReportState,
    initialDailyThresholdsState, initialDialogLoadingsState,
    initialFoodEntriesState, initialPieChartReportState,
    initialTodaysThresholdState
} from "../../utils/reduxUtils";
import * as actionTypes from '../actionTypes';
import {updateObject} from "../../utils/utils";

const initialState = {
    foodEntries: initialFoodEntriesState,
    todaysThreshold: initialTodaysThresholdState,
    dailyThresholds: initialDailyThresholdsState,
    dialogLoading: initialDialogLoadingsState,
    autocompleteFoodEntries: initialAutocompleteFoodEntriesState,
    pieChartReport: initialPieChartReportState,
    barChartReport: initialBarChartReportState
}

const setFoodEntries = (state, action) => {
    return updateObject(state, {foodEntries: updateObject(state.foodEntries, {data: action.payload.data, page: action.page, rowsPerPage: action.rowsPerPage, count: action.payload.count})});
}

const setLoadingFoodEntries = (state, action) => {
    return updateObject(state, {foodEntries: updateObject(state.foodEntries, {loading: action.payload})})
}

const setUpdateDidPassTodaysThreshold = (state, action) => {
    return updateObject(state, {todaysThreshold: action.payload})
}

const setDailyThresholds = (state, action) => {
    return updateObject(state, {dailyThresholds: updateObject(state.dailyThresholds, {data: action.payload})});
}

const setLoadingDailyThresholds = (state, action) => {
    return updateObject(state, {dailyThresholds: updateObject(state.dailyThresholds, {loading: action.payload})})
}

const setDialogLoading = (state, action) => {
    return updateObject(state, {dialogLoading: updateObject(state.dialogLoading, {[action.typeOf]: action.payload})})
}

const setDeletedFoodEntry = (state, action) => {
    const tmpFoodEntries = [...state.foodEntries.data].filter(fe => fe.id !== action.payload);
    return updateObject(state, {foodEntries: updateObject(state.foodEntries, {data: tmpFoodEntries, count: state.foodEntries.count - 1})});
}

const setCreatedFoodEntry = (state, action) => {
    const tmpFoodEntries = [...state.foodEntries.data, action.payload];
    return updateObject(state, {foodEntries: updateObject(state.foodEntries, {data: tmpFoodEntries, count: state.foodEntries.count + 1})});
}

const setUpdatedFoodEntry = (state, action) => {
    let tmpFoodEntries = [...state.foodEntries.data]
    let tmpFoodEntryIndex = tmpFoodEntries.findIndex(fe => fe.id === action.id);
    tmpFoodEntries[tmpFoodEntryIndex] = updateObject(tmpFoodEntries[tmpFoodEntryIndex], {...action.payload});
    return updateObject(state, {foodEntries: updateObject(state.foodEntries, {data: tmpFoodEntries})});
}

const setAutocompleteValues = (state, action) => {
    return updateObject(state, {autocompleteFoodEntries: updateObject(state.autocompleteFoodEntries, {data: action.payload})});
}

const setLoadingAutocomplete = (state, action) => {
    return updateObject(state, {autocompleteFoodEntries: updateObject(state.autocompleteFoodEntries, {loading: action.payload})})
}

const setPieChartReport = (state, action) => {
    return updateObject(state, {pieChartReport: action.payload});
}

const setBarChartReport = (state, action) => {
    return updateObject(state, {barChartReport: action.payload});
}

const foodEntriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FOOD_ENTRIES_SUCCESS:
            return setFoodEntries(state, action);
        case actionTypes.SET_LOADING_FETCH_FOOD_ENTRIES:
            return setLoadingFoodEntries(state, action);
        case actionTypes.FETCH_TODAYS_THRESHOLD_SUCCESS:
            return setUpdateDidPassTodaysThreshold(state, action);
        case actionTypes.FETCH_DAILY_THRESHOLDS_SUCCESS:
            return setDailyThresholds(state, action);
        case actionTypes.SET_LOADING_FETCH_DAILY_THRESHOLDS:
            return setLoadingDailyThresholds(state, action);
        case actionTypes.SET_FOOD_ENTRY_DIALOG_LOADING:
            return setDialogLoading(state, action);
        case actionTypes.DELETE_FOOD_ENTRY_SUCCESS:
            return setDeletedFoodEntry(state, action);
        case actionTypes.CREATE_FOOD_ENTRY_SUCCESS:
            return setCreatedFoodEntry(state, action);
        case actionTypes.UPDATE_FOOD_ENTRY_SUCCESS:
            return setUpdatedFoodEntry(state, action);
        case actionTypes.SET_AUTOCOMPLETE_LOADING:
            return setLoadingAutocomplete(state, action);
        case actionTypes.FETCH_AUTOCOMPLETE_SUCCESS:
            return setAutocompleteValues(state, action);
        case actionTypes.FETCH_PIE_CHART_REPORT_SUCCESS:
            return setPieChartReport(state, action);
        case actionTypes.FETCH_BAR_CHART_REPORT_SUCCESS:
            return setBarChartReport(state, action);
        default:
            return state;
    }
}

export default foodEntriesReducer;
