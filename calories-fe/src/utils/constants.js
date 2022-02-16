export const routePaths = {
    FOOD_ENTRIES: "/food-entries",
    REPORTS: "/reports",
    AUTH: "/auth"
}

export const navLinkLabels = {
    FOOD_ENTRIES: "Food Entries",
    REPORTS: "Reports"
}

export const foodEntriesTableHeadLabels = {
    ID: "ID",
    FOOD_NAME: "Food name",
    TIME_ADDED: "Time added",
    CALORIES: "Calories",
    USER_ID: "User ID",
    ACTIONS: "Actions"
}

export const dailyThresholdsTableHeadLabels = {
    DATE: "Date",
    CALORIES: "Calories"
}

// API ENDPOINTS
export const endpoints = {
    FOOD_ENTRIES: "/api/food-entries",
    FETCH_TODAYS_THRESHOLD: "/api/food-entries/todays-threshold",
    FETCH_DAILY_THRESHOLDS: "/api/food-entries/daily-thresholds",
    FETCH_PIE_CHART_REPORT_DATA: "/api/food-entries/food-entries-period-report",
    FETCH_BAR_CHART_REPORT_DATA: "/api/food-entries/calories-per-user-report",
    LOGIN: "/api/auth/log-in",
    REGISTER: "/api/auth/register",
    INVITE_FRIEND: "/api/users/invite-friend"
}

export const storeConstants = {
    AUTH: "auth"
}