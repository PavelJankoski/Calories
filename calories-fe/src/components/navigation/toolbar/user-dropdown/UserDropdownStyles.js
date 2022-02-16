import {makeStyles} from "@material-ui/core/styles";


export const useUserDropdownStyles = makeStyles(() => ({
    dropdownArrow: {
        position: "relative",
        top: "5px"
    },
    welcomeTypo: {
        cursor: "pointer"
    },
    dropDown: {
        top: "40px !important",
        left: "80px !important"
    }
}));
