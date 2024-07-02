import React from "react";
import { Modal, Box } from "@mui/material";
import { useModal } from "../../Hook/ModalContext";
import { deleteTask } from "../../api/task";
import styles from "./DeleteModal.module.css";
import { toast , Bounce } from "react-toastify";

const DeleteModal = () => {
    const quizBuilderStyle = {
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "66%",
        height: "45%",
        bgcolor: "#FFFFFF",
        borderRadius: 2.5,
        outline: "none",
    };

    const { isDeleteModalOpen, closeDeleteModal, quizId } = useModal();

    const handleCancel = () => {
        closeDeleteModal();
    };

    const handleDelete = async () => {
        let res = await deleteTask(quizId);
        if (res && res.message) {
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
                className: "custom_toast"
            }
            );
        }
    };

    return (
        <Modal open={isDeleteModalOpen} onClose={closeDeleteModal}>
            <Box sx={{ ...quizBuilderStyle }}>
                <div className={styles.main}>
                    <div className={styles.header}>
                        <h2 className={styles.text}>
                            Are you confirm you want to delete ?
                        </h2>
                    </div>
                    <div className={styles.button}>
                        <div className={styles.delete_button} onClick={handleDelete}>
                            {" "}
                            Confirm Delete{" "}
                        </div>
                        <div className={styles.cancel_button} onClick={handleCancel}>
                            {" "}
                            Cancel{" "}
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default DeleteModal;
