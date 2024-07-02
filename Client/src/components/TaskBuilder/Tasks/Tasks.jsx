import React from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import styles from "./Tasks.module.css";
import InputButton from "../../Input/InputButton";

function Tasks({ formData, tIndex, setFormData }) {
  const customStyle = {
    borderRadius: "4px",
  };
  const custom_style_task = {
    paddingLeft: "0",
    border: "none",
  };

  const handleAddOption = () => {
    const newTasks = [...formData.tasks, { title: "", completed: false }];
    setFormData({
      ...formData,
      tasks: newTasks,
    });
  };

  const handleRemoveOption = (oIndex) => {
    const newTasks = formData.tasks?.filter((_, index) => index !== oIndex);
    setFormData({
      ...formData,
      tasks: newTasks,
    });
  };

  const handleTitleChange = (oIndex, event) => {
    const newTasks = [...formData.tasks];
    newTasks[oIndex].title = event.target.value;
    setFormData({
      ...formData,
      tasks: newTasks,
    });
  };

  const handleCheckboxChange = (oIndex) => {
    const newTasks = [...formData.tasks];
    newTasks[oIndex].completed = !newTasks[oIndex].completed;
    setFormData({
      ...formData,
      tasks: newTasks,
    });
  };

  return (
    <div className={styles.tasks}>
      <div className={styles.title}>
        Checklist ({formData?.tasks?.filter(task => task.completed).length}/{formData?.tasks?.length}) <span>*</span>
      </div>
      <div className={styles.task_options}>
        {formData?.tasks?.map((task, oIndex) => (
          <div className={styles.task_container} key={`${tIndex}-${oIndex}`}>
            <div className={styles.task}>
              <div className={styles.input_contaier}>
                <InputButton
                  type="checkbox"
                  required
                  customStyle={customStyle}
                  height={30}
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(oIndex)}
                />
                <div className={styles.task_title}>
                  <InputButton
                    type="text"
                    fullWidth
                    required
                    placeholder="Add a task"
                    customStyle={custom_style_task}
                    height={30}
                    value={task.title}
                    onChange={(event) => handleTitleChange(oIndex, event)}
                  />
                </div>
              </div>
              <MdDelete
                className={styles.del_icon}
                onClick={() => handleRemoveOption(oIndex)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={`${styles.add}`} onClick={handleAddOption}>
        <MdAdd className={styles.add_icon} />
        Add New
      </div>
    </div>
  );
}

export default Tasks;
