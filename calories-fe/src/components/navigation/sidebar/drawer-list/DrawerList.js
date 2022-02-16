import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import DrawerListItem from "./drawer-list-item/DrawerListItem";
import {useDrawerListStyles} from "./DrawerListStyles";
import sidebarLogo from '../../../../assets/images/toptal-logo.png';
import renderDrawerListItems from "./DrawerListHelper";
import {useSelector} from "react-redux";

const DrawerList = () => {
    const classes = useDrawerListStyles();
    const role = useSelector(state => state.authReducer.role)
    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div">
                    <img alt="toptal-logo" src={sidebarLogo} className={classes.sidebarLogo}/>
                </ListSubheader>
            }
            className={classes.root}
        >
            {renderDrawerListItems(role).map((item, idx) =>
                item.render ? (
                    <DrawerListItem key={`drawer-list-item-${idx}`}
                                    text={item.text}
                                    fontStyle="subtitle2"
                                    to={item.to}
                                    icon={item.icon}/>
                ) : null)}
        </List>
    );
}


export default DrawerList;
