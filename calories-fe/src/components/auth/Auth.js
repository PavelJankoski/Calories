import Typography from "@material-ui/core/Typography";
import {Box, Button, Container, Grid, Link, TextField} from "@material-ui/core";
import toptalLogo from '../../assets/images/toptal-logo-small.png';
import {useCallback, useState} from "react";
import {Alert} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../store/actions';
import {updateObject, validateEmail} from "../../utils/utils";
import {initialInputFieldsState} from "./AuthHelper";

const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);
    const authError = useSelector(state => state.authReducer.error);
    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState(initialInputFieldsState);
    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            email: inputFields.email,
            password: inputFields.password
        }
        if(isRegister) {
            actions.registerUser(updateObject(body, {name: inputFields.name}));
        }
        else {
            dispatch(actions.loginUser(body));
        }
    };

    const handleOnInputChange = useCallback((e) => {
        setInputFields(inoutFields => updateObject(inoutFields, {[e.target.name]: e.target.value}))
    }, []);

    const isSubmitButtonDisabled = useCallback(() => {
        const initialValidation = !validateEmail(inputFields.email) || !inputFields.password.trim()
        if(isRegister) {
            return initialValidation || !inputFields.name.trim()
        }
        return initialValidation
    }, [inputFields, isRegister])

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img src={toptalLogo} alt={"toptal logo"} style={{width: "50px"}}/>
                <Typography component="h1" variant="h5">
                    {isRegister ? "Register": "Log In"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    {isRegister ? <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Name"
                        value={inputFields.name}
                        onChange={handleOnInputChange}
                        name="name"
                        autoFocus
                    /> : null }
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        type="email"
                        label="Email Address"
                        name="email"
                        value={inputFields.email}
                        onChange={handleOnInputChange}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value={inputFields.password}
                        onChange={handleOnInputChange}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        disabled={isSubmitButtonDisabled()}
                        variant="contained"
                        color="primary"
                        sx={{mt: 3, mb: 2}}
                    >
                        {isRegister ? "Register": "Log In"}
                    </Button>
                    {authError && !isRegister ? <Alert severity="error" style={{marginBlock: "1em"}}>Your email or password is invalid, please try again</Alert>: null}
                    <Grid container>
                        <Link variant="body2" style={{cursor: "pointer"}} onClick={() => setIsRegister(!isRegister)}>
                            {isRegister ? "Already have an account? Log in" :"Don't have an account? Register"}
                        </Link>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Auth;