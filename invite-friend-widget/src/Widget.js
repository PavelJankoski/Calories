import {Button, Popover, TextField} from "@material-ui/core";
import {useWidgetStyles} from "./WidgetStyles";
import {useState} from "react";
import {initialInputFieldsState} from "./WidgetHelper";

const Widget = () => {
    const classes = useWidgetStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [inputFields, setInputFields] = useState(initialInputFieldsState)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const validateEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(inputFields.email).toLowerCase());
    }

    const handleInputChange = (e) => {
        setInputFields({...inputFields,
            [e.target.name]: e.target.value
        })
    }

    const handleSendInvite = (e) => {
        e.preventDefault();
        handleClose();
        setInputFields(initialInputFieldsState);
        if (window && window.parent) {
            window.parent.postMessage(inputFields, '*');
        }
    }
    return (
        <>
            <Button variant="outlined" className={classes.inviteButton} color="primary" onClick={handleClick}>Invite a
                friend</Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classes.inputDiv}>
                    <TextField label="Name" type="text" name="name" value={inputFields.name} onChange={handleInputChange}/>
                    <br/>
                    <TextField label="Email" type="email" name={"email"} value={inputFields.email} onChange={handleInputChange}/>
                    <br/>
                    <Button className={classes.sendInviteButton}
                            color="primary"
                            disabled={!validateEmail() || !inputFields.name.trim()}
                            variant="contained"
                            onClick={handleSendInvite}>Send</Button>
                </div>
            </Popover>
        </>

    );
}

export default Widget;
