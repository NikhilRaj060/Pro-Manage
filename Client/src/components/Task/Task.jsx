import React, { useEffect, useState } from "react";
import styles from "./Task.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizDetailsById, updateQuizDetailsById } from "../../api/task";
import TaskBody from "./TaskBody/TaskBody";
import Skeleton from "@mui/material/Skeleton";

const Quiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({});
  const [qIndex, setQIndex] = useState(0);
  const [selectedOptionIndices, setSelectedOptionIndices] = useState(
    Array(quiz?.questions?.length).fill(null)
  );
  let score = 0;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);
  let isLoading = true;
  let initialTimer = quiz?.timer;
  const navigate = useNavigate();
  const skeletonsOverview = Array.from({ length: 4 });

  useEffect(() => {
    const fetchQuizDetails = async () => {
      if (!quizId) return;
      try {
        const result = await getQuizDetails(quizId);
        if (result) {
          isLoading = false;
        }
        setQuiz(result?.quiz || {});
        setTimer(result?.quiz?.timer || 0);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };
    fetchQuizDetails();
  }, [quizId]);

  useEffect(() => {
    if (initialTimer > 0 && timer > 0 && !isSubmitted) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [timer, isSubmitted]);

  useEffect(() => {
    if (initialTimer > 0 && timer === 0 && qIndex < quiz?.questions?.length && !isSubmitted) {
      handleNext();
    }
  }, [timer, qIndex, quiz, isSubmitted]);

  useEffect(() => {
    if (initialTimer > 0) {
      setTimer(quiz?.timer || 0);
    }
  }, [qIndex, quiz]);
  const formattedTimer = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;

  const getQuizDetails = async (id) => {
    try {
      const result = await getQuizDetailsById(id);
      return result;
    } catch (error) {
      console.error("Error fetching quiz details:", error);
      throw error;
    }
  };

  const handleNext = () => {
    if (qIndex < quiz?.questions?.length - 1) {
      setQIndex(qIndex + 1);
      setTimer(quiz?.timer)
    } else {
      handleSubmit();
      updateQuizDetails();
    }
    setTimeout(() => {
      setIsSubmitted(false);
    }, 10000)
  };

  const updateQuizDetails = async () => {
    try {
      const resp = await updateQuizDetailsById(quizId, quiz);
      if (resp.message) {
        setIsSubmitted(false);
        navigate(`/quiz/result/${quizId}`, {
          state: {
            score,
            total: quiz?.questions?.length,
            quiz_type: quiz?.quiz_type
          },
        });
      }
    } catch (error) {
      console.error("Error updating quiz details:", error);
    }
  };

  const handleSelectedOptionIndicesData = (data) => {
    setSelectedOptionIndices(data);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    quiz.questions.forEach((element, index) => {
      if (selectedOptionIndices[index] != null) {
        element.attempted += 1;
      }
      if (element?.correctAnswerIndex === selectedOptionIndices[index]) {
        score += 1
        element.peopleAttemptedCorrectAnswer += 1;
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.quizHeader}>
          <div className={styles.question_count}>
            <span
              className={`${styles.question_count_text} ${styles.common_class}`}
            >
              {quiz?.questions
                ? `${String(qIndex + 1).padStart(2, "0")} / ${String(
                  quiz.questions.length
                ).padStart(2, "0")}`
                :
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={50}
                />
              }
            </span>
          </div>
          <div className={`${styles.timer} ${styles.common_class}`}>
            {initialTimer ? (initialTimer > 0 && `${formattedTimer}s`) :
              <Skeleton
                variant="rounded"
                width={100}
                height={50}
              />}
          </div>
        </div>
        {quiz?.questions && quiz?.questions?.length > 0 ? (
          <TaskBody
            data={quiz}
            qIndex={qIndex}
            handleSelectedOptionIndicesData={handleSelectedOptionIndicesData}
          />
        ) : (
          <div className={styles.skeletons}>
            {skeletonsOverview?.map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                className={styles.skeleton}
                height={100}
              />
            ))}
          </div>
        )}
        <div className={isSubmitted ? ` ${styles.disabled} ${styles.quiz_button}` : `${styles.quiz_button}`} onClick={handleNext}>
          {quiz?.questions?.length === qIndex + 1
            ? isSubmitted
              ? "SUBMITTING..."
              : "SUBMIT"
            : "NEXT"}
        </div>
      </div>
    </div>
  );
};

export default Quiz;