import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Settings.module.css";
import InputButton from "../Input/InputButton";
import { ic_mail_outline as mailIcon } from 'react-icons-kit/md/ic_mail_outline';
import { ic_person_outline_outline as personIcon } from 'react-icons-kit/md/ic_person_outline_outline';
import { ic_lock_outline as lockIcon } from 'react-icons-kit/md/ic_lock_outline';
import { updateUser } from "../../api/auth";
import { toast } from "react-toastify";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
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
    setNameError("");
  };

  const customStyle = {
    borderRadius: "11px",
    marginBottom: "20px",
  };

  const handleNameChange = (event) => {
    setNameError("");
    if (event && event.target) {
      const inputValue = event.target.value;
      setName(inputValue);
    }
  };

  const handleEmailChange = (event) => {
    setEmailError("");
    if (event && event.target) {
      const enteredEmail = event.target.value;
      setEmail(enteredEmail);
    }
  };

  const handlePasswordChange = (event) => {
    setPasswordError("");
    if (event && event.target) {
      const enteredPassword = event.target.value;
      setOldPassword(enteredPassword);
    }
  };

  const handleNewPasswordChange = (event) => {
    setPasswordError("");
    if (event && event.target) {
      const enteredPassword = event.target.value;
      setNewPassword(enteredPassword);
    }
  };

  const handleSubmit = async () => {
    setIsAuthentication(true);
    try {
      const response = await updateUser(
        {
          email,
          name,
          oldPassword,
          newPassword
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
          inputIcon={personIcon}
          customStyle={customStyle}
          onChange={handleNameChange}
        />
        <InputButton
          fullWidth
          placeholder="Email"
          type="email"
          customStyle={customStyle}
          inputIcon={mailIcon}
          value={emailError ? "" : email}
          error={emailError}
          onChange={handleEmailChange}
        />
        <InputButton
          fullWidth
          placeholder="Old Password"
          type="password"
          inputIcon={lockIcon}
          customStyle={customStyle}
          value={passwordError ? "" : oldPassword}
          error={passwordError}
          onChange={handlePasswordChange}
        />
        <InputButton
          fullWidth
          placeholder="New Password"
          type="password"
          inputIcon={lockIcon}
          customStyle={customStyle}
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <div className={styles.authButton} onClick={handleSubmit}>
          Update
        </div>
      </div>
    </div>
  );
};

export default Settings;
