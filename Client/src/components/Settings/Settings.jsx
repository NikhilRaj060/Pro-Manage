import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Settings.module.css";
import InputButton from "../Input/InputButton";
import { MdMailOutline, MdPersonOutline, MdLockOutline } from "react-icons/md"; 
import { updateUser } from "../../api/auth";
import { toast } from "react-toastify";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isAuthentication, setIsAuthentication] = useState(false);

  const navigate = useNavigate();

  const resetForm = () => {
    setName("");
    setEmail("");
    setOldPassword("");
    setNewPassword("");
    setPasswordError("");
    setEmailError("");
  };

  const customStyle = {
    borderRadius: "11px",
    marginBottom: "20px",
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailError("");
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordError("");
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setPasswordError("");
    setNewPassword(event.target.value);
  };

  const handleSubmit = async () => {
    setIsAuthentication(true);
    try {
      const response = await updateUser(
        {
          email,
          name,
          oldPassword,
          newPassword,
        },
        setIsAuthentication
      );
      if (response) {
        resetForm();
        localStorage.clear();
        navigate("/auth/login");
      }
    } catch (error) {
      toast.error("Update failed. Please try again.");
      console.error(error);
    } finally {
      setIsAuthentication(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>Settings</div>
      <div className={styles.container}>
        <InputButton
          fullWidth
          placeholder="Name"
          type="text"
          required
          inputIcon={<MdPersonOutline size={20} />} 
          customStyle={customStyle}
          value={name}
          onChange={handleNameChange}
        />
        <InputButton
          fullWidth
          placeholder="Email"
          type="email"
          customStyle={customStyle}
          inputIcon={<MdMailOutline size={20} />}
          value={emailError ? "" : email}
          error={emailError}
          onChange={handleEmailChange}
        />
        <InputButton
          fullWidth
          placeholder="Old Password"
          type="password"
          inputIcon={<MdLockOutline size={20} />}
          customStyle={customStyle}
          value={passwordError ? "" : oldPassword}
          error={passwordError}
          onChange={handlePasswordChange}
        />
        <InputButton
          fullWidth
          placeholder="New Password"
          type="password"
          inputIcon={<MdLockOutline size={20} />}
          customStyle={customStyle}
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <div className={styles.authButton} onClick={handleSubmit}>
          {isAuthentication ? "Updating..." : "Update"}
        </div>
      </div>
    </div>
  );
};

export default Settings;
