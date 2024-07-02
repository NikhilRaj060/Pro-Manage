import React from "react";
import { useModal } from "../../Hook/ModalContext";
import { deleteTask } from "../../api/task";
import styles from "./ConfirmationModal.module.css";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ConfirmationModal = ({ data }) => {
  const navigate = useNavigate();
  const { closeDeleteModal, closeLogoutModal, taskId, createTaskSuccess } =
    useModal();

  const handleCancel = () => {
    if (taskId) {
      closeDeleteModal();
    } else {
      closeLogoutModal();
    }
  };

  const handleClick = async () => {
    if (!taskId) {
      closeLogoutModal();
      localStorage.clear();
      navigate("auth/login");  
    } else {
      let res = await deleteTask(taskId);
      if (res && res.message) {
        createTaskSuccess();
        handleCancel();
        toast.success(res.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          className: "custom_toast",
        });
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.text}>Are you sure you want to {data} ?</div>
      </div>
      <div className={styles.button}>
        <div className={styles.delete_button} onClick={handleClick}>
          Yes, {data}
        </div>
        <div className={styles.cancel_button} onClick={handleCancel}>
          Cancel
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
