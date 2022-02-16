import {unstable_createMuiStrictModeTheme} from "@material-ui/core";
import {colors} from "./colors";

export const theme = unstable_createMuiStrictModeTheme({
    palette: {
        ...colors
    }
})
