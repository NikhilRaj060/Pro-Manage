import React, { useState } from "react";
import styles from "./TaskBody.module.css";

function TaskBody({ data, qIndex, handleSelectedOptionIndicesData }) {
  const [selectedOptionIndices, setSelectedOptionIndices] = useState(
    Array(data.questions.length).fill(null)
  );

  const handleOptionClick = (questionIndex, optionIndex) => {
    const newSelectedOptionIndices = [...selectedOptionIndices];
    newSelectedOptionIndices[questionIndex] = optionIndex;
    setSelectedOptionIndices(newSelectedOptionIndices);
    handleSelectedOptionIndicesData(newSelectedOptionIndices);
  };

  return (
    <>
      <div className={` ${styles.quiz_header} ${styles.common_class} `}>
        {data?.questions[qIndex].question}
      </div>
      <div className={styles.quiz_options}>
        {data?.questions[qIndex]?.options?.map((option, oIdx) => (
          <>
            {data?.option_type === "text" && (
              <div
                className={`${styles.quiz_option} ${selectedOptionIndices[qIndex] === oIdx
                    ? styles.is_option_selected
                    : ""
                  }`}
                key={`option_${oIdx}`}
                onClick={() => handleOptionClick(qIndex, oIdx)}
              >
                {option?.text}
              </div>
            )}
            {data?.option_type === "image" && (
              <div className={styles.image}>
                <img
                  className={`${styles.quiz_image_option} ${selectedOptionIndices[qIndex] === oIdx
                    ? styles.is_option_selected
                    : ""
                  }`}
                  key={`option_${oIdx}`}
                  src={option?.imageUrl}
                  alt="Option"
                  onClick={() => handleOptionClick(qIndex, oIdx)}
                />
              </div>
            )}
            {data?.option_type === "text_image" && (
              <div
                className={`${styles.text_image} ${selectedOptionIndices[qIndex] === oIdx
                    ? styles.is_option_selected
                    : ""
                  }`}
                key={`option_${oIdx}`}
                onClick={() => handleOptionClick(qIndex, oIdx)}
              >
                <div className={`${styles.text_image_text}`}>
                  {option?.text}
                </div>
                <div className={styles.text_image_image_conatiner}>
                  <img
                    alt="Option"
                    className={styles.text_image_image}
                    src={option?.imageUrl}
                  />
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
}

export default TaskBody;
