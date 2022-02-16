import React, {useState} from 'react';
import CustomToolbar from "./toolbar/CustomToolbar";
import Sidebar from "./sidebar/Sidebar";
import MainContent from "./main-content/MainContent";


const Navigation = ({children}) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <React.Fragment>
            <CustomToolbar handleSidebarToggle={handleSidebarToggle} />
            <Sidebar sidebarOpen={sidebarOpen} handleSidebarToggle={handleSidebarToggle}/>
            <MainContent>
                {children}
            </MainContent>
        </React.Fragment>
    );
}

export default Navigation;
