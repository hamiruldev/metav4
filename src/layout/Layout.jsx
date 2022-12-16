import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
 
      <div className="">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/game">Game</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact-us">ContactUs</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Outlet />
      </div>
    </>
  );
};

export default Layout;
