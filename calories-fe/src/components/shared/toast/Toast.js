import {toast} from "react-toastify";
import {Error} from "@material-ui/icons";

const toastMessage = (message) => (
    <div style={{display: "inline-flex", alignItems: "center", paddingTop: "5px"}}>
        <Error/>
        <div style={{marginLeft: "0.75em"}}>
            {message}
        </div>
    </div>
)

export const toastSuccess = (message) => {
    toast.success(toastMessage(message), {
        position: toast.POSITION.BOTTOM_CENTER,
        draggable: false
    });
}

export const toastError = (message) => {
    toast.error(toastMessage(message), {
        position: toast.POSITION.BOTTOM_CENTER,
        draggable: false
    });
}
