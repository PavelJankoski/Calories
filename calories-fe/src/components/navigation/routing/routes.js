import {routePaths} from "../../../utils/constants";
import DefaultLayout from "../../../layouts/default/DefaultLayout";
import {lazy} from "react";
import AuthLayout from "../../../layouts/auth/AuthLayout";

const FoodEntries = lazy(() => import('../../food-entries/FoodEntries'));
const Reports = lazy(() => import('../../reports/Reports'));
const Auth = lazy(() => import('../../auth/Auth'));

export const getRoutes = (isAuth, role) => {
    return [
        {
            path: routePaths.FOOD_ENTRIES,
            component: FoodEntries,
            layout: DefaultLayout,
            guard: isAuth,
            redirectUrl: routePaths.AUTH
        },
        {
            path: routePaths.REPORTS,
            component: Reports,
            layout: DefaultLayout,
            guard: isAuth && role === "ROLE_ADMIN",
            redirectUrl: routePaths.AUTH
        },
        {
            path: routePaths.AUTH,
            component: Auth,
            layout: AuthLayout,
            guard: !isAuth,
            redirectUrl: routePaths.FOOD_ENTRIES
        }
    ]
}

