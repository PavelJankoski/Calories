import {Suspense} from "react";
import {Redirect, Route} from "react-router-dom";
import BackdropSpinner from "../../../shared/backdrop-spinner/BackdropSpinner";

const RouteWrapper = ({
                          component: Component,
                          layout: Layout,
                          showRoute,
                          redirectUrl,
                          ...rest
                      }) => {
    return (
        showRoute ?
        <Route {...rest} render={(props) =>
            <Layout>
                <Suspense fallback={<BackdropSpinner/>}>
                    <Component {...props} />
                </Suspense>
            </Layout>
        }/> : <Redirect to={redirectUrl} />
    );
}

export default RouteWrapper;
