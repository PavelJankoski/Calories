import {Redirect, Switch} from "react-router-dom";
import {getRoutes} from "./navigation/routing/routes";
import RouteWrapper from "./navigation/routing/route-wrapper/RouteWrapper";
import {useSelector} from "react-redux";
import {routePaths} from "../utils/constants";

const App = () => {
    const isAuth = useSelector(state => state.authReducer.accessToken)
    const role = useSelector(state => state.authReducer.role)
    return (
        <Switch>
            {getRoutes(!!isAuth, role).map((r) => (
                <RouteWrapper key={r.path}
                              path={r.path}
                              exact
                              showRoute={r.guard}
                              component={r.component}
                              redirectUrl={r.redirectUrl}
                              layout={r.layout} />
            ))}
            <Redirect to={!!isAuth ? routePaths.FOOD_ENTRIES : routePaths.AUTH} />
        </Switch>
    );
}

export default App;
