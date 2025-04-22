import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/Borrow.module.css';

const Borrow = ({ equipmentId, onClose }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // פונקציה לקבלת התאריך המקומי הנוכחי בפורמט YYYY-MM-DD
  const getCurrentLocalDate = () => {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  };

  const currentDate = getCurrentLocalDate();

  // פונקציה לחישוב תאריך ההחזרה המקסימלי (חודש אחרי תאריך ההשאלה)
  const getMaxEndDate = (startDate) => {
    if (!startDate) return currentDate;
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + 1);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  };

  // כאשר תאריך ההשאלה משתנה, מאפסים את תאריך ההחזרה
  useEffect(() => {
    if (startDate) {
      setEndDate('');
    }
  }, [startDate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.warn('No userId found. Redirecting to login.');
        setIsSubmitting(false);
        return navigate('/auth/login');
      }

      const response = await fetch('/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user': userId,
        },
        body: JSON.stringify({
          equipmentId,
          startDate,
          endDate,
          userId,
        }),
      });

      if (response.ok) {
        alert('Borrow request sent successfully!');
        onClose();
      } else {
        const errorMessage = await response.text();
        console.error('Error borrowing book:', errorMessage);
      }
    } catch (error) {
      console.error('Error submitting borrow request:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Borrow Book</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              required
              value={startDate}
              min={currentDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="endDate">End Date (Max 1 Month from Start Date)</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              required
              value={endDate}
              min={startDate}
              max={getMaxEndDate(startDate)}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Borrow;
