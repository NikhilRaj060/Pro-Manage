import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { sideBarMenu } from "../../lib/sideBarMenu";
import image from "../../Image/codesandbox.svg";

const Sidebar = React.memo(() => {
  const location = useLocation();
  const navigate = useNavigate();

  sideBarMenu.forEach((element) => {
    element.isActive = location.pathname.includes(element.route);
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("auth/login");
  };

  const handleClick = (element) => {
      navigate(element?.route);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <img className={styles.image} src={image} alt="pro manage" />
          <div className={styles.header}>Pro Manage</div>
        </div>
        <div className={styles.sidebarMenu}>
          {sideBarMenu.map((element) => (
            <>
              <div
                key={element?.title}
                className={
                  element?.isActive
                  ? styles.sidebarMenuItemActive
                  : styles.sidebarMenuItem
                }
                onClick={() => handleClick(element)}
              >
                <img className={styles.image} src={`/Image/${element.imgsrc}`} alt={element.imgname} />
                {element?.title}
              </div>
            </>
          ))}
        </div>
      </div>
      <div className={styles.footer} onClick={handleLogout}>

        <div className={styles.logoutButton}>
        <img className={styles.image} src={`../../Image/logout.svg`} alt="logout" />
        Log out
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
