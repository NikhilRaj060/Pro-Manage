import React, { useState } from "react";
import styles from "./CardBoard.module.css";
import { VscCollapseAll } from "react-icons/vsc";
import { IoAddSharp } from "react-icons/io5";
import Card from "../Card/Card";
import { Modal, Box } from "@mui/material";
import { useModal } from "../../Hook/ModalContext";
import TaskBuilder from "../TaskBuilder/TaskBuilder";
import Skeleton from "@mui/material/Skeleton";

function CardBoard({ isLoading , data, taskData , setLoadingChange }) {
  const [formData, setFormData] = useState({});
  const {
    isQuizBuilderModalOpen,
    openQuizBuilderModal,
    closeQuizBuilderModal,
  } = useModal();
  const skeletonsCard = Array.from({ length: 3 });


  const quizBuilderStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "45%",
    height: "65%",
    bgcolor: "#FFFFFF",
    borderRadius: 5.5,
    outline: "none",
  };

  const [collapseAll, setCollapseAll] = useState(false);

  const handleCollapseAllToggle = () => {
    setCollapseAll(!collapseAll);
  };

  const handleClick = () => {
    openQuizBuilderModal(formData, false);
  };

  const handleLoadingChange = (loading) => {
    setLoadingChange(loading);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>{data?.title}</div>
          <div>
            {data?.type === "TODO" && (
              <IoAddSharp
                className={styles.add_icon}
                fill="#000000"
                onClick={handleClick}
              />
            )}
            <VscCollapseAll
              className={styles.icon}
              onClick={handleCollapseAllToggle}
            />
          </div>
        </div>
        <div className={styles.card}>
          {isLoading
            ? skeletonsCard.map((_, index) => (
                <Skeleton
                  key={index}
                  className={styles.skeletons_task}
                  variant="rounded"
                />
              ))
            : taskData.map((task) => (
                <Card onLoadingChange={handleLoadingChange} key={task._id} collapseAll={collapseAll} task={task} />
              ))}
        </div>
      </div>
      <Modal
        open={isQuizBuilderModalOpen}
        onClose={closeQuizBuilderModal}
        sx={{
          "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0.2)" },
        }}
        aria-labelledby="modal-task-builder"
        aria-describedby="Modal task builder"
      >
        <Box sx={{ ...quizBuilderStyle }}>
          <TaskBuilder />
        </Box>
      </Modal>
    </>
  );
}

export default CardBoard;
