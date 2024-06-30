import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isQuizBuilderModalOpen, setIsQuizBuilderModalOpen] = useState(false);
  const [quizLink, setQuizLink] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [quizId, setQuizId] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [taskCreated, setTaskCreated] = useState(false);

  const openQuizBuilderModal = (data = null, isEdit) => {
    setIsEdit(isEdit);
    setQuizData(data);
    setIsQuizBuilderModalOpen(true);
  };

  const closeQuizBuilderModal = () => setIsQuizBuilderModalOpen(false);

  const closeAllModals = () => {
    setIsQuizBuilderModalOpen(false);
    setQuizData(null);
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
      isQuizBuilderModalOpen,
      openQuizBuilderModal,
      closeQuizBuilderModal,
      closeAllModals,
      isDeleteModalOpen,
      openDeleteModal,
      closeDeleteModal,
      quizLink,
      quizData,
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
