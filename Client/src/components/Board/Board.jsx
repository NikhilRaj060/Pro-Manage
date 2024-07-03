import React, { useEffect, useState } from "react";
import styles from "./Board.module.css";
import { getAllTaskDataOverView } from "../../api/task";
import { useModal } from "../../Hook/ModalContext";
import useFormattedDate from "../../Hook/useFormattedDate";
import CardBoard from "../CardBoard/CardBoard";
import { cardMenu } from "../../lib/cardMenu";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { GoPeople } from "react-icons/go";
import AddUserModal from "../AddUserModal/AddUserModal";
import { Modal, Box } from "@mui/material";
import BoardSkeletonLoader from './BoardSkeletonLoader';

export default function Board() {
  const userModalStyle = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "45%",
    height: "30%",
    bgcolor: "#FFFFFF",
    borderRadius: 2.5,
    outline: "none",
    padding: "2%",
  };
  const formatDate = useFormattedDate();
  const [taskData, setTaskData] = useState([]);
  const [name] = useState(localStorage.getItem("name"));
  const [isLoading, setIsLoading] = useState(true);
  const { taskCreated, resetTaskCreated , isAddUserModalOpen, closeAddUserModal , openAddUserModal } = useModal();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("This Week");

  let date = new Date();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen((prev) => !prev);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchAllDataOverview = async (filter) => {
    const data = await getAllTaskDataOverView(filter);
    if (data) {
      setIsLoading(false);
    }
    setTaskData(data?.data);

    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAllDataOverview(filter);

    let dataTimer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => {
      clearTimeout(dataTimer);
    };
  }, [filter]);

  useEffect(() => {
    if (taskCreated) {
      setIsLoading(true)
      fetchData(filter);
      resetTaskCreated();
    }

    let dataTimer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => {
      clearTimeout(dataTimer);
    };
  }, [taskCreated, filter]);

  const fetchData = async (filter) => {
    try {
      const updatedData = await getAllTaskDataOverView(filter);

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

  const handleFilter = (filter) => {
    setFilter(filter);
    handleClose();
  };

  const handleAddPeople = () => {
    openAddUserModal()
  }

  if (isLoading) {
    return <BoardSkeletonLoader />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.overview}>
          <div className={styles.overview_title}>{`Welcome! ${name}`}</div>
          <div className={styles.overview_date}>{formatDate(date, true)}</div>
        </div>
        <div className={styles.board}>
          <div className={styles.text_title}>
            Board
            <div className={styles.text_title_sub} onClick={handleAddPeople}>
              <GoPeople /> Add People
            </div>
          </div>
          <div className={styles.date_filter} onClick={handleClick}>
            {filter}
            {isOpen ? (
              <FaAngleDown
                className={styles.icon}
                id="basic-button"
                aria-controls={isOpen ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? "true" : undefined}
              />
            ) : (
              <FaAngleUp
                className={styles.icon}
                id="basic-button"
                aria-controls={isOpen ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? "true" : undefined}
              />
            )}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
              TransitionComponent={Fade}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: "10px",
                  width: "10%",
                },
              }}
            >
              <MenuItem onClick={() => handleFilter("This Week")}>This Week</MenuItem>
              <MenuItem onClick={() => handleFilter("Today")}>Today</MenuItem>
              <MenuItem onClick={() => handleFilter("This Month")}>This Month</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <div className={styles.board_conatiner}>
        {cardMenu?.map((card) => (
          <CardBoard
            key={card.id}
            setLoadingChange={handleLoadingChange}
            isLoading={isLoading}
            data={card}
            taskData={taskData?.filter((task) => task.type === card.type)}
          />
        ))}
      </div>
      <Modal
        open={isAddUserModalOpen}
        onClose={closeAddUserModal}
        aria-labelledby="modal-detel"
        aria-describedby="Modal for delete"
        sx={{
          "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
        }}
      >
        <Box sx={{ ...userModalStyle }}>
          <AddUserModal />
        </Box>
      </Modal>
    </div>
  );
}
