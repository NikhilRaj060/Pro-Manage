import React, { useState } from "react";
import { useModal } from "../../Hook/ModalContext";
import { addTempUser } from "../../api/auth";
import styles from "./AddUserModal.module.css";
import InputButton from "../Input/InputButton";
import CircularProgress from "@mui/material/CircularProgress";

const AddUserModal = () => {
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [email, setEmail] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [addedEmail, setAddedEmail] = useState("")
  const customStyle = {
    height: "100%",
    borderRadius: "10px",
  };
  const { closeAddUserModal } = useModal();

  const handleCancel = () => {
    closeAddUserModal();
  };

  const handleAddEmail = async () => {
    setIsAuthentication(true);
    setIsAdding(true);
    let res = await addTempUser({ email }, setIsAuthentication);
    if (res && res?.data?.message) {
      setIsAdding(false);
      setIsAuthentication(false);
      setIsUserCreated(true);
      setEmail("")
      setAddedEmail(res?.data?.user?.email)
    }
  };

  return (
    <div className={styles.main}>
      {!isUserCreated ? (
        <>
          <div className={styles.header}>
            <div className={styles.text}>Add people to the board</div>
          </div>
          <div className={styles.input}>
            <InputButton
              fullWidth
              height="100%"
              customStyle={customStyle}
              placeholder="Enter the email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={styles.button}>
            <div className={styles.cancel_button} onClick={handleCancel}>
              Cancel
            </div>
            <div
              className={
                isAuthentication
                  ? `${styles.add_button} ${styles.disabled}` : `${styles.add_button}`
              }
              onClick={handleAddEmail}
            >
              {isAuthentication ? (
                <CircularProgress size={25} />
              ) : !isAdding ? (
                "Add Email"
              ) : (
                "Adding"
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.confirmation_header}>
            <div className={styles.text}>{addedEmail} added to board</div>
          </div>
          <div className={styles.confirmation_button}>
            <div
              className={styles.confirmation} onClick={handleCancel}
            >
              Okay, got it!
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddUserModal;
