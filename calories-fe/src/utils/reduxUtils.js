
export const initialFoodEntriesState = {
    data: [],
    page: 0,
    rowsPerPage: 5,
    count: 0,
    loading: false,
}

export const initialDailyThresholdsState = {
    data: [],
    loading: false
}

export const initialTodaysThresholdState = {
    didPass: false,
    thresholdForUser: 0
}

export const initialDialogLoadingsState = {
    deleteLoading: false,
    createEditLoading: false
}

export const initialAutocompleteFoodEntriesState = {
    loading: false,
    data: []
}

export const initialPieChartReportState = {
    lastWeek: 0,
    weekBeforeLast: 0
}

export const initialBarChartReportState = {
    users: [],
    avgCalories: []
}

export const initialAuthState = {
    accessToken: "",
    tokenType: "Bearer",
    email: "",
    role: "",
    name: ""
}