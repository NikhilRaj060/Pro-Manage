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

const updateTaskType = async (taskId, newData , updateType) => {
  try {
    const reqUrl = `${backendUrl}/tasks/${taskId}/${updateType}`;
    const response = await axios.patch(reqUrl, { data: newData });
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

const getTaskDetailsById = async (taskId) => {
  try {
    const reqUrl = `${backendUrl}/get-task/${taskId}`;
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

const deleteTask = async (taskId) => {
  try {
    const reqUrl = `${backendUrl}/delete-task/${taskId}`;
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

export { createTask, getTaskDetailsById, editTaskDetailsById, getAllTaskAnalytics, getAllTaskDataOverView, deleteTask ,updateTaskType };
