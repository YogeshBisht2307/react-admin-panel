import React, {useState} from "react";

import SideNavbar from '../Navbar/SideBar';
import HeaderBar from '../Navbar/HeaderBar';
import BodyWrapper from "./BodyWrapper";

export const DashboardLayout = ({ children }) => {
  const [navCollapse, setNavCollapse] = useState(false);
  return (
    <BodyWrapper>
        <section className={navCollapse ? "side-bar-navigation active": "side-bar-navigation"}>
            <div className="wrapper">
                <div className="section">
                    <HeaderBar navCollapse={navCollapse} setNavCollapse={setNavCollapse} />
                    {children}
                    <SideNavbar navCollapse={navCollapse} setNavCollapse={setNavCollapse}/>
                </div>
            </div>
        </section>
    </BodyWrapper>
  );
};
