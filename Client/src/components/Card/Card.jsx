import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import { FaEllipsis, FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Chip from "../Chip/Chip";
import { cardMenu } from "../../lib/cardMenu";
import Checkbox from "@mui/material/Checkbox";
import useFormattedDate from '../../Hook/useFormattedDate'
import dayjs from "dayjs";
import { updateTaskType } from "../../api/task";
import { useModal } from "../../Hook/ModalContext.jsx";
import { toast, Bounce } from "react-toastify";

function Card({ collapseAll, task , onLoadingChange }) {
  const formatDate = useFormattedDate();
  const { createTaskSuccess } = useModal();
  const [taskData, setTaskData] = useState(task);
  const [dueDatePassed, setDueDatePassed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);


  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (collapseAll) {
      setIsCollapsed(true);
    }
  }, [collapseAll]);

  useEffect(()=> {
    const checkDueDate = (dueDateString) => {
      const dueDate = dayjs(dueDateString).startOf('day');
      const currentDate = dayjs().startOf('day');
      return dueDate.isBefore(currentDate);
    };

    const isPassed = checkDueDate(task.dueDate);

    setDueDatePassed(isPassed);
  },[])

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
    const updatedTasks = task.tasks.map((t) =>
      t._id === taskId ? { ...t, completed: !completed } : t
    );
    task.tasks = updatedTasks;
    setCompletedCount(updatedTasks.filter((t) => t.completed).length);
  };

  const handleChipClick = async (newType) => {
    try {
      setIsLoading(true)
      onLoadingChange(true)
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
        setIsLoading(false)
        onLoadingChange(false)
      }
    } catch (error) {
      setIsLoading(false)
      onLoadingChange(false)
      console.error("Error updating task type:", error);
    }
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
          <FaEllipsis className={styles.icon} />
        </div>
      </div>
      <div className={styles.title}>{task?.title}</div>
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
                  style={{borderRadius:"6px",padding: "0", paddingRight: "5px" }}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fill: data?.completed ?  "#17A2B8" :"#E2E2E2",
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
          {task?.dueDate && <Chip backgroundColor={task?.type === "COMPLETED" ? "#63C05B" : task?.type !== "COMPLETED" && dueDatePassed ? "#CF3636" : "" } label={formatDate(task.dueDate)} size="small" />}
        </div>
        <div className={styles.task_chip_container}>
          {cardMenu
            ?.filter((card) => card?.type !== task.type)
            .map((filteredCard) => (
              <Chip label={filteredCard?.short} size="small" onClick={() => handleChipClick(filteredCard?.type)}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
