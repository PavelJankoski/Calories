import {NUTRITIONIX_API_DRIVER} from "../config/axiosConfig";

const NutritionixApi = {
    searchFoodEntry: (query) => {
        return NUTRITIONIX_API_DRIVER.get('/v2/search/instant', {
            params: {
                query: query,
                branded: true
            }
        })
    }
}

export default NutritionixApi;