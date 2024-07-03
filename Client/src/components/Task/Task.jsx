import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Task.module.css";
import Chip from "../Chip/Chip";
import Checkbox from "@mui/material/Checkbox";
import useFormattedDate from "../../Hook/useFormattedDate";
import Tooltip from "@mui/material/Tooltip";
import { getTaskDetailsById } from "../../api/task";
import image from "../../Image/codesandbox.svg";
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';

function Task() {
  const formatDate = useFormattedDate();
  const [task, setTask] = useState(null)
  const [completedCount, setCompletedCount] = useState(0);
  const { taskId } = useParams();

  useEffect(() => {
    if (taskId) {
      fetchTaskById(taskId);
    }
  }, [taskId]);

  const fetchTaskById = async (taskId) => {
    try {
      const data = await getTaskDetailsById(taskId);
      if (data) {
        setTask(data?.task);
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  useEffect(() => {
    let count = 0;
    task?.tasks?.forEach((task) => {
      if (task?.completed) {
        count++;
      }
    });
    setCompletedCount(count);
  }, [task]);

  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;
    }
    return text?.slice(0, maxLength) + "...";
  };

  // If task is null, show SkeletonLoader
  if (!task) {
    return <SkeletonLoader />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.headerContainer}>
        <img className={styles.image} src={image} alt="pro manage" />
        <div className={styles.image_header}>Pro Manage</div>
      </div>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.header}>
            <div className={styles.priority_container}>
              <div
                style={{ background: task?.priority?.color }}
                className={styles.priority_circle}
              ></div>
              <div className={styles.priority}>{task?.priority?.title}</div>
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
            </div>
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
                    disabled={true}
                    required />
                  <div className={styles.task_title}>{data?.title}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.chip_container}>
            <div className={styles.due_date}>
              { task?.dueDate && "Due Date" }
              <div className={styles.chip}>{task?.dueDate && (
                <Chip
                  style={{ marginLeft: "10px" }}
                  backgroundColor={"#CF3636"}
                  label={formatDate(task?.dueDate)}
                  size="small" />
              )}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
