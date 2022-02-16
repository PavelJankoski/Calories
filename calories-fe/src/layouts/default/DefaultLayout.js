import Navigation from "../../components/navigation/Navigation";

const DefaultLayout = ({children}) => {
    return (
        <Navigation>
            {children}
        </Navigation>
    )
}

export default DefaultLayout;
