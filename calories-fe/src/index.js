import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@material-ui/core/styles";
import {theme} from "./shared/theme/theme";
import {CssBaseline} from "@material-ui/core";
import {store} from "./store/store";
import {Provider} from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {CloseButton} from "./components/shared/toast/toast-close-button/ToastCloseButton";
import {ToastContainer} from "react-toastify";
import './assets/styles/Toastify.css';


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <ToastContainer autoClose={4000}
                                    hideProgressBar
                                    closeButton={CloseButton}/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <App/>
                    </MuiPickersUtilsProvider>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
