import * as actionTypes from '../actionTypes';
import {store} from "../store";
import axios from "axios";
import FoodEntriesApi from "../../api/FoodEntriesApi";
import NutritionixApi from "../../api/NutritionixApi";
import {toastError, toastSuccess} from "../../components/shared/toast/Toast";

let fetchFoodEntriesCancelToken = axios.CancelToken.source();

export const fetchFoodEntries = (page, size, sort, filter) => {
    const loading = store.getState().foodEntriesReducer.foodEntries.loading;
    return dispatch => {
        if (loading) {
            fetchFoodEntriesCancelToken.cancel();
            fetchFoodEntriesCancelToken = axios.CancelToken.source();
        }
        dispatch({type: actionTypes.SET_LOADING_FETCH_FOOD_ENTRIES, payload: true});
        FoodEntriesApi.fetchFoodEntries(page, size, sort, filter, fetchFoodEntriesCancelToken).then(res => {
            dispatch({type: actionTypes.FETCH_FOOD_ENTRIES_SUCCESS, payload: res.data, page: page, rowsPerPage: size});
            dispatch({type: actionTypes.SET_LOADING_FETCH_FOOD_ENTRIES, payload: false});
        }).catch(e => {
            if (!axios.isCancel(e)) {
                dispatch({type: actionTypes.SET_LOADING_FETCH_FOOD_ENTRIES, payload: false});
            }
        })
    }
}

export const fetchDidPassTodaysThreshold = () => {
    return dispatch => {
        FoodEntriesApi.fetchTodaysThreshold().then(res => {
            dispatch({type: actionTypes.FETCH_TODAYS_THRESHOLD_SUCCESS, payload: res.data});
        }).catch(e => console.error(e))
    }
}

export const fetchDailyThresholds = () => {
    return dispatch => {
        dispatch({type: actionTypes.SET_LOADING_FETCH_DAILY_THRESHOLDS, payload: true});
        FoodEntriesApi.fetchDailyThresholds().then(res => {
            dispatch({type: actionTypes.FETCH_DAILY_THRESHOLDS_SUCCESS, payload: res.data});
        }).catch(e => console.error(e)).finally(() => {
            dispatch({type: actionTypes.SET_LOADING_FETCH_DAILY_THRESHOLDS, payload: false});
        })
    }
}

export const deleteFoodEntry = (foodEntryId) => {
    return dispatch => {
        dispatch({type: actionTypes.SET_FOOD_ENTRY_DIALOG_LOADING, typeOf: "deleteLoading", payload: true})
        FoodEntriesApi.deleteFoodEntry(foodEntryId).then(() => {
            dispatch({type: actionTypes.DELETE_FOOD_ENTRY_SUCCESS, payload: foodEntryId});
            toastSuccess("Successfully deleted food entry!");
            dispatch(fetchDidPassTodaysThreshold());
            dispatch(fetchDailyThresholds());
        }).catch(e => {
            toastError("Error deleting food entry!");
            console.error(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_FOOD_ENTRY_DIALOG_LOADING, typeOf: "deleteLoading", payload: false})
        })
    }
}

export const createFoodEntry = (foodEntry) => {
    return dispatch => {
        dispatch({type: actionTypes.SET_FOOD_ENTRY_DIALOG_LOADING, typeOf: "createEditLoading", payload: true})
        FoodEntriesApi.createFoodEntry(foodEntry).then(res => {
            dispatch({type: actionTypes.CREATE_FOOD_ENTRY_SUCCESS, payload: res.data});
            dispatch(fetchDidPassTodaysThreshold());
            dispatch(fetchDailyThresholds());
            toastSuccess("Successfully created food entry!");
        }).catch(e => {
            toastError("Error creating food entry!");
            console.error(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_FOOD_ENTRY_DIALOG_LOADING, typeOf: "createEditLoading", payload: false})
        })
    }
}

export const updateFoodEntry = (id, foodEntry) => {
    return dispatch => {
        dispatch({type: actionTypes.SET_FOOD_ENTRY_DIALOG_LOADING, typeOf: "createEditLoading", payload: true})
        FoodEntriesApi.updateFoodEntry(id, foodEntry).then(res => {
            dispatch({type: actionTypes.UPDATE_FOOD_ENTRY_SUCCESS, payload: res.data, id: id});
            toastSuccess("Successfully updated food entry!");
            dispatch(fetchDidPassTodaysThreshold());
            dispatch(fetchDailyThresholds());
        }).catch(e => {
            console.error(e);
            toastError("Error updating food entry!");
        }).finally(() => {
            dispatch({type: actionTypes.SET_FOOD_ENTRY_DIALOG_LOADING, typeOf: "createEditLoading", payload: false})
        })
    }
}

export const fetchAutocompleteFoodEntries = (query) => {
    return dispatch => {
        dispatch({type: actionTypes.SET_AUTOCOMPLETE_LOADING, payload: true});
        NutritionixApi.searchFoodEntry(query).then(res => {
            dispatch({type: actionTypes.FETCH_AUTOCOMPLETE_SUCCESS, payload: mapAutocompleteData(res.data.branded)});
        }).catch(e => console.error(e)).finally(() => {
            dispatch({type: actionTypes.SET_AUTOCOMPLETE_LOADING, payload: false});
        })
    }
}

export const fetchPieChartData = () => {
    return dispatch => {
        FoodEntriesApi.fetchPieChartReportData().then(res => {
            dispatch({type: actionTypes.FETCH_PIE_CHART_REPORT_SUCCESS, payload: res.data});
        }).catch(e => {
            toastError("Error fetching reports!");
            console.error(e);
        });
    }
}

export const fetchBarChartData = () => {
    return dispatch => {
        FoodEntriesApi.fetchBarChartReportData().then(res => {
            dispatch({type: actionTypes.FETCH_BAR_CHART_REPORT_SUCCESS, payload: mapBarChartData(res.data)});
        }).catch(e => console.error(e));
    }
}


const mapAutocompleteData = (data) => {
    return data.map(i => {
        return {
            title: i.food_name,
            calories: i.nf_calories || 0
        }
    })
}

const mapBarChartData = (data) => {
    const users = []
    const avgCalories = []
    data.forEach(i => {
        users.push(i.userId);
        avgCalories.push(i.avgCalories);
    })
    return {
        users: users,
        avgCalories: avgCalories
    }
}