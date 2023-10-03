import React from "react";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo></Logo>
      <AppNav></AppNav>
      <Outlet/>
      <Footer />
    </div>
  );
};

export default Sidebar;
