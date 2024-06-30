import axios from "axios";
import { toast , Bounce } from "react-toastify";
// const backendUrl = process.env.REACT_APP_PUBLIC_URL_AUTH;

export const registerUser = async ({ email, password, confirmPassword, name },setIsAuthentication) => {
  try {
    const reqUrl = `http://localhost:3001/auth/v1/register`;
    console.log(reqUrl,"reqUrl")
    const response = await toast.promise(
      axios.post(reqUrl, { name, email, password, confirmPassword }),
      {
        pending: "Registering...",
        success: {
          render({ data }) {
            return `${data?.data?.message || "Success!"}`;
          },
        },
        error: {
          render({ data }) {
            return `${data?.response?.data?.errorMessage || "Something went wrong"}`;
          },
        },
      },
      {
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
      }
    );
    return response;
  } catch (error) {
    setIsAuthentication(false);
    console.log(error);
  }
};

export const loginUser = async ({ email, password },setIsAuthentication) => {
  try {
    const reqUrl = `http://localhost:3001/auth/v1/login`;
    console.log(reqUrl,"reqUrl")
    const response = await toast.promise(
      axios.post(reqUrl, { email, password }),
      {
        pending: "Logging in...",
        success: {
          render({ data }) {
            return `${data?.data?.message || "Success!"}`;
          },
        },
        error: {
          render({ data }) {
            return `${data?.response?.data?.errorMessage || "Something went wrong!"}`;
          },
        },
      },
      {
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
      }
    );
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
    }
    return true;
  } catch (error) {
    setIsAuthentication(false);
    console.log(error);
    return false;
  }
};
