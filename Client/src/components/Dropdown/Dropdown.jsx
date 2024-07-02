import React, { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import useOutsideClick from "../../Hook/useOutsideClick";
import styles from "./Dropdown.module.css";
import classNames from "classnames";

function Dropdown({
  id,
  title = "Select",
  data,
  position = "bottom-left",
  hasImage,
  style,
  selectedId,
  onSelect,
  isReadOnly,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    selectedId ? data?.find((item) => item._id === selectedId) : undefined
  );

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data?.find((item) => item._id === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  const dropdownRef = useRef(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const handleToggleDropdown = () => {
    if (!isReadOnly) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelectItem = (item) => {
    if (!isReadOnly) {
      setSelectedItem(item);
      setIsOpen(false);
      onSelect && onSelect(item._id);
    }
  };

  const dropdownClass = classNames(styles.dropdown_base, {
    [styles.dropdownBottomRight]: position === "bottom-right",
    [styles.dropdownBottomLeft]: position === "bottom-left",
    [styles.dropdownTopRight]: position === "top-right",
    [styles.dropdownTopLeft]: position === "top-left",
  });

  return (
    <div ref={dropdownRef} className={styles.container}>
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={handleToggleDropdown}
        className={styles.dropwonbutton}
        style={style}
        disabled={isReadOnly}
      >
        <span className={styles.title_name}>{selectedItem?.email || title}</span>
        <GoChevronDown
          size={20}
          className={styles.angle}
          style={isOpen ? { transform: "rotate(180deg)" } : {}}
        />
      </button>
      {isOpen && (
        <div aria-label="Dropdown menu" className={dropdownClass}>
          <ul
            role="menu"
            aria-labelledby={id}
            aria-orientation="vertical"
            className={styles.menu_ul}
          >
            {data?.map((item) => (
              <li key={item._id} className={styles.list_item}>
                <div className={styles.user_info}>
                  <div loading="lazy" className={styles.initials}>
                    {item.initials}
                  </div>
                  <span className={styles.email}>{item.email}</span>
                </div>
                <span
                  onClick={() => handleSelectItem(item)}
                  className={styles.assign}
                  style={isReadOnly ? { cursor: "not-allowed" } : {}}
                >
                  {selectedItem?._id === item._id ? "Assigned" : "Assign"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
