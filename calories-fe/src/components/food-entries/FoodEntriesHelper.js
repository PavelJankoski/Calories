export const initialFilterState = {
    productName: "",
    from: null,
    to: null
}

export const sortingCriteria = [
    {
        text: "Time added",
        value: "takenOn"
    },
    {
        text: "Calories",
        value: "calories"
    },
]

export const initialDeleteFoodEntryState = {
    id: 0,
    productName: ""
}

export const initialCreateEditFoodEntryState = {
    id: 0,
    productName: "",
    calories: "",
    takenOn: null,
    takenOnDate: null
}
