import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isTaskBuilderModalOpen, setisTaskBuilderModalOpen] = useState(false);
  const [taskLink, setTaskLink] = useState('');
  const [taskData, setTaskData] = useState(null);
  const [quizId, setQuizId] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  const openDeleteModal = (quizId) => {
    setQuizId(quizId)
    setIsDeleteModalOpen(true);
  }
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setQuizId(null);
  };


  const createTaskSuccess = () => {
    setTaskCreated(true);
  };

  const resetTaskCreated = () => {
    setTaskCreated(false);
  };

  return (
    <ModalContext.Provider value={{
      isTaskBuilderModalOpen,
      openTaskBuilderModal,
      closeTaskBuilderModal,
      closeAllModals,
      isDeleteModalOpen,
      openDeleteModal,
      closeDeleteModal,
      taskLink,
      taskData,
      isEdit,
      quizId,
      taskCreated,
      createTaskSuccess,
      resetTaskCreated
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
