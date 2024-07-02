import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import { FaEllipsis, FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Chip from "../Chip/Chip";
import { cardMenu } from "../../lib/cardMenu";
import Checkbox from "@mui/material/Checkbox";
import useFormattedDate from "../../Hook/useFormattedDate";
import dayjs from "dayjs";
import { updateTaskType } from "../../api/task";
import { useModal } from "../../Hook/ModalContext.jsx";
import { toast, Bounce } from "react-toastify";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Modal, Box } from "@mui/material";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import Tooltip from "@mui/material/Tooltip";

function Card({ collapseAll, task, onLoadingChange }) {
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

  const formatDate = useFormattedDate();
  const [taskData, setTaskData] = useState([]);
  const [dueDatePassed, setDueDatePassed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    createTaskSuccess,
    openTaskBuilderModal,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
  } = useModal();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    setTaskData(task);
  }, [task]);

  useEffect(() => {
    if (collapseAll) {
      setIsCollapsed(true);
    }
  }, [collapseAll]);

  useEffect(() => {
    const checkDueDate = (dueDateString) => {
      const dueDate = dayjs(dueDateString).startOf("day");
      const currentDate = dayjs().startOf("day");
      return dueDate.isBefore(currentDate);
    };

    const isPassed = checkDueDate(task.dueDate);

    setDueDatePassed(isPassed);
  }, []);

  useEffect(() => {
    let count = 0;
    task?.tasks?.forEach((task) => {
      if (task?.completed) {
        count++;
      }
    });
    setCompletedCount(count);
  }, [task]);

  const handleTaskCompletionChange = (taskId, completed) => {
    const updatedTasks = task?.tasks?.map((t) =>
      t._id === taskId ? { ...t, completed: !completed } : t
    );
    task.tasks = updatedTasks;
    setCompletedCount(updatedTasks?.filter((t) => t.completed).length);
  };

  const handleChipClick = async (newType) => {
    try {
      onLoadingChange(true);
      const updatedTask = await updateTaskType(taskData._id, newType);
      if (updatedTask && updatedTask?.message) {
        createTaskSuccess();
        setTaskData(updatedTask.data);
        toast.success(updatedTask?.message, {
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
        onLoadingChange(false);
      }
    } catch (error) {
      onLoadingChange(false);
      console.error("Error updating task type:", error);
    }
  };

  const handleShare = () => {
    toast.success("Link copied to Clipboard!", {
      position: "top-right",
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
    handleClose();
  };
  const handleEdit = () => {
    openTaskBuilderModal(taskData, true);
    handleClose();
  };

  const handleDelete = () => {
    openDeleteModal(task?.taskId);
    handleClose();
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.priority_container}>
          <div
            style={{ background: task?.priority?.color }}
            className={styles.priority_circle}
          ></div>
          <div className={styles.priority}>{task?.priority?.title}</div>
        </div>
        <div className={styles.icon_container}>
          <FaEllipsis
            className={styles.icon}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
            TransitionComponent={Fade}
            sx={{
              "& .MuiPaper-root": {
                position: "absolute",
                borderRadius: "10px",
                width: "10%",
              },
            }}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleShare}>Share</MenuItem>
            <MenuItem style={{ color: "#CF3636" }} onClick={handleDelete}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>
      <Tooltip
        title={task?.title}
        placement="bottom"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -8],
                },
              },
            ],
          },
        }}
      >
        <div className={styles.title}>{truncateText(task?.title, 35)}</div>
      </Tooltip>
      <div className={styles.task_list_conainer}>
        <div className={styles.check_list_conainer}>
          <div className={styles.check_list}>
            Checklist ({completedCount}/{task?.tasks?.length})
          </div>
          <div className={styles.angle_icon} onClick={handleCollapseToggle}>
            {isCollapsed ? <FaAngleUp /> : <FaAngleDown />}
          </div>
        </div>
        {!isCollapsed && (
          <div className={styles.tasks}>
            {task?.tasks?.map((data) => (
              <div className={styles.task} key={data?._id}>
                <Checkbox
                  checked={data?.completed}
                  style={{
                    borderRadius: "6px",
                    padding: "0",
                    paddingRight: "5px",
                  }}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fill: data?.completed ? "#17A2B8" : "#E2E2E2",
                      fontSize: 25,
                    },
                  }}
                  onChange={() =>
                    handleTaskCompletionChange(data._id, data.completed)
                  }
                  required
                />
                <div className={styles.task_title}>{data?.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.chip_container}>
        <div className={styles.due_date}>
          {task?.dueDate && (
            <Chip
              backgroundColor={
                task?.type === "COMPLETED"
                  ? "#63C05B"
                  : task?.type !== "COMPLETED" && dueDatePassed
                  ? "#CF3636"
                  : ""
              }
              label={formatDate(task.dueDate)}
              size="small"
            />
          )}
        </div>
        <div className={styles.task_chip_container}>
          {cardMenu
            ?.filter((card) => card?.type !== task.type)
            ?.map((filteredCard) => (
              <Chip
                label={filteredCard?.short}
                size="small"
                onClick={() => handleChipClick(filteredCard?.type)}
              />
            ))}
        </div>
      </div>
      <Modal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        aria-labelledby="modal-detel"
        aria-describedby="Modal for delete"
        sx={{
          "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
        }}
      >
        <Box sx={{ ...conirmationModalStyle }}>
          <ConfirmationModal data={"Delete"} />
        </Box>
      </Modal>
    </div>
  );
}

export default Card;
