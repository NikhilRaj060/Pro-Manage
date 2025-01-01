import React, { useState } from "react";
import styles from "./Auth.module.css";
import InputButton from "../Input/InputButton";
import { useLocation, useNavigate } from "react-router-dom";
import { isWeakPassword, isValidEmail, isValidName } from "../../model/auth";
import { registerUser, loginUser } from "../../api/auth";
import image from "../../Image/art.svg";
import CircularProgress from "@mui/material/CircularProgress";
import { ic_mail_outline as mailIcon } from "react-icons-kit/md/ic_mail_outline";
import { ic_person_outline_outline as personIcon } from "react-icons-kit/md/ic_person_outline_outline";
import { ic_lock_outline as lockIcon } from "react-icons-kit/md/ic_lock_outline";

export default function Auth() {
  const customStyle = {
    marginBottom: "20px",
    borderRadius: "11px",
  };
  const [isAuthentication, setIsAuthentication] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  let isLogin = location.pathname.includes("/login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setPasswordError("");
    setEmailError("");
    setNameError("");
    setConfirmPassword("");
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
      setPassword(enteredPassword);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setError("");
    if (event && event.target) {
      const enteredConfirmPassword = event.target.value;
      setConfirmPassword(enteredConfirmPassword);
    }
  };

  const handleSubmit = async () => {
    let validName = isLogin || isValidName(name);
    let validEmail;
    let weakPassword;
    if (isLogin) {
      if (email.trim() === "") {
        validEmail = false;
        setEmailError(validEmail ? "" : "Please fill email address");
      }
    } else {
      validEmail = isValidEmail(email);
      setEmailError(validEmail ? "" : "Invalid email address");
    }

    if (!isLogin) {
      weakPassword = isWeakPassword(password);
      setPasswordError(weakPassword ? "Weak password" : "");
    } else {
      if (password.trim() === "") {
        weakPassword = true;
        setPasswordError(weakPassword ? "Please fill password" : "");
      }
    }

    let passwordsMatch = isLogin || password === confirmPassword;

    setNameError(validName ? "" : "Invalid Name");
    setError(passwordsMatch ? "" : "Passwords do not match");

    if (isLogin && !weakPassword) {
      try {
        setIsAuthentication(true);
        let isLogginedIn = await loginUser(
          { email, password },
          setIsAuthentication
        );
        if (isLogginedIn) {
          setIsAuthentication(false);
          resetForm();
          navigate("/dashboard");
        } else {
          setIsAuthentication(false);
        }
      } catch (error) {
        setIsAuthentication(false);
        console.error(error);
      }
    } else {
      if (validName && validEmail && !weakPassword && passwordsMatch) {
        try {
          setIsAuthentication(true);
          let res = await registerUser(
            {
              name,
              email,
              password,
              confirmPassword,
            },
            setIsAuthentication
          );
          if (res) {
            setIsAuthentication(false);
            resetForm();
            navigate("/auth/login");
          } else {
            setIsAuthentication(false);
          }
        } catch (error) {
          setIsAuthentication(false);
          console.error(error);
        }
      }
    }
  };

  const handleNavigation = () => {
    resetForm();
    if (!isLogin && location.pathname !== "/auth/login") {
      navigate("/auth/login");
    } else if (isLogin && location.pathname !== "/auth/signup") {
      navigate("/auth/signup");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.image_container}>
        <div className={styles.container}>
          <img className={styles.image} src={image} alt="svg-image" />
          <div className={styles.circle_motion}></div>
        </div>
        <div className={styles.text_container}>
          <div className={styles.welcome_text}>Welcome aboard my friend</div>
          <p className={styles.text}>just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={styles.auth}>
        <div className={styles.authContainer}>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonGroup}>
              <div className={styles.button}>
                {!isLogin ? "Sign Up" : "Login"}
              </div>
            </div>
          </div>
          <div className={styles.authForm}>
            <div className={styles.formButtons}>
              {!isLogin && (
                <InputButton
                  fullWidth
                  placeholder="Name"
                  type="text"
                  customStyle={customStyle}
                  inputIcon={personIcon}
                  required
                  value={nameError ? "" : name}
                  error={nameError}
                  onChange={handleNameChange}
                />
              )}
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
                placeholder="Password"
                type="password"
                customStyle={customStyle}
                inputIcon={lockIcon}
                value={passwordError ? "" : password}
                error={passwordError}
                onChange={handlePasswordChange}
              />
              {!isLogin && (
                <InputButton
                  error={error}
                  fullWidth
                  placeholder="Confirm password"
                  type="password"
                  customStyle={customStyle}
                  inputIcon={lockIcon}
                  value={error ? "" : confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              )}
            </div>
          </div>
          <div className={styles.submitButtonContainer}>
            <div className={styles.submitButtonGroup}>
              <div
                className={
                  isAuthentication
                    ? `${styles.submit} ${styles.disabled} ${styles.authButton}`
                    : `${styles.submit} ${styles.authButton}`
                }
                onClick={handleSubmit}
              >
                {isAuthentication ? (
                  <CircularProgress size={25} />
                ) : isLogin ? (
                  "Log In"
                ) : (
                  "Register"
                )}
              </div>
              <div className={styles.account_text}>
                {isLogin ? "Have no account yet?" : "Have an account ?"}
              </div>
              <div
                className={`${styles.authButton} ${styles.authButton_alternative}`}
                onClick={handleNavigation}
              >
                {isLogin ? "Register" : "Log In"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
