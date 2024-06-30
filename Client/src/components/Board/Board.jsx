import React, { useEffect, useState } from "react";
import styles from "./Board.module.css";
import { getAllTaskDataOverView } from "../../api/task";
import { useModal } from "../../Hook/ModalContext";
import useFormattedDate from "../../Hook/useFormattedDate";
import Skeleton from "@mui/material/Skeleton";
import CardBoard from "../CardBoard/CardBoard";
import { cardMenu } from '../../lib/cardMenu';
import { FaAngleDown } from "react-icons/fa6";

export default function Board() {
  const formatDate = useFormattedDate()
  const [taskData, setTaskData] = useState([]);
  const [name] = useState(localStorage.getItem("name"));
  const [isLoading, setIsLoading] = useState(true);
  const { taskCreated, resetTaskCreated } = useModal();
  let date = new Date()

  useEffect(() => {
    const fetchAllDataOverview = async () => {
      const data = await getAllTaskDataOverView();
      if (data) {
        setIsLoading(false);
      }
      setTaskData(data?.data);

      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    };
    fetchAllDataOverview();
  }, []);

  useEffect(() => {
    if (taskCreated) {
      fetchData();
      resetTaskCreated();
    }
  }, [taskCreated]);

  const fetchData = async () => {
    try {
      const updatedData = await getAllTaskDataOverView();

      if (updatedData) {
        setIsLoading(false);
        setTaskData(updatedData.data);
      }
    } catch (error) {
      console.error("Error fetching updated data:", error);
    }
  };

  const handleLoadingChange = (loading) => {
    setIsLoading(loading);
  };

  console.log(taskData);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.overview}>
          <div className={styles.overview_title}>{`Welcome! ${name}`}</div>
          <div className={styles.overview_date}>{formatDate(date,true)}</div>
        </div>
        <div className={styles.text}>
          <div className={styles.text_title}>Board</div>
          <div className={styles.date_filter}>
            This week <FaAngleDown className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.board_conatiner}>
        {cardMenu.map((card) => (
          <CardBoard
            key={card.id}
            setLoadingChange={handleLoadingChange}
            isLoading={isLoading}
            data={card}
            taskData={taskData.filter((task) => task.type === card.type)}
          />
        ))}
      </div>
    </div>
  );
}