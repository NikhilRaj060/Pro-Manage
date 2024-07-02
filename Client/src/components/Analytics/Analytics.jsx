import React, { useState, useEffect } from "react";
import styles from "./Analytics.module.css";
import { getAllTaskAnalytics } from "../../api/task";
import { prioritysData, tasksData } from "../../lib/analytics";

const Analytics = () => {
  const [taskData, setTaskData] = useState(tasksData);
  const [priorityData, setPriorityData] = useState(prioritysData);

  useEffect(() => {
    const fetchAllDataOverview = async () => {
      try {
        const response = await getAllTaskAnalytics();
        if (response) {
          const { taskCounts, priorityCounts } = response.data;

          const updatedTasksData = tasksData.map((task) => ({
            ...task,
            count: taskCounts[task.id] || 0,
          }));

          const updatedPriorityData = prioritysData.map((priority) => ({
            ...priority,
            count: priorityCounts[priority.id] || 0,
          }));

          setTaskData(updatedTasksData);
          setPriorityData(updatedPriorityData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching task analytics:", error);
      }
    };

    fetchAllDataOverview();
  }, []);


  return (
    <div className={styles.main}>
      <div className={styles.header}>Analytics</div>
      <div className={styles.container}>
        <div className={styles.analytics_container}>
          <div className={styles.task_container}>
            {taskData?.map((task) => (
              <div className={styles.tasks} id={task.id}>
                <div className={styles.content}>
                  <div className={styles.task_circle}></div>
                  <div className={styles.task}>{task?.title}</div>
                </div>
                <div className={styles.count}>{task?.count}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.analytics_container}>
          <div className={styles.task_container}>
            {priorityData?.map((data) => (
              <div className={styles.tasks} id={data.id}>
                <div className={styles.content}>
                  <div className={styles.task_circle}></div>
                  <div className={styles.task}>{data?.title}</div>
                </div>
                <div className={styles.count}>{data?.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;