import React from "react";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";


const MainNavigation =() => {
    return (
        <React.Fragment>
            <MainHeader>
                <nav>
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;