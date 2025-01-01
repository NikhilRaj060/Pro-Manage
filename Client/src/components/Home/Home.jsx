import styles from "./Home.module.css";
import Sidebar from "../Sidebar/Sidebar";
import ContainerPage from "../../pages/ContainerPage/ContainerPage";

export default function Home() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <ContainerPage />
    </div>
  );
}
