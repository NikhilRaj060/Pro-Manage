import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import style from "./InputButton.module.css";

function InputButton({
  type = "text",
  label,
  id,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
  text,
  required = false,
  fullWidth = false,
  multiple = false,
  customStyle,
  inputIcon, // optional custom icon (React Icon component)
  checked = false,
  height,
}) {
  const [inputType, setInputType] = useState(type);
  const [isFocused, setIsFocused] = useState(false);
  const [isValue, setIsValue] = useState(false);

  const handleToggle = () => {
    if (type === "password") {
      setInputType((prevType) =>
        prevType === "password" ? "text" : "password"
      );
    }
  };

  const widthStyle = {
    width: fullWidth ? "100%" : "auto",
  };

  const heightStyle = {
    height: height || "auto",
  };

  const checkboxStyle = {
    borderShadow: "none",
    left: "20px",
    top: "-4px",
  };

  const phoneStyle = {
    left: "72px",
  };

  const iconStyle = {
    paddingLeft: "35px",
  };

  const onChangeT = (e) => {
    setIsValue(!!e.target.value);
    onChange?.(e);
  };

  return (
    <>
      <div
        className={`${style.inputbtn} ${
          (((isFocused && isValue) || isFocused) && type !== "checkbox") ||
          type === "file"
            ? "focused"
            : isValue
            ? "valuecontained"
            : ""
        } ${style.input_container}`}
        style={{ ...heightStyle, ...widthStyle }}
      >
        <label
          htmlFor={id}
          style={
            type === "tel"
              ? phoneStyle
              : type === "checkbox"
              ? { ...checkboxStyle }
              : {}
          }
        >
          {label}
        </label>

        {inputIcon && (
          <span className={style.input_icon_container} onClick={handleToggle}>
            {inputIcon}
          </span>
        )}

        <input
          style={
            customStyle
              ? inputIcon
                ? { ...iconStyle, ...widthStyle, ...customStyle }
                : { ...widthStyle, ...customStyle }
              : widthStyle
          }
          type={inputType}
          id={id}
          name={name}
          value={value}
          text={text}
          required={required}
          multiple={multiple}
          placeholder={placeholder}
          checked={checked}
          disabled={disabled}
          onChange={onChangeT}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Password toggle eye icon */}
        {type === "password" && label !== "Confirm password" ? (
          <span className={style.icon_container} onClick={handleToggle}>
            {inputType === "password" ? (
              <FaEyeSlash className={style.icon} size={20} />
            ) : (
              <FaEye className={style.icon} size={20} />
            )}
          </span>
        ) : null}
      </div>

      {error && (
        <p
          className={style.error}
          style={
            customStyle ? { marginTop: "-20px", marginBottom: "8px" } : {}
          }
        >
          <span className={style.error_text}>{error}</span>
        </p>
      )}
    </>
  );
}

export default InputButton;