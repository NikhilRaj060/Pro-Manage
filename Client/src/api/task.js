import axios from "axios";
import { toast, Bounce } from "react-toastify";
const backendUrl = process.env.REACT_APP_PUBLIC_URL;

const getAllTaskAnalytics = async () => {
  try {
    const reqUrl = `${backendUrl}/get-all-task-analytics`;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await axios.get(reqUrl, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || "Something went wrong", {
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
    } else {
      toast.error("Something went wrong", {
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
    }
  }
};

const getAllTaskDataOverView = async (filter) => {
  try {
    const reqUrl = `${backendUrl}/get-task-data-overview?filter=${filter}`;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await axios.get(reqUrl, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || "Something went wrong", {
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
    } else {
      toast.error("Something went wrong", {
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
    }
  }
};

const createTask = async (formData) => {
  try {
    const reqUrl = `${backendUrl}/create-task`;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await axios.post(reqUrl, formData, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || "Something went wrong", {
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
    } else {
      toast.error("Something went wrong", {
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
    }
  }
};

const updateTaskType = async (taskId, newType) => {
  try {
    const reqUrl = `${backendUrl}/tasks/${taskId}/type`;
    const response = await axios.patch(reqUrl, { type: newType });
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || "Something went wrong", {
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
    } else {
      toast.error("Something went wrong", {
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
    }
  }
};

const getQuizDetailsById = async (quizId) => {
  try {
    const reqUrl = `${backendUrl}/get-quiz/${quizId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.errorMessage || "Something went wrong", {
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
    } else {
      toast.error("Something went wrong", {
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
    }
  }
};

const editTaskDetailsById = async (taskId, task) => {
  try {
    const reqUrl = `${backendUrl}/edit-task/${taskId}`;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await axios.put(reqUrl, task, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.errorMessage || "Something went wrong", {
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
    } else {
      toast.error("Something went wrong", {
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
    }
  }
};

const updateQuizDetailsById = async (quizId, quiz) => {
  try {
    const reqUrl = `${backendUrl}/update-quiz/${quizId}`;
    const response = await axios.put(reqUrl, quiz);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.errorMessage || "Something went wrong", {
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
    } else {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "custom_color"
      }
      );
    }
  }
};

const deleteTask = async (quizId) => {
  try {
    const reqUrl = `${backendUrl}/delete-quiz/${quizId}`;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await axios.delete(reqUrl, { headers });
    return response.data;
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong", {
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
  }
}

export { createTask, getQuizDetailsById, editTaskDetailsById, getAllTaskAnalytics, getAllTaskDataOverView, updateQuizDetailsById, deleteTask ,updateTaskType };
