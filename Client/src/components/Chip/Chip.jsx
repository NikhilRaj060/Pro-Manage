import React from "react";
import styles from "./Chip.module.css";

function Chip({ outlined, label, circleColor, fontSize, height , backgroundColor , fullWidth = false, onClick }) {
  return (
    <div
      style={{
        ...(backgroundColor ? { background :  backgroundColor} : {}),
        ...(fullWidth ? { width: "100%" } : { width: "auto" }),
        ...(height ? { height: height } : { height: "auto" }),
        ...(outlined ? { backgroundColor: "#FFF", border: "1px solid #E2E2E2" } : {}),
      }}
      className={styles.chip_container}
      onClick={onClick}
    >
      {circleColor && (
        <div
          style={circleColor ? { backgroundColor: circleColor } : {}}
          className={styles.circle_chip}
        ></div>
      )}
      <div
        style={{
          ...(fontSize ? { fontSize: fontSize } : {}),
          ...(backgroundColor ? { color: "#FFF" } : {}),
        }}
        className={styles.chip_text}
      >
        {label}
      </div>
    </div>
  );
}

export default Chip;
