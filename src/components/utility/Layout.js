import React, {useState} from "react";

import SideNavbar from '../Navbar/SideBar';
import HeaderBar from '../Navbar/HeaderBar';

const BodyWrapper = ({children}) => {
  return (
        <main className="main-screen">
          {children}
        </main>
  );
};

export const DashboardLayout = ({ children }) => {
  const [navCollapse, setNavCollapse] = useState(false);
  return (
    <BodyWrapper>
        <section className={navCollapse ? "wrapper active": "wrapper"}>
              <div className="section">
                  <HeaderBar navCollapse={navCollapse} setNavCollapse={setNavCollapse} />
                  {children}
                  <SideNavbar navCollapse={navCollapse} setNavCollapse={setNavCollapse}/>
              </div>
        </section>
    </BodyWrapper>
  );
};
