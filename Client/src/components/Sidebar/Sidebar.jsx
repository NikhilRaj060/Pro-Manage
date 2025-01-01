import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { sideBarMenu } from "../../model/sideBarMenu";
import image from "../../Image/codesandbox.svg";
import { useModal } from "../../Hook/ModalContext";
import { Modal, Box } from "@mui/material";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const Sidebar = React.memo(() => {
  const conirmationModalStyle = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "22%",
    height: "25%",
    bgcolor: "#FFFFFF",
    borderRadius: 2.5,
    outline: "none",
  };
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isLogOutModalOpen,
    openLogOutModal,
    closeLogoutModal,
  } = useModal();

  sideBarMenu.forEach((element) => {
    element.isActive = location.pathname.includes(element.route);
  });

  const handleLogout = () => {
    openLogOutModal();
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
                <img className={styles.image} src={`/image/${element.imgsrc}`} alt={element.imgname} />
                {element?.title}
              </div>
            </>
          ))}
        </div>
      </div>
      <div className={styles.footer} onClick={handleLogout}>

        <div className={styles.logoutButton}>
        <img className={styles.image} src={`../../image/logout.svg`} alt="logout" />
        Log out
        </div>
      </div>
      <Modal
        open={isLogOutModalOpen}
        onClose={closeLogoutModal}
        aria-labelledby="modal-detel"
        aria-describedby="Modal for delete"
        sx={{
          "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <Box sx={{ ...conirmationModalStyle }}>
          <ConfirmationModal data={"Log out"} />
        </Box>
      </Modal>
    </div>
  );
});

export default Sidebar;
