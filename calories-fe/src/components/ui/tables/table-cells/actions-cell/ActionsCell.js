import {Button, TableCell} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import {useActionsCellStyles} from "./ActionsCellStyles";
import PropTypes from "prop-types";

const ActionsCell = (props) => {
    const classes = useActionsCellStyles();
    return (
        <TableCell align="center">
            {props.edit ?  <Button onClick={props.handleOnEditButton} className={classes.editButton}><Edit /></Button> : null}
            {props.delete ? <Button onClick={props.handleOnDeleteButton} className={classes.deleteButton}><Delete /></Button> : null}
        </TableCell>
    )
}

ActionsCell.propTypes = {
    handleOnEditButton: PropTypes.func,
    handleOnDeleteButton: PropTypes.func,
    edit: PropTypes.bool,
    delete: PropTypes.bool
}

ActionsCell.defaultProps = {
    edit: true,
    delete: true
}

export default ActionsCell;