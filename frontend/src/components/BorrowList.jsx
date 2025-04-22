import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../style/BorrowList.module.css';

const BorrowList = () => {
  const [borrows, setBorrows] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  // קבלת userId מ־Redux
  const { userId } = useSelector((state) => state.user);
  useEffect(() => {
    document.body.className = styles["BorrowListPage"];
    return () => {
      document.body.className = "";
    };
  }, []);

  useEffect(() => {
    // console.log("userId:", userId);
    const fetchBorrows = async () => {
      if (!userId) {
        console.warn('No userId found. Redirecting to login.');
        navigate('/auth/login');
        return;
      }

      try {
        // שימוש בנתיב יחסי כך שהפרוקסי יעבוד
        const response = await fetch('/borrows/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'user': userId,
          },
        });

        if (!response.ok) {
          console.error('Error fetching borrow requests');
          return;
        }

        const data = await response.json();

        // קריאה לנתיב לקבלת פרטי הציוד באמצעות נתיב יחסי
        const equipmentNames = await Promise.all(
          data.map(async (borrow) => {
            try {
              const equipmentResponse = await fetch(`/api/equipments/${borrow.equipmentId}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'user': userId,
                },
              });
              if (equipmentResponse.ok) {
                const equipment = await equipmentResponse.json();
                return { ...borrow, equipmentName: equipment.name };
              } else {
                console.error(`Equipment with id ${borrow.equipmentId} not found.`);
                return { ...borrow, equipmentName: 'Unknown Equipment' };
              }
            } catch (err) {
              console.error('Error fetching equipment details:', err);
              return { ...borrow, equipmentName: 'Unknown Equipment' };
            }
          })
        );

        setBorrows(equipmentNames);
      } catch (error) {
        console.error('Error fetching borrow requests:', error);
      }
    };

    fetchBorrows();
  }, [navigate, location.pathname, userId]);

  const handleReturnItem = async (borrowId) => {
    if (!userId) return;
    try {
      const response = await fetch(`/borrow/${borrowId}/return`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'user': userId,
        },
        body: JSON.stringify({ status: 'returned' }),
      });

      if (response.ok) {
        setBorrows(borrows.map((borrow) =>
          borrow.id === borrowId ? { ...borrow, status: 'returned' } : borrow
        ));
      } else {
        console.error('Error returning item');
      }
    } catch (error) {
      console.error('Error returning item:', error);
    }
  };

  return (
    <div className={styles.borrowListContainer}>
      <h2 className={styles.borrowListTitle}>Your Borrow Requests</h2>
      {borrows.length === 0 ? (
        <p>No borrow requests found.</p>
      ) : (
        <ul className={styles.borrowGrid}>
          {borrows.map((borrow) => (
            <li key={borrow.id} className={styles.borrowItem}>
              <h3>{borrow.equipmentName}</h3>
              <p><strong>Start Date:</strong> {borrow.startDate}</p>
              <p><strong>End Date:</strong> {borrow.endDate}</p>
              <p className={`${styles.status} ${borrow.status === 'borrowed' ? styles.borrowed : styles.returned}`}>
                {borrow.status}
              </p>
              {borrow.status === 'borrowed' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleReturnItem(borrow.id)}
                >
                  Return Equipment
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BorrowList;
