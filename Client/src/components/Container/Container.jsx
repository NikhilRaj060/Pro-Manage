import React from "react";
import styles from "./Container.module.css";
import { Outlet } from 'react-router-dom'


function Container() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Container;
