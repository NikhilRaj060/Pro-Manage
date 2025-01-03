import React, { useEffect, useState } from "react";
import styles from "./TaskBuilder.module.css";
import { toast, Bounce } from "react-toastify";
import { useModal } from "../../Hook/ModalContext.jsx";
import { createTask, editTaskDetailsById } from "../../api/task.js";
import { getAllTempUser } from "../../api/auth.js";
import InputButton from "../Input/InputButton.jsx";
import { chipList } from "../../model/chipList.js";
import Chip from "../Chip/Chip.jsx";
import Tasks from "./Tasks/Tasks.jsx";
import Dropdown from "../Dropdown/Dropdown.jsx";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { Box } from "@mui/material";
import CustomToolbar from "../../lib/CustomToolBar/CustomToolBar.jsx";
import { decodeToken } from "react-jwt"

function TaskBuilder() {
  const token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);
  const currentUserId = decodedToken?.userId;
  const customStyle = {
    borderRadius: "4px",
  };

  const [tIndex] = useState(0);
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(null);
  const [userData, setUserData] = useState([]);
  const {
    closeTaskBuilderModal,
    closeAllModals,
    taskData,
    isEdit,
    createTaskSuccess,
  } = useModal();
  const [isTaskCreating, setIsTaskCreating] = useState(false);
  let isEditPermission = isEdit;
  const data = taskData;

  const initialFormData = {
    title: data?.title || "",
    priority: isEditPermission && data?.priority ? data?.priority : {
      code: "",
      color: "",
      title: ""
    },
    assigned: data?.assigned || "",
    tasks: isEditPermission && data?.tasks ? data?.tasks : [
      {
        title: "",
        completed: false,
      },
    ],
    dueDate: data?.dueDate || "",
    type: data?.type || "TODO",
    createdBy: data?.createdBy || "",
    assignedEmail: data?.assignedEmail || "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        const data = await getAllTempUser();
        if (data) {
          let updatedUserData = data.map(user => {
            let splittedName = user.email.split("@");
            user.initials = (splittedName[0][0] + splittedName[0][1]).toUpperCase();
            return user;
          });
          setUserData(updatedUserData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();

    let dataTimer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => {
      clearTimeout(dataTimer);
    };
  }, []);

  const handleSelectPriority = (chip) => {
    setPriority(chip.priority);
    setFormData((prevFormData) => ({
      ...prevFormData,
      priority: {
        code: chip.priority,
        color: chip.color,
        title: chip.title,
      },
    }));
  };

  const handleSelect = (id) => {
    const user = userData?.find((user) => user._id === id);
    setFormData((prevFormData) => ({
      ...prevFormData,
      assigned: user,
      assignedEmail: user.email,
    }));
  };

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleCancel = () => {
    resetFormData();
    closeTaskBuilderModal();
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  const handleCreateOrUpdateTask = async () => {
    if (!validateForm()) return;

    setIsTaskCreating(true);
    let res;
    if (isEditPermission) {
      res = await editTaskDetailsById(data?.taskId, formData);
      if (res && res?.message) {
        setIsTaskCreating(false);
        createTaskSuccess();
        toast.success(res?.message, {
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
        handleCancel();
      } else {
        setIsTaskCreating(false);
      }
    } else {
      res = await createTask(formData);
    }
    if (!isEditPermission && res && res?.message && res?.taskLink) {
      setIsTaskCreating(false);
      toast.success(res?.message, {
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
      navigator.clipboard.writeText(res?.taskLink);
      createTaskSuccess();
      handleCancel();
    } else if (isEditPermission && res?.message) {
      setIsTaskCreating(false);
      createTaskSuccess();
      closeAllModals();
    } else {
      setIsTaskCreating(false);
    }
    setTimeout(() => {
      setIsTaskCreating(false);
    }, 5000);
  };

  const handleCalenderSelect = (val) => {
    const formattedDate = val?.$d ? dayjs(val?.$d).format("MM/DD/YYYY") : "";
    setFormData({
      ...formData,
      dueDate: formattedDate,
    });
  };

  const validateForm = () => {
    if (!formData?.title) {
      toast.error("Title is required.", { transition: Bounce });
      return false;
    }
    if (!formData?.priority) {
      toast.error("Priority is required.", { transition: Bounce });
      return false;
    }
    if (formData.tasks.length === 0) {
      toast.error("At least one task is required.", { transition: Bounce });
      return false;
    }
    return true;
  };

  const canEditAssignee = isEditPermission && currentUserId === initialFormData.createdBy;
  console.error(canEditAssignee)
  
  return (
    <div className={styles.main}>
      <div className={styles.conatiner}>
        <div className={styles.title_conatiner}>
          <div className={styles.title}>
            Title <span>*</span>
          </div>
          <InputButton
            fullWidth
            type="text"
            placeholder="Enter Task Title"
            customStyle={customStyle}
            height={40}
            value={formData?.title}
            onChange={(e) => {
              setTitle(e.target.value);
              setFormData({ ...formData, title: e.target.value });
            }}
          />
        </div>
        <div className={styles.priority_conatiner}>
          <div className={styles.priority}>
            Select Priority <span>*</span>
          </div>
          <div className={styles.chiplists}>
            {chipList?.map((chip) => (
              <Chip
                key={chip.id}
                outlined={formData?.priority?.code !== chip.priority}
                label={chip?.title}
                circleColor={chip?.color}
                fontSize={14}
                height={30}
                onClick={() => handleSelectPriority(chip)}
              />
            ))}
          </div>
        </div>
        <div className={styles.assign_conatiner}>
          <div className={styles.assign}>Assign to</div>
          <div className={styles.dropdown}>
            <Dropdown
              id="person"
              title="Add an assignee"
              data={userData}
              hasImage
              selectedId={formData?.assigned?._id}
              onSelect={handleSelect}
              isReadOnly={!canEditAssignee && isEditPermission}
            />
          </div>
        </div>
        <div className={styles.taskDetails}>
          <Tasks
            setFormData={handleFormDataChange}
            formData={formData}
            tIndex={tIndex}
          />
        </div>
        <div className={styles.task_button_group}>
          <div
            className={styles.due_date}
            onClick={() => setIsCalenderOpen(!isCalenderOpen)}
          >
            {formData?.dueDate ? dayjs(formData?.dueDate).format("MM/DD/YYYY") : "Select due date"}
          </div>
          {isCalenderOpen && (
            <div className={styles.calender_container}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <DateCalendar
                    value={formData?.dueDate ? dayjs(formData?.dueDate) : null}
                    onChange={handleCalenderSelect}
                  />
                  <CustomToolbar
                    handleCalenderSelect={handleCalenderSelect}
                    value={formData?.dueDate ? dayjs(formData?.dueDate) : null}
                  />
                </Box>
              </LocalizationProvider>
            </div>
          )}
          <div className={styles.buttonGroup}>
            <div className={styles.cancel} onClick={handleCancel}>
              Cancel
            </div>
            <div
              className={
                isTaskCreating
                  ? `${styles.continue} ${styles.disabled}`
                  : `${styles.continue}`
              }
              onClick={handleCreateOrUpdateTask}
            >
              {isTaskCreating
                ? isEditPermission
                  ? `Editing...`
                  : `Saving...`
                : isEditPermission
                ? `Edit`
                : `Save`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskBuilder;
