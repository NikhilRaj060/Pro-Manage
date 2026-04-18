import React, { useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

export default function CustomDateRangePicker({ isOpen, onClose, onApply }) {
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  const modalStyle = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "45%",
    height: "30%",
    bgcolor: "#FFFFFF",
    borderRadius: 2.5,
    outline: "none",
    padding: "2%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  };

  const handleApply = () => {
    if (!customStartDate || !customEndDate) {
      toast.error("Please select both start and end dates");
      return;
    }
    onApply(customStartDate, customEndDate);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="custom-date-modal"
    >
      <Box sx={modalStyle}>
        <h3>Select Custom Date Range</h3>
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={customStartDate}
          onChange={(e) => setCustomStartDate(e.target.value)}
          fullWidth
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={customEndDate}
          onChange={(e) => setCustomEndDate(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleApply} style={{ marginTop: "10px", backgroundColor: "#17A2B8" }}>
          Apply Filter
        </Button>
      </Box>
    </Modal>
  );
}
