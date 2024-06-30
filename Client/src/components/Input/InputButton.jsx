import React, { useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff as eyeOffIcon } from "react-icons-kit/feather/eyeOff";
import { eye as eyeIcon } from "react-icons-kit/feather/eye";
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
  inputIcon,
  checked=false,
  height
}) {
  const [inputType, setInputType] = useState(type);
  const [icon, setIcon] = useState(eyeOffIcon);
  const [isFocused, setIsFocused] = useState(false);
  const [isValue, setIsValue] = useState(false);
  const [isIcon] = useState(!!inputIcon);

  const handleToggle = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) => (prevIcon === eyeOffIcon ? eyeIcon : eyeOffIcon));
  };

  const widthStyle = {
    width: fullWidth ? "100%" : "auto",
  };

  const heightStyle = {
    height: height ? height : "auto",
  }

  const checkboxStyle = {
    borderShadow: "none",
    left: "20px",
    top: "-4px",
  };

  const phoneStyle = {
    left: "72px",
  };

  const iconStyle = {
    paddingLeft: "35px"
  }

  const onChangeT = (e) => {
    let isValueContained = e.target.value;
    if (isValueContained) {
      setIsValue(true);
    } else {
      setIsValue(false);
    }
    // You can also call the original onChange prop if needed
    onChange(e);
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
        style={{...heightStyle,...widthStyle}}
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
            <Icon className={style.icon} icon={inputIcon} size={20} />{" "}
            </span>
        )}
        <input
          style={customStyle ? isIcon ? { ...iconStyle , ...widthStyle, ...customStyle } : { ...widthStyle, ...customStyle } : widthStyle}
          type={inputType}
          id={id}
          name={name}
          value={value}
          text={text}
          required={required}
          multiple={multiple}
          placeholder={placeholder}
          error={error}
          checked={checked}
          disabled={disabled}
          onChange={onChangeT}
          labelprops={{
            className: "before:content-none after:content-none",
          }}
          containerprops={{
            className: "min-w-0",
          }}
        />
        {type === "password" && label !== "Confirm password" ? (
          <span className={style.icon_container} onClick={handleToggle}>
            <Icon className={style.icon} icon={icon} size={20} />{" "}
          </span>
        ) : (
          <span className="hidden"></span>
        )}
      </div>
      {error ? (
        <p
          className={style.error}
          style={
            customStyle ? { "margin-top": "-20px", "margin-bottom": "8px" } : {}
          }
        >
          <span className={style.error_text}>{error}</span>
        </p>
      ) : (
        ""
      )}
    </>
  );
}

export default InputButton;
