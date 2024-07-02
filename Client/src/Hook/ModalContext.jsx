import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isTaskBuilderModalOpen, setisTaskBuilderModalOpen] = useState(false);
  const [taskLink, setTaskLink] = useState("");
  const [taskData, setTaskData] = useState(null);
  const [taskId, setTaskId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [taskCreated, setTaskCreated] = useState(false);

  const openTaskBuilderModal = (data = null, isEdit) => {
    setIsEdit(isEdit);
    setTaskData(data);
    setisTaskBuilderModalOpen(true);
  };

  const closeTaskBuilderModal = () => setisTaskBuilderModalOpen(false);

  const closeAllModals = () => {
    setisTaskBuilderModalOpen(false);
    setTaskData(null);
  };

  const openDeleteModal = (taskId) => {
    setTaskId(taskId);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskId(null);
  };

  const openLogOutModal = () => {
    setIsLogOutModalOpen(true);
    setTaskId(null);
  };
  const closeLogoutModal = () => {
    setIsLogOutModalOpen(false);
    setTaskId(null);
  };
  const openAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
    setTaskId(null);
  };

  const createTaskSuccess = () => {
    setTaskCreated(true);
  };

  const resetTaskCreated = () => {
    setTaskCreated(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isTaskBuilderModalOpen,
        openTaskBuilderModal,
        closeTaskBuilderModal,
        closeAllModals,
        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        isLogOutModalOpen,
        openLogOutModal,
        closeLogoutModal,
        isAddUserModalOpen,
        openAddUserModal,
        closeAddUserModal,
        taskLink,
        taskData,
        isEdit,
        taskId,
        taskCreated,
        createTaskSuccess,
        resetTaskCreated,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
