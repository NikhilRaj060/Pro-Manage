import { useState } from "react";
import styles from "./Auth.module.css";
import InputButton from "../Input/InputButton";
import { useLocation, useNavigate } from "react-router-dom";
import { isWeakPassword, isValidEmail, isValidName } from "../../model/auth";
import { registerUser, loginUser } from "../../api/auth";
import image from "../../Image/art.svg";
import CircularProgress from "@mui/material/CircularProgress";
import { MdOutlineMail, MdOutlinePerson, MdOutlineLock } from "react-icons/md";

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
  };

  const handleNameChange = (event) => {
    setNameError("");
    setName(event?.target?.value || "");
  };

  const handleEmailChange = (event) => {
    setEmailError("");
    setEmail(event?.target?.value || "");
  };

  const handlePasswordChange = (event) => {
    setPasswordError("");
    setPassword(event?.target?.value || "");
  };

  const handleConfirmPasswordChange = (event) => {
    setError("");
    setConfirmPassword(event?.target?.value || "");
  };

  const handleSubmit = async () => {
    let validName = isLogin || isValidName(name);
    let validEmail;
    let weakPassword;

    if (isLogin) {
      if (email.trim() === "") {
        validEmail = false;
        setEmailError("Please fill email address");
      } else {
        validEmail = true;
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
        setPasswordError("Please fill password");
      } else {
        weakPassword = false;
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
          resetForm();
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsAuthentication(false);
      }
    } else {
      if (validName && validEmail && !weakPassword && passwordsMatch) {
        try {
          setIsAuthentication(true);
          let res = await registerUser(
            { name, email, password, confirmPassword },
            setIsAuthentication
          );
          if (res) {
            resetForm();
            navigate("/auth/login");
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsAuthentication(false);
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
                  inputIcon={<MdOutlinePerson size={20} />}
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
                inputIcon={<MdOutlineMail size={20} />}
                value={emailError ? "" : email}
                error={emailError}
                onChange={handleEmailChange}
              />
              <InputButton
                fullWidth
                placeholder="Password"
                type="password"
                customStyle={customStyle}
                inputIcon={<MdOutlineLock size={20} />}
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
                  inputIcon={<MdOutlineLock size={20} />}
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
