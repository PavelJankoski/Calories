import {AssignmentOutlined, Fastfood} from "@material-ui/icons";
import {navLinkLabels, routePaths} from "../../../../utils/constants";

const renderDrawerListItems = (role) => {
    return [
        {
            text: navLinkLabels.FOOD_ENTRIES,
            to: routePaths.FOOD_ENTRIES,
            icon: <Fastfood />,
            render: true
        },
        {
            text: navLinkLabels.REPORTS,
            to: routePaths.REPORTS,
            icon: <AssignmentOutlined />,
            render: role === "ROLE_ADMIN"
        }
    ]
}

export default renderDrawerListItems;
