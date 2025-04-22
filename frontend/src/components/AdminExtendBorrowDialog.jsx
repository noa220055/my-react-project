import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { format, addDays, parseISO, isValid } from 'date-fns';
import styles from '../style/AdminExtendBorrowDialog.module.css';

const ExtendBorrowDialog = ({ open, borrow, onClose, onExtend }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [minDate, setMinDate] = useState(null);

  useEffect(() => {
    if (borrow && borrow.endDate) {
      let endDate;
      // המרה של התאריך למבנה Date
      if (typeof borrow.endDate === 'string') {
        endDate = parseISO(borrow.endDate);
      } else {
        endDate = new Date(borrow.endDate);
      }
      console.log("Raw endDate from borrow:", borrow.endDate);
      console.log("Parsed endDate:", endDate);

      if (!isValid(endDate)) {
        console.error("Invalid date format:", borrow.endDate);
        return;
      }

      // חישוב יום לאחר סיום ההשאלה
      const nextDayAfterEndDate = addDays(endDate, 1);
      console.log("Next day after endDate:", nextDayAfterEndDate);

      setMinDate(nextDayAfterEndDate);
      setSelectedDate(nextDayAfterEndDate);
    }
  }, [borrow]);

  const handleSubmit = () => {
    if (selectedDate && isValid(selectedDate)) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      onExtend(formattedDate);
      onClose();
    }
  };

  if (!borrow) return null;

  return (
    <Dialog 
      open={open}
      onClose={onClose}
      fullWidth
      className={styles.dialogContainer}
    >
      <DialogTitle className={styles.dialogTitle}>Extend Borrowing</DialogTitle>
      <DialogContent>
        <div className={styles.dateInputContainer}>
          <label className={styles.dateInputLabel}>Choose Extension Date</label>
          <input
            type="date"
            className={styles.dateInput}
            value={selectedDate && isValid(selectedDate) ? format(selectedDate, 'yyyy-MM-dd') : ''}
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              if (isValid(newDate)) {
                setSelectedDate(newDate);
              }
            }}
            min={minDate && isValid(minDate) ? format(minDate, 'yyyy-MM-dd') : ''}
          />
        </div>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button onClick={handleSubmit} className={`${styles.dialogButton} ${styles.dialogButtonConfirm}`}>
          Confirm
        </Button>
        <Button onClick={onClose} className={`${styles.dialogButton} ${styles.dialogButtonCancel}`}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExtendBorrowDialog;
