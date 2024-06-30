import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AutPage";
import Container from "./pages/ContainerPage/ContainerPage";
import Board from "./components/Board/Board";
import Analytics from "./components/Analytics/Analytics";
import { ModalProvider } from "./Hook/ModalContext";
import TaskPage from "./pages/TaskPage/TaskPage.jsx";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Settings from "./components/Settings/Settings.jsx";

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <Routes>
          <Route path="/task/:taskId" element={<TaskPage />} />
        </Routes>
        <Routes>
          <Route path="/" element={<ProtectedRoute Component={HomePage} />}>
            <Route path="/" element={<ProtectedRoute Component={Container} />}>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Board />} />
              <Route
                path="/analytics"
                element={<ProtectedRoute Component={Analytics} />}
              />
              <Route
                path="/settings"
                element={<ProtectedRoute Component={Settings} />}
              />
            </Route>
          </Route>
          <Route path="/auth/login" element={<AuthPage />} />
          <Route path="/auth/signup" element={<AuthPage />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
