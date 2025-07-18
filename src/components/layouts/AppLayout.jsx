import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import LanguagePrefixInUrl from "../LanguageFromUrl";


function AppLayout() {
    return (
        <>
            {/* <LanguagePrefixInUrl /> */}
            <NavBar />
            <div >
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default AppLayout;
