import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Sidebar from "../Sidebar/Sidebar";
import ContainerPage from "../../pages/ContainerPage/ContainerPage";

export default function Home() {
  const [token] = useState(!!localStorage.getItem("token"));

  return (
    <div className={styles.container}>
      <Sidebar />
      <ContainerPage />
    </div>
  );
}
