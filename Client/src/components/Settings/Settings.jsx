import React, { useState } from "react";
import styles from "./Settings.module.css";
import InputButton from "../Input/InputButton";
import {ic_mail_outline as mailIcon} from 'react-icons-kit/md/ic_mail_outline'
import {ic_person_outline_outline as personIcon} from 'react-icons-kit/md/ic_person_outline_outline'
import {ic_lock_outline as lockIcon} from 'react-icons-kit/md/ic_lock_outline'

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isAuthentication, setIsAuthentication] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setOldPassword("");
    setNewPassword("");
    setError("");
    setPasswordError("");
    setEmailError("");
    setNameError("");
    setNewPassword("");
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

  const handleConfirmPasswordChange = (event) => {
    setError("");
    if (event && event.target) {
      const enteredConfirmPassword = event.target.value;
      setNewPassword(enteredConfirmPassword);
    }
  };

  //   const handleSubmit = async () => {
  //     let validName = isLogin || isValidName(name);
  //     let validEmail;
  //     let weakPassword;
  //     if (isLogin) {
  //       if (email.trim() === "") {
  //         validEmail = false;
  //         setEmailError(validEmail ? "" : "Please fill email address");
  //       }
  //     } else {
  //       validEmail = isValidEmail(email);
  //       setEmailError(validEmail ? "" : "Invalid email address");
  //     }

  //     if (!isLogin) {
  //       weakPassword = isWeakPassword(password);
  //       setPasswordError(weakPassword ? "Weak password" : "");
  //     } else {
  //       if (password.trim() === "") {
  //         weakPassword = true;
  //         setPasswordError(weakPassword ? "Please fill password" : "");
  //       }
  //     }

  //     let passwordsMatch = isLogin || password === newPassword;

  //     setNameError(validName ? "" : "Invalid Name");
  //     setError(passwordsMatch ? "" : "Passwords do not match");

  //     if (isLogin && !weakPassword) {
  //       try {
  //         setIsAuthentication(true);
  //         let isLogginedIn = await loginUser(
  //           { email, password },
  //           setIsAuthentication
  //         );
  //         if (isLogginedIn) {
  //           setIsAuthentication(false);
  //           resetForm();
  //           navigate("/dashboard");
  //         } else {
  //           setIsAuthentication(false);
  //         }
  //       } catch (error) {
  //         setIsAuthentication(false);
  //         console.log(error);
  //       }
  //     } else {
  //       if (validName && validEmail && !weakPassword && passwordsMatch) {
  //         try {
  //           setIsAuthentication(true);
  //           let res = await registerUser(
  //             {
  //               name,
  //               email,
  //               password,
  //               newPassword,
  //             },
  //             setIsAuthentication
  //           );
  //           if (res) {
  //             setIsAuthentication(false);
  //             resetForm();
  //             navigate("/auth/login");
  //           } else {
  //             setIsAuthentication(false);
  //           }
  //         } catch (error) {
  //           setIsAuthentication(false);
  //           console.log(error);
  //         }
  //       }
  //     }
  //   };

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
          error={error}
          fullWidth
          placeholder="New password"
          type="password"
          inputIcon={lockIcon}
          customStyle={customStyle}
          value={error ? "" : newPassword}
          onChange={handleConfirmPasswordChange}
        />
        <div
          className={styles.authButton}
        >
          Update
        </div>
      </div>
    </div>
  );
};

export default Settings;
